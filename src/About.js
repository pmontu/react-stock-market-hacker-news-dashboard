import React from "react";

export default () => (
  <div style={classes.about}>
    <a href="https://github.com/pmontu/react-stock-market-hacker-news-dashboard">
      View Source Code on Github
    </a>
  </div>
);

const classes = {
  about: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
};
