import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import { removeItemCart } from "../../actions/cart";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 345,
    margin: "5px",
    "&:hover $addCart, &:focus $addCart": {
      display: "block",
    },
    "&:hover $removeCart, &:focus $removeCart": {
      display: "block",
    },
  },
  addCart: {
    display: "none",
  },
  removeCart: {
    display: "none",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
}));

export default function RecipeReviewCard({
  id,
  name,
  description,
  author,
  image,
  publishDate,
  duration,
  addCart,
  cartItem,
  handleOpen
}) {
  const classes = useStyles();
  const isLoggedIn = useSelector(store=> store.auth.isLoggedIn)
  const dispatch = useDispatch();

  const deleteItemCart = (id) => {
    const filterItem = cartItem?.filter((item) => item.id !== id);
    localStorage.setItem("cartItem", JSON.stringify(filterItem));
    dispatch(removeItemCart(filterItem));
  };

	const alreadyAddedToCard = cartItem?.find((item) => item.id === id && item.qty>0 );
	
  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image={image} title="Paella dish" />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="h4">
          {description}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {author}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Publish Date: {publishDate}, Duration: {duration}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {alreadyAddedToCard ? (
          <Button
            size="small"
            color="primary"
            onClick={() => deleteItemCart(id)}
            className={classes.addCart}
          >
            Remove
          </Button>
        ) : (
          <Button
            size="small"
            color="primary"
            onClick={() => {
              if (!isLoggedIn) {
                handleOpen()
              } else {
                addCart(id)
              }
            }}
            className={classes.removeCart}
          >
            Add
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
