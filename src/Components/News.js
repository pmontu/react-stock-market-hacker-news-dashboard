import React, { useEffect, useState } from "react";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const evalResponce = (res) => {
  if (!res.ok) throw Error("failed to fetch");
  return res.json();
};

export default function News() {
  const [newsItems, setNewsItems] = useState([]);
  const [isNews, setIsNews] = useState(true);

  useEffect(() => {
    fetch(
      `https://hacker-news.firebaseio.com/v0/${
        isNews ? "topstories" : "askstories"
      }.json`
    )
      .then(evalResponce)
      .then((ids) => {
        ids.splice(0, 25).forEach((id) => {
          fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
            .then(evalResponce)
            .then((data) => {
              // console.log(data);
              setNewsItems((prev) => [...prev, data]);
            });
        });
      });
  }, [isNews]);

  const handleSwitch = () => {
    setNewsItems([]);
    setIsNews((prev) => !prev);
  };

  return (
    <div style={classes.scroll}>
      <FormControlLabel
        control={
          <Switch
            checked={isNews}
            onChange={handleSwitch}
            name="checkedBox"
            color="primary"
          />
        }
        label={isNews ? "Top Stories" : "Asks"}
      />
      <ul className="news">
        {newsItems.map((item, index) =>
          isNews ? (
            <li key={index}>
              <a href={item.url}>{item.title}</a>
            </li>
          ) : (
            <Ask {...item} key={index} />
          )
        )}
      </ul>
    </div>
  );
}

function Ask(ask) {
  const [isHidden, setIsHidden] = useState(true);
  return (
    <li onClick={() => setIsHidden((prev) => !prev)}>
      <div>{ask.title}</div>
      {ask.text && (
        <div
          style={{
            display: !isHidden ? "inline-block" : "none",
            marginTop: 14,
          }}
          dangerouslySetInnerHTML={{
            __html: ask.text,
          }}
        ></div>
      )}
    </li>
  );
}

const classes = {
  scroll: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "scroll",
    alignItems: "center",
  },
};
