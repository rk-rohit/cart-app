import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Alert from '@material-ui/lab/Alert';
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "25ch",
  },
}));

export default function LoginForm({ handleClose }) {
  const [usernameTemp, setUsername] = useState("");
  const [passwordTemp, setPassword] = useState("");
  const dispatch = useDispatch();
  const { errorMessage, isLoggedIn } = useSelector((state) => ({
    errorMessage: state.auth.errorMessage,
    isLoggedIn: state.auth.isLoggedIn,
  }));
  const classes = useStyles();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: "LOGIN",
      logininfo: {
        username: usernameTemp,
        password: passwordTemp,
      },
    });
  };

  if (isLoggedIn) {
    handleClose();
    return <Redirect to="/" />;
  }

  return (
    <div className={classes.root}>
      { errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <FormControl fullWidth className={classes.margin}>
        <InputLabel htmlFor="standard-adornment-username">Username</InputLabel>
        <Input
          id="standard-adornment-username"
          value={usernameTemp}
          onChange={(e) => setUsername(e.target.value)}
        />
      </FormControl>
      <FormControl fullWidth className={classes.margin}>
        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
        <Input
          id="standard-adornment-password"
          value={usernameTemp}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <Button
          size="large"
          color="primary"
          onClick={(e) => handleSubmit(e)}
          className={classes.addCart}
        >
          Login
        </Button>
      </FormControl>
    </div>
  );
}
