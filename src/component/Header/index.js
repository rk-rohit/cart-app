import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  marginBottom: {
    marginBottom: "75px",
  },
}));

export default function PrimarySearchAppBar({ handleOpen }) {
  const classes = useStyles();
  const { isLoggedIn, cartItem } = useSelector((store) => ({
    isLoggedIn: store.auth.isLoggedIn,
    cartItem: store.cart.cartItem,
  }));
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <div className={clsx(classes.grow, classes.marginBottom)}>
      <AppBar position="fixed">
        <Toolbar>
          <Button
            color="inherit"
            onClick={() => {
              history.push("/");
            }}
          >
            Product
          </Button>
          <div className={classes.grow} />
          <MenuItem>
            <IconButton
              aria-label="show 11 new notifications"
              color="inherit"
              onClick={() => {
                history.push("/cart");
              }}
            >
              <Badge badgeContent={cartItem.length} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </MenuItem>
          {!isLoggedIn ? (
            <Button color="inherit" onClick={() => handleOpen()}>
              Login
            </Button>
          ) : (
            <Button
              color="inherit"
              onClick={() =>
                dispatch({
                  type: "SIGNOUT",
                })
              }
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
