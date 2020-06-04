import React, { Component } from "react";
import XYFrame from "semiotic/lib/XYFrame";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

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
      <ExpansionPanel expanded="true">
        <ExpansionPanelSummary
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

class FlipCard extends Component {
  constructor() {
    super();
    this.state = {
      isFlipped: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    this.setState((prevState) => ({ isFlipped: !prevState.isFlipped }));
  }
  render() {
    return (
      <Card>
        <CardContent>
          {!this.state.isFlipped ? (
            <Grid container direction="column" alignItems="center">
              <Grid item>
                <div style={{ paddingBottom: 10 }}>
                  <Typography variant="h9">{this.props.frontText}</Typography>
                </div>
              </Grid>
              <Grid item>
                <Button
                  onClick={this.handleClick}
                  fullWidth="true"
                  color="primary"
                >
                  SIGNIFICANCE
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Grid container direction="column" alignItems="center">
              <Grid item>
                <div style={{ paddingBottom: 10 }}>
                  <Typography variant="h9">{this.props.backText}</Typography>
                </div>
              </Grid>
              <Grid item>
                <Button
                  onClick={this.handleClick}
                  fullWidth="true"
                  color="primary"
                >
                  DESCRIPTION
                </Button>
              </Grid>
            </Grid>
          )}
        </CardContent>
      </Card>
    );
  }
}

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
        <Grid container direction="row">
          <div
            style={{
              paddingLeft: 30,
              width: (window.innerWidth - 180) / 3,
            }}
          >
            <FlipCard
              frontText={
                "EVI, or Enhanced vegetation index is a measure of vegetation greenness. "
              }
              backText={
                "EVI is a vegitation index designed to enhance the vegetation signale with improved sensitivity in high biomass regions. An example of its success was reforted by Alfredo Huete and his colleagues in 2006, when they were able to show for the first time that the Amazon Forest does infact exhibit growth during the dry season, a discovery that changed our understanding of the carbon cycle. Overall, EVI has allowed us to gain a better understanding of vegetation density and health, and was adopted as a standard product by NASA. Ibe reasion that is popular with users is because it can eliminate background and atmosphere noises."
              }
            />
          </div>
          <div
            style={{ paddingLeft: 30, width: (window.innerWidth - 180) / 3 }}
          >
            <FlipCard
              frontText={
                "The surface albedo measures what proportion of incident light or radiation is reflected by a surface. Ice has a very high albedo, as it reflects a large proportion of incidenct light, while regions such as dense forests have low albedos, as they are dark and nonreflective."
              }
              backText={
                "Albedo is the measure of the diffuse reflection of solar radiation out of the total solar radiation and measured on a scale from 0 to 1 (where 0 reflects no radiation and 1 reflects all radiation. Surface albedo is defined as the ratio of radiosity to the irradiance received by a surface. The proportion of reflected radiation is defined by the properties of the surface itself, and the spectral and angular distribution of solar radiation reaching the Earth's surface. These factors vary with atmospheric composition and geographic location and time. Unless a wavelength is provided, albedo refers to the entire spectrum of solar radiation. Albedo can affect temperature, though the degree to which it affects the temperature is dependent on the insulation at the specific location. For example, the arctic and the Antarctic are both cold due to low isolation, and although the Sahara desert is significantly hotter, both have relatively high albedo."
              }
            />
          </div>
          <div
            style={{ paddingLeft: 30, width: (window.innerWidth - 180) / 3 }}
          >
            <FlipCard
              frontText={
                "Sea Surface Temperature (SST) is the temperature of the water between 1mm and 20m deep. The graph was made using NASA Aqua MODIS netCDF data."
              }
              backText={
                "A warm SST can cause tropical cylogensis, the development and strengthening of tropical cyclones, over the ocean. SST also affects the behavior of the Earth's atmosphere. While it is important for tropical cylogensis, it is also an important factor in determining the formation of sea for and sea breezes."
              }
            />
          </div>
        </Grid>
        <div style={{ padding: 30 }}>
          <Panel
            frameProps={EVIframeProps}
            data={EVIdata}
            image={EVIImage}
            dataType={"EVI"}
            description={
              "The graph on the right was created by using NASA MODIS HDF data to generate an image of the Long Island region and then counting the number of pixels at each EVI threshold. The graph represents the change in the EVI of Long Island during the month of May over time from 2016 to 2020."
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
              "The graph shown here was constructed by retrieving netCDF data from NASA GES DISC and then determining the frequency of pixels in each albedo range, separated by color. The graph shows the surface albedo data of the Long Island region in May from 2016 to 2020."
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
              "The graph was made using NASA Aqua MODIS netCDF data. We looked at the average SST in the long island area from February 1st to May 31st between 2016 and 2020. The graph shows the frequency of each temperature over time."
            }
          />
        </div>
      </div>
    );
  }
}
