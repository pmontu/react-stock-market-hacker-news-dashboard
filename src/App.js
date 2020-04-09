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
    <div style={classes.root}>
      <div
        style={{
          display: "flex",
          flex: 1,
          overflow: "scroll",
        }}
      >
        <SymbolsList />
      </div>
      <div style={{ flex: 3, display: "flex", flexDirection: "column" }}>
        <div style={classes.active}>
          <MostActive />
        </div>
        <div style={{ flex: 1 }}>3</div>
      </div>
      <div style={{ flex: 1 }}>3</div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="nav">
          <Nav />
        </div>
        <Switch>
          <Route exact path="/">
            <div style={{ flex: 10, display: "flex" }}>
              <Home />
            </div>
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
  root: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    width: "100%",
    position: "fixed",
    height: "100%",
  },
  active: {
    display: "flex",
    flex: 1,
    // flexWrap: "wrap",
    padding: "50px 50px 100px 50px",
  },
  about: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
  },
};

export default App;
