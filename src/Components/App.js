import React from "react";
import "./App.css";
import About from "./About";
import Nav from "./Nav";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import Home from "./Home";
import PageNotFound from "./PageNotFound";

function App() {
  return (
    <Router basename="/react-stock-market-hacker-news-dashboard">
      <div style={classes.root}>
        <Nav />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/404" component={PageNotFound} />
          <Redirect to="/404" />
        </Switch>
      </div>
    </Router>
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
