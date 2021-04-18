import React, { useEffect } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import {
  removeItemCart,
  incrQtyCart,
  decrQtyCart,
  localStorageToCartItem,
} from "../../actions/cart";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

const styles = {
  root: {
    flexGrow: 1,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  item: {
    margin: 10,
    width: "100%",
  },
  media: {
    height: 140,
  },
  listItem: {
    width: "100%",
  },
};

const Cart = (props) => {
  const { cartItem, product } = useSelector(
    (store) => ({
      cartItem: store.cart.cartItem,
      product: store.product.product_list,
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  const deleteItemCart = (id) => {
    const filterItem = cartItem?.filter((item) => item.id !== id);
    localStorage.setItem("cartItem", JSON.stringify(filterItem));
    dispatch(removeItemCart(filterItem));
  };

  const increaseQtyCart = (id) => {
    const increaseQtyItem = cartItem?.map((item) => {
      return item.id === id ? { id: item.id, qty: item.qty + 1 } : item;
    });

    localStorage.setItem("cartItem", JSON.stringify(increaseQtyItem));
    dispatch(incrQtyCart(increaseQtyItem));
  };

  const decreaseQtyCart = (id) => {
    const decreaseQtyItem = cartItem?.map((item) => {
      return item.id === id && item.qty > 1
        ? { id: item.id, qty: item.qty - 1 }
        : item;
    });

    localStorage.setItem("cartItem", JSON.stringify(decreaseQtyItem));
    dispatch(decrQtyCart(decreaseQtyItem));
  };

  useEffect(() => {
    let localCartItem = localStorage.getItem("cartItem")
      ? JSON.parse(localStorage.getItem("cartItem"))
      : [];
    dispatch(localStorageToCartItem(localCartItem));
  }, []);

  const getCartItem = () => {
    return cartItem.length
      ? cartItem.map((item) => {
          let findValue = product.find(
            (product_item) => product_item.id === item.id
          );
          if (findValue) {
            return {
              ...findValue,
              qty: item.qty,
            };
          }
        })
      : [];
  };

  const cart_list = getCartItem();
  const { classes } = props;
  const cartItem_list =
    cart_list.length > 0 ? (
      cart_list.map((item, key) => {
        return (
          <ListItem key={key}>
            <Card className={classes.item}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={item.image}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6">
                    {item.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Price : {item.price} USD
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={()=>decreaseQtyCart(item.id)}
                >
                  -
                </Button>
                <Typography variant="body2" color="textSecondary" component="p">
                  {item.qty}
                </Typography>
                <Button
                  size="small"
                  color="primary"
                  onClick={()=>increaseQtyCart(item.id)}
                >
                  +
                </Button>
                <Button
                  size="small"
                  color="primary"
                  onClick={()=>deleteItemCart(item.id)}
                >
                  Remove
                </Button>
              </CardActions>
            </Card>
          </ListItem>
        );
      })
    ) : (
      <Typography variant="body2" color="textSecondary" component="p">
        No item in cart.
      </Typography>
    );

  return (
    <Grid container className={classes.root}>
      <Grid container>
        <Typography variant="h6">
          Cart Item
        </Typography>
      </Grid>
      <Grid container>
        <List className={classes.listItem}>{cartItem_list}</List>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(Cart);
