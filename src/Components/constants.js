export const HISTORY_DEMO_DATA = [
  {
    label: "open",
    data: [
      ["2020-04-08", 26.17],
      ["2020-04-07", 26.61],
      ["2020-04-06", 26.01],
      ["2020-04-03", 25.16],
      ["2020-04-02", 24.59],
    ],
  },
  {
    label: "high",
    data: [
      ["2020-04-08", 26.53],
      ["2020-04-07", 26.76],
      ["2020-04-06", 26.7],
      ["2020-04-03", 25.88],
      ["2020-04-02", 25.72],
    ],
  },
  {
    label: "low",
    data: [
      ["2020-04-08", 25.83],
      ["2020-04-07", 25.78],
      ["2020-04-06", 25.54],
      ["2020-04-03", 24.74],
      ["2020-04-02", 24.37],
    ],
  },
  {
    label: "close",
    data: [
      ["2020-04-08", 26.2],
      ["2020-04-07", 26.09],
      ["2020-04-06", 26.34],
      ["2020-04-03", 24.95],
      ["2020-04-02", 25.04],
    ],
  },
];

export const MOST_ACTIVE_DEMO_DATA = [
  {
    label: "AB",
    data: [[0, 10]],
  },
  {
    label: "CD",
    data: [[0, 20]],
  },
  {
    label: "EF",
    data: [[0, 30]],
  },
  {
    label: "GH",
    data: [[0, 40]],
  },
  {
    label: "IJ",
    data: [[0, 50]],
  },
];

export const ITEM = "item";
export const ASK = "ask";
export const SYMBOL = "symbol";
export const PRODUCTION = process.env.NODE_ENV === "production";
