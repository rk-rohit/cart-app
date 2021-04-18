import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./component/Header";
import Product from "./component/Product/";
import Model from "./component/Model";
import Login from "./component/Login";

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
          <Route path="/" render={()=><Product handleOpen={handleOpen}/>} />
        </Switch>
        <Model open={open} handleClose={handleClose}>
          <Login handleClose={handleClose}/>
        </Model>
      </Router>
    </div>
  );
}

export default App;
