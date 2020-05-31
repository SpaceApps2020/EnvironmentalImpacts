import React, { Component } from "react";
import "../node_modules/react-linechart/dist/styles.css";
import XYFrame from "semiotic/lib/XYFrame";
import NetworkFrame from "semiotic/lib/NetworkFrame";
import text from "./VegetationData.json";

const data = [];

for (var i = 0; i < 9; i++) {
  data.push({ color: text["2016"][i]["color"], coordinates: [] });
}

for (var i = 0; i < 9; i++) {
  for (var j = 2016; j <= 2020; j++) {
    data[i].coordinates.push({
      date: j.toString(),
      frequency: text[j.toString()][i]["freq"],
    });
  }
}

console.log(data);

const frameProps = {
  lines: data,
  size: [800, 400],
  margin: { left: 100, bottom: 90, right: 30, top: 40 },
  xAccessor: "date",
  yAccessor: "frequency",
  lineStyle: (d, i) => ({
    stroke: data[i]["color"],
    strokeWidth: 3,
    fill: "none",
  }),
  title: <text textAnchor="middle"></text>,
  axes: [
    {
      orient: "left",
      label: "Number of Theaters",
    },
    {
      orient: "bottom",
      label: { name: "Weeks from Opening Day", locationDistance: 55 },
      tickValues: [2016, 2017, 2018, 2019, 2020],
    },
  ],
  hoverAnnotation: true,
};

export default class App extends Component {
  render() {
    return (
      <div>
        <div className="App">
          <XYFrame {...frameProps} tooltipStyles />
        </div>
      </div>
    );
  }
}
