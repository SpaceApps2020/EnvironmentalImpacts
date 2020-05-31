import React, { Component } from "react";
import "../node_modules/react-linechart/dist/styles.css";
import XYFrame from "semiotic/lib/XYFrame";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

//PUT ONE IMAGE INTO THE src FILE AND IMPORT IT
import EVIImage from "./2018_EVI.png";
import AlbedoImage from "./2018_Albedo.png";
import SSTImage from "./2018_STT_feb-may.png";

//IMPORT DATA HERE
import text from "./VegetationData.json";
import sst_data from "./TemperatureData.json";
import albedo_data from "./SurfaceAlbedoData.json";

class Circle extends Component {
  render() {
    var circleStyle = {
      padding: 5,
      margin: 5,
      marginLeft: -30,
      display: "inline-block",
      backgroundColor: this.props.bgColor,
      borderRadius: "50%",
      width: 10,
      height: 10,
    };

    return <div style={circleStyle}></div>;
  }
}

class Panel extends Component {
  render() {
    let colors = [];
    for (let i = 0; i < 9; i++) {
      colors.push(this.props.data[i]["color"]);
    }
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className="summary"
        >
          <Typography variant="h5">{this.props.dataType} Data</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails color="grey">
          <Grid container direction="row">
            <Grid item>
              <XYFrame {...this.props.frameProps} hoverAnnotation={true} />
            </Grid>
            <Grid item>
              <div style={{ padding: 30 }}>
                <Grid container direction="column">
                  {colors.map((color) => (
                    <Grid container direction="row">
                      <Grid item>
                        <Circle bgColor={color} />
                      </Grid>
                      <Grid item>
                        {colors.indexOf(color) === 0 ? (
                          <div style={{ padding: 5 }}>
                            <text fontSize="15px">
                              Lowest {this.props.dataType}
                            </text>
                          </div>
                        ) : colors.indexOf(color) === 8 ? (
                          <div style={{ padding: 5 }}>
                            <text fontSize="15px">
                              {" "}
                              Highest {this.props.dataType}
                            </text>
                          </div>
                        ) : null}
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
              </div>
            </Grid>
            <Grid item>
              <div style={{ paddingTop: 40 }}>
                <img src={this.props.image} with="350px" height="250px" />
                <Typography align="center">
                  {" "}
                  Sample {this.props.dataType} Image{" "}
                </Typography>
              </div>
            </Grid>
            <Grid item>
              <Typography>{this.props.description}</Typography>
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

function processData(data) {
  var processedData = [];
  for (var i = 0; i < 9; i++) {
    processedData.push({ color: data["2016"][i]["color"], coordinates: [] });
  }

  for (var i = 0; i < 9; i++) {
    for (var j = 2016; j <= 2020; j++) {
      processedData[i].coordinates.push({
        date: j.toString(),
        frequency: data[j.toString()][i]["freq"],
      });
    }
  }
  return processedData;
}

//put data in the form [{color: "some rgb value", coordinates: [{year: "2016", frequency: "some frequency"}, ...]}...]
//if your JSON file is in the same format as mine, the processData method should work for you too. Just pass in the text from the JSON file
var EVIdata = processData(text);
var SSTdata = processData(sst_data); //fill this out @Amitav
var Albedodata = processData(albedo_data); //fill this out @Deepta

const EVIframeProps = {
  lines: EVIdata,
  lineType: "linepercent",
  size: [700, 400],
  margin: { left: 100, bottom: 90, right: 30, top: 40 },
  xAccessor: "date",
  yAccessor: "frequency",
  title: <text> EVI in May of 2016-2020 </text>,
  lineStyle: (d, i) => ({
    stroke: EVIdata[i]["color"],
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

  tooltipContent: (d) => (
    <div className="tooltip-content">
      <p>Pixels: {d.frequency}</p>
    </div>
  ),
};

//@Deepta change the "lines" to your data, change title, margins
const AlbedoframeProps = {
  lines: Albedodata,
  lineType: "linepercent",
  size: [700, 400],
  margin: { left: 100, bottom: 90, right: 30, top: 40 },
  xAccessor: "date",
  yAccessor: "frequency",
  title: <text> Surface Albedo in May of 2016-2020 </text>,
  lineStyle: (d, i) => ({
    stroke: Albedodata[i]["color"],
    strokeWidth: 3,
    fill: "none",
  }),

  title: (
    <text textAnchor="middle" fontSize="25px">
      Surface Albedo in the Month of May
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

  tooltipContent: (d) => (
    <div className="tooltip-content">
      <p>Pixels: {d.frequency}</p>
    </div>
  ),
};

//@Amitav change the "lines" to your data, change title, margins
const SSTframeProps = {
  lines: SSTdata,
  lineType: "linepercent",
  size: [700, 400],
  margin: { left: 100, bottom: 90, right: 30, top: 40 },
  xAccessor: "date",
  yAccessor: "frequency",
  title: <text> EVI in May of 2016-2020 </text>,
  lineStyle: (d, i) => ({
    stroke: SSTdata[i]["color"],
    strokeWidth: 3,
    fill: "none",
  }),

  title: (
    <text textAnchor="middle" fontSize="25px">
      Average SST from Febrary 1st to May 31st
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

  tooltipContent: (d) => (
    <div className="tooltip-content">
      <p>Pixels: {d.frequency}</p>
    </div>
  ),
};

export default class App extends Component {
  render() {
    return (
      <div className="App" style={{ padding: 30 }} backgroundColor="grey">
        <Typography color="textPrimary" variant="h3" align="center">
          Environmental Impact of COVID-19
        </Typography>
        <div style={{ padding: 30 }}>
          <Paper>
            <div style={{ padding: 10 }}>
              <Typography variant="h6">
                In the NASA SpaceApps COVID-19 Challenge, we were tasked with
                examining the "potential impacts of reduced human traffic" in
                protected environments, such as beaches, parks, marine monuments
                and other wilderness areas. These impacts could manifest in
                different forms, for example, a reduction in land degradation, a
                change in water quality, or a change in vegetation growth. This
                project focuses on the Long Island area. Click on the tabs below
                to learn more!
              </Typography>
            </div>
          </Paper>
        </div>
        <div style={{ padding: 30 }}>
          <Panel
            frameProps={EVIframeProps}
            data={EVIdata}
            image={EVIImage}
            dataType={"EVI"}
            description={
              "EVI, or Enhanced vegetation index is a measure of vegetation greenness. Regions with a higher EVI value have more and healthier vegetation compared to regions with a lower EVI value. The graph on the right was created by using NASA MODIS HDF data to generate an image of the Long Island region and then counting the number of pixels at each EVI threshold. The graph represents the change in the EVI of Long Island during the month of May over time from 2016 to 2020."
            }
          />
          {
            //@Deepta change the data to Albedodata and add an image + description
          }
          <Panel
            frameProps={AlbedoframeProps}
            data={Albedodata}
            image={AlbedoImage}
            dataType={"Albedo"}
            description={
              "The surface albedo measures what proportion of incident light or radiation is reflected by a surface. Ice has a very high albedo, as it reflects a large proportion of incidenct light, while regions such as dense forests have low albedos, as they are dark and nonreflective. The graph shown here was constructed by retrieving netCDF data from NASA GES DISC and then determining the frequency of pixels in each albedo range, separated by color. The graph shows the surface albedo data of the Long Island region in May from 2016 to 2020."
            }
          />
          {
            //@Amitav change the data to SSTdata and change image + description
          }
          <Panel
            frameProps={SSTframeProps}
            data={SSTdata}
            image={SSTImage}
            dataType={"SST"}
            description={
              "Sea Surface Temperature (SST) is the temperature of the water between 1mm and 20m deep. The graph was made using NASA Aqua MODIS netCDF data."
            }
          />
        </div>
      </div>
    );
  }
}
