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
import News from "./News";
import Company from "./Company";
import { usePageViews } from "./hooks";

function App() {
  usePageViews();

  return (
    <div style={classes.root}>
      <Nav />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/company-list">
          <Company />
        </Route>
        <Route path="/news">
          <News />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/404" component={PageNotFound} />
        <Redirect to="/404" />
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

export default () => (
  <Router basename="/react-stock-market-hacker-news-dashboard">
    <App />
  </Router>
);
