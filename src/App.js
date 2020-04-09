import React from "react";
import "./App.css";
import SymbolsList from "./SymbolsList";
import MostActive from "./MostActive";
import History from "./History";
import About from "./About";
import Nav from "./Nav";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function Home() {
  return (
    <div style={classes.home}>
      <div
        style={{
          display: "flex",
          flex: 1,
          overflow: "scroll",
          flexDirection: "column",
        }}
      >
        <SymbolsList />
      </div>
      <div style={{ flex: 3, display: "flex", flexDirection: "column" }}>
        <div style={classes.active}>
          <MostActive />
        </div>
        <div style={{ flex: 1 }}>
          <History />
        </div>
      </div>
      {/* <div
        style={{ flex: 1, display: "flex", flexDirection: "column-reverse" }}
      >
        3
      </div> */}
    </div>
  );
}

function App() {
  return (
    <Router>
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
  home: {
    display: "flex",
    flex: 10,
    flexDirection: "row",
    overflow: "hidden",
  },
  active: {
    display: "flex",
    flex: 1,
    padding: "50px 50px 100px 50px",
  },
};

export default App;
