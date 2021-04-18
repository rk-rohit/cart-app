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
    position: "relative",
    height: "100%",
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    "&:hover $addCart, &:focus $addCart": {
      display: "block",
    },
    "&:hover $overlay, &:focus $overlay": {
      display: "flex",
    },
  },
  heading: {
    fontSize: "21px",
    color: "#000",
    lineHeight: "1.3",
    fontWeight: "500",
    marginTop: "10px",
    marginBottom: "10px"
  },
  addCart: {
    display: "none",
  },
  overlay: {
    display: "none",
    position: "absolute",
    height: "100%",
    background: "rgba(0,0,0,0.4)",
    width: "100%",
    top: 0,
    alignItems: "baseline",
    justifyContent: "flex-end",
    "& button": {
      color: "#fff",
      marginRight: "20px"
    }
  },
  media: {
    height: "180px",
    backgroundSize: "100%",
    width: "100%",
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
      {image && <CardMedia className={classes.media} image={image} title="Paella dish" />}
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="h4" className={classes.heading}>
          {description}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {author}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Publish Date: {publishDate}, <br/>
          Duration: {duration}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className={classes.overlay}>
        {alreadyAddedToCard ? (
          <Button
            size="small"
            color="primary"
            onClick={() => deleteItemCart(id)}
            
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
          >
            Add
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
