import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";

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
}));

export default function PrimarySearchAppBar({ handleOpen }) {
  const classes = useStyles();
  const isLoggedIn = useSelector((store) => store.auth.isLoggedIn);
  const dispatch = useDispatch();

  return (
    <div className={classes.grow}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Cart App
          </Typography>
          <div className={classes.grow} />
          {!isLoggedIn ? (
            <Button color="inherit" onClick={() => handleOpen()}>
              Login
            </Button>
          ) : (
            <Button color="inherit" onClick={() => dispatch({
              type: 'SIGNOUT'
            })}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
