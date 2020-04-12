import React, { useEffect, useState } from "react";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Loading from "./Loading";

const evalResponce = (res) => {
  if (!res.ok) throw Error("failed to fetch");
  return res.json();
};

export default function News() {
  const [newsItems, setNewsItems] = useState([]);
  const [isNews, setIsNews] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://hacker-news.firebaseio.com/v0/${
        isNews ? "topstories" : "askstories"
      }.json`
    )
      .then(evalResponce)
      .then((ids) => {
        Promise.all(
          ids.splice(0, 25).map(
            (id) =>
              new Promise((res, rej) =>
                fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
                  .then(evalResponce)
                  .then((data) => res(data))
                  .catch((e) => rej(e))
              )
          )
        ).then((items) => {
          setIsLoading(false);
          setNewsItems(items);
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
      {isLoading ? (
        <Loading />
      ) : (
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
      )}
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
