import React, { Component } from "react";
import "../node_modules/react-linechart/dist/styles.css";
import XYFrame from "semiotic/lib/XYFrame";
import NetworkFrame from "semiotic/lib/NetworkFrame";
import text from "./VegetationData.json";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";

const data = [];

class Circle extends Component {
  render() {
    var circleStyle = {
      padding: 5,
      margin: 5,
      display: "inline-block",
      backgroundColor: this.props.bgColor,
      borderRadius: "50%",
      width: 10,
      height: 10,
    };

    return <div style={circleStyle}></div>;
  }
}

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
  lineType: "linepercent",
  size: [800, 400],
  margin: { left: 100, bottom: 90, right: 30, top: 40 },
  xAccessor: "date",
  yAccessor: "frequency",
  title: <text> EVI in May of 2016-2020 </text>,
  lineStyle: (d, i) => ({
    stroke: data[i]["color"],
    strokeWidth: 3,
    fill: "none",
  }),

  title: (
    <text textAnchor="middle" fontSize="25px">
      EVI in the Month of May
    </text>
  ),
  axes: [
    {
      orient: "left",
      label: {
        name: "Percentage of Pixels of a Given Color",
        locationDistance: 60,
      },
    },
    {
      orient: "bottom",
      label: { name: "Year", locationDistance: 55 },
      tickValues: [2016, 2017, 2018, 2019, 2020],
    },
  ],
  hoverAnnotation: true,

  tooltipContent: (d) => (
    <div className="tooltip-content">
      <p>Pixels: {d.frequency}</p>
    </div>
  ),
};

export default class App extends Component {
  render() {
    let colors = [];
    for (let i = 0; i < 9; i++) {
      colors.push(data[i]["color"]);
    }

    return (
      <div>
        <div className="App">
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              className="summary"
            >
              <Typography>EVI Data</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails color="grey">
              <Grid container direction="row">
                <Grid item>
                  <XYFrame {...frameProps} tooltipStyles />
                </Grid>
                <Grid item>
                  <div style={{ padding: 30 }}>
                    <Grid container direction="column">
                      {colors.map((color) => (
                        <Grid item>
                          <Circle bgColor={color} />
                        </Grid>
                      ))}
                    </Grid>
                  </div>
                </Grid>
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </div>
    );
  }
}
