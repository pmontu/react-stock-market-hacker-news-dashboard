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

  return (
    <div
      className="news"
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "scroll",
      }}
    >
      <div style={{ flex: 1, alignSelf: "center" }}>
        <FormControlLabel
          control={
            <Switch
              checked={isNews}
              onChange={() => {
                setNewsItems([]);
                setIsNews((prev) => !prev);
              }}
              name="checkedB"
              color="primary"
            />
          }
          label={isNews ? "News" : "Asks"}
        />
      </div>
      <ul>
        {newsItems.map((item, index) => (
          <li key={index}>
            <a href={item.url}>{item.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
