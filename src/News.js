import React, { useEffect, useState } from "react";

const evalResponce = (res) => {
  if (!res.ok) throw Error("failed to fetch");
  return res.json();
};

export default function News() {
  const [newsItems, setNewsItems] = useState([]);

  useEffect(() => {
    fetch("https://hacker-news.firebaseio.com/v0/askstories.json")
      .then(evalResponce)
      .then((ids) => {
        ids.splice(0, 10).forEach((id) => {
          fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
            .then(evalResponce)
            .then((data) => {
              console.log(data);
              setNewsItems((prev) => [...prev, data]);
            });
        });
      });
  }, []);

  return (
    <ul>
      {newsItems.map((item) => (
        <li>{item.title}</li>
      ))}
    </ul>
  );
}
