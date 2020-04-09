import React, { useEffect, useState } from "react";

const evalResponce = (res) => {
  if (!res.ok) throw Error("failed to fetch");
  return res.json();
};

export default function News() {
  const [newsItems, setNewsItems] = useState([]);

  useEffect(() => {
    fetch("https://hacker-news.firebaseio.com/v0/topstories.json")
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
  }, []);

  return (
    <div className="news" style={{ flex: 1, display: "flex" }}>
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
