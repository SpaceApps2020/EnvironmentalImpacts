import React, { Component } from "react";
import "../node_modules/react-linechart/dist/styles.css";
import XYFrame from "semiotic/lib/XYFrame";
import NetworkFrame from "semiotic/lib/NetworkFrame";

const data = [
  {
    color: "1",
    coordinates: [
      { date: 2016, frequency: 50 },
      { date: 2017, frequency: 54 },
      { date: 2018, frequency: 100 },
    ],
  },
];
const theme = [
  "#ac58e5",
  "#E0488B",
  "#9fd0cb",
  "#e0d33a",
  "#7566ff",
  "#533f82",
  "#7a255d",
  "#365350",
  "#a19a11",
  "#3f4482",
];
const frameProps = {
  lines: data,
  size: [700, 400],
  margin: { left: 80, bottom: 90, right: 10, top: 40 },
  xAccessor: "date",
  yAccessor: "frequency",
  lineStyle: (d, i) => ({
    stroke: theme[i],
    strokeWidth: 4,
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
      tickValues: [2016, 2017, 2018],
    },
  ],
  hoverAnnotation: true,
};

export default class App extends Component {
  render() {
    return (
      <div>
        <div className="App">
          <XYFrame
            {...frameProps}
            tooltipContent={(d) => (
              <div className="tooltip-content">
                <p>Name: {d.frequency}</p>
              </div>
            )}
          />
        </div>
      </div>
    );
  }
}
