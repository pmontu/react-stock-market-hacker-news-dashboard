import React from "react";
import "./App.css";
import About from "./About";
import Nav from "./Nav";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";

function App() {
  return (
    <div style={classes.root}>
      <Nav />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
      </Switch>
    </div>
  );
}

const classes = {
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    position: "fixed",
  },
};

export default App;
