import React from "react";
import "./App.css";
import SymbolsList from "./SymbolsList";
import MostActive from "./MostActive";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

function Nav() {
  const location = useLocation();
  console.log("debug", { location });

  return (
    <ul>
      <li className={location.pathname === "/" ? "active" : ""}>
        <Link to="/">Home</Link>
      </li>
      <li className={location.pathname === "/about" ? "active" : ""}>
        <Link to="/about">About</Link>
      </li>
    </ul>
  );
}

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
          Actives
          <MostActive />
        </div>
        <div style={{ flex: 1 }}>3</div>
      </div>
      <div
        style={{ flex: 1, display: "flex", flexDirection: "column-reverse" }}
      >
        3
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "fixed",
        }}
      >
        <div className="nav">
          <Nav />
        </div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <div style={classes.about}>
              <a href="https://github.com/pmontu/react-stock-market-hacker-news-dashboard">
                View Source Code on Github
              </a>
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

const classes = {
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
  about: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
};

export default App;
