import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./component/Header";
import Product from "./component/Product/";
import Model from "./component/Model";
import Login from "./component/Login";
import Cart from "./component/cart";

function App() {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className="App">
      <Router>
        <Header handleOpen={handleOpen} />
        <Switch>
          <Route exact path="/" render={()=><Product handleOpen={handleOpen}/>} />
          <Route path="/cart" render={()=><Cart />} />
        </Switch>
        <Model open={open} handleClose={handleClose}>
          <Login handleClose={handleClose}/>
        </Model>
      </Router>
    </div>
  );
}

export default App;
