import React from "react";
import "./App.css";
import SymbolsList from "./SymbolsList";
import MostActive from "./MostActive";

function App() {
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
          {/* {["a", "b", "c", "d", "e", "f", "g", "h", "i"].map((char, index) => (
            <div
              style={{
                height: 60,
                width: 60,
                margin: 20,
                padding: 10,
              }}
              key={index}
            >
              {char}
            </div>
          ))} */}
        </div>
        <div style={{ flex: 1 }}>2</div>
        {/* <div style={{ flex: 1 }}>3</div> */}
      </div>
      <div style={{ flex: 1 }}>0</div>
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
    flexWrap: "wrap",
  },
};

export default App;
