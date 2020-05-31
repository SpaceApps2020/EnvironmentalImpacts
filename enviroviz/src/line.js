import XYFrame from "semiotic/lib/XYFrame"
const theme = ["#ac58e5","#E0488B","#9fd0cb","#e0d33a","#7566ff","#533f82","#7a255d","#365350","#a19a11","#3f4482"]
const frameProps = { 
/* --- Data --- */
  lines: [{ title: "Ex Machina", coordinates: [{ week: 1, grossWeekly: 327616, theaterCount: 4, theaterAvg: 81904, date: "2015-04-10", rank: 18 },
        { week: 2, grossWeekly: 1150814, theaterCount: 39, theaterAvg: 29508, date: "2015-04-17", rank: 15 }, ... ] },
    { title: "Far from the Madding Crowd", coordinates: [{ week: 1, grossWeekly: 240160, theaterCount: 10, theaterAvg: 24016, date: "2015-05-01", rank: 24 },
        { week: 2, grossWeekly: 1090487, theaterCount: 99, theaterAvg: 11015, date: "2015-05-08", rank: 15 }, ... ] }],

/* --- Size --- */
  size: [700,400],
  margin: { left: 80, bottom: 90, right: 10, top: 40 },

/* --- Process --- */
  xAccessor: "week",
  yAccessor: "theaterCount",
  yExtent: [0],

/* --- Customize --- */
  lineStyle: (d, i) => ({
    stroke: theme[i],
    strokeWidth: 2,
    fill: "none"
  }),
  title: (
    <text textAnchor="middle">
      Theaters showing <tspan fill={"#ac58e5"}>Ex Machina</tspan> vs{" "}
      <tspan fill={"#E0488B"}>Far from the Madding Crowd</tspan>
    </text>
  ),
  axes: [{ orient: "left", label: "Number of Theaters", tickFormat: function(e){return e/1e3+"k"} },
    { orient: "bottom", label: { name: "Weeks from Opening Day", locationDistance: 55 } }]
}

export default () => {
  return <XYFrame {...frameProps} />
} 