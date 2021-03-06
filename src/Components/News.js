import React, { useEffect, useState } from "react";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import Loading from "./Loading";
import { qs_replace, evalResponce } from "./util";
import { useIsNews, useItem } from "./hooks";
import { useLocation, useHistory } from "react-router-dom";
import { ITEM, ASK } from "./constants";

function News() {
  const [newsItems, setNewsItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { search, pathname } = useLocation();
  const history = useHistory();
  const isNews = useIsNews();

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
        )
          .then((items) => {
            setIsLoading(false);
            setNewsItems(items);
          })
          .catch((e) => console.error(e));
      });
  }, [isNews]);

  const handleSwitch = () => {
    const value = isNews ? ASK : null;
    const queryString = qs_replace(search, ITEM, value);
    history.push({
      pathname,
      search: `?${queryString}`,
    });
  };

  return (
    <>
      <FormControlLabel
        style={{ marginTop: 18 }}
        control={
          <Switch
            checked={isNews}
            onChange={handleSwitch}
            name="checkedBox"
            color="primary"
          />
        }
        label={
          <Typography style={{ fontWeight: "bold" }}>
            {isNews ? "Top Stories" : "Asks"}
          </Typography>
        }
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
    </>
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

function NewsItem({ id }) {
  return id;
}

export default () => {
  const item = useItem();
  return (
    <div style={classes.scroll}>{item ? <NewsItem id={item} /> : <News />}</div>
  );
};

const classes = {
  scroll: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "scroll",
    alignItems: "center",
  },
};
