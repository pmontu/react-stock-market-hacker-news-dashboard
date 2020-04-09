import React from "react";
import "./App.css";
import SymbolsList from "./SymbolsList";
import MostActive from "./MostActive";

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
        {/* <div style={{ flex: 1 }}>3</div> */}
      </div>
      <div style={{ flex: 1 }}>3</div>
    </div>
  );
}

function App() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ flex: 1 }}>Nav</div>
      <div style={{ flex: 10, display: "flex" }}>
        <Home />
      </div>
    </div>
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
    padding: 50,
  },
};

export default App;
