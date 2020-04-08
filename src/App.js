import React from "react";
import "./App.css";

function App() {
  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "row",
        width: "100%",
        position: "fixed",
      }}
    >
      <div style={{ flex: 3 }}>
        <div
          style={{
            display: "flex",
            flex: 1,
            flexWrap: "wrap",
          }}
        >
          {["a", "b", "c", "d", "e", "f", "g"].map((char) => (
            <div
              style={{
                height: 60,
                width: 60,
                margin: 20,
                padding: 10,
              }}
            >
              {char}
            </div>
          ))}
        </div>
        <div style={{ flex: 1 }}>2</div>
        <div style={{ flex: 1 }}>3</div>
      </div>
      <div style={{ flex: 1 }}>0</div>
    </div>
  );
}

export default App;
