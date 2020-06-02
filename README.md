# Environmental Impact of COVID-19

In the [NASA SpaceApps COVID-19 Challenge](https://covid19.spaceappschallenge.org/), we were tasked with examining the "potential impacts of reduced human traffic" in protected environments, such as beaches, parks, marine monuments and other wilderness areas. These impacts could manifest in different forms, for example, a reduction in land degradation, a change in water quality, or a change in vegetation growth. Our project focuses on the Long Island area, and tracks EVI (Enhanced Vegetation Index), Surface Albedo (proportion of incident light or radiation is reflected by a surface), and SST (sea surface temperature) in this region. Check out our team [here](https://covid19.spaceappschallenge.org/challenges/covid-challenges/new-perspective/teams/corona-crushers/project)!

## How was this created?
We started by downloading our data from the NASA Giovanni visualizer and NASA Earthdata search in HDF format (for EVI) and netCDF format (for SST and surface albedo) for May 2016, 2017, 2018, 2019, and 2020. We then used panoply to visualize the data, and zoomed in on the Long Island region, ensuring that we were consistent with coordinates. The visualization showed the level of EVI, SST, or surface albedo on a 9-color scale, with more vibrant colors depicting higher levels of the given variable and paler colors depicting lower levels. After saving this image as a png, we ran it through a python image processor that we wrote, which counted the frequency of each color on the scale. We displayed our data on a website made with ReactJS using the Material-UI library. On this site, we show plots of the frequency of each color versus time for all 3 of our data sets and also provide sample images of what the data we processed looks like. The site also contains additional information about the variables we used.

## Sneak peek
Here is a graph that shows EVI over time
![](Screen%20Shot%202020-06-02%20at%2011.11.54%20AM.png)

So what can we deduce from this?
* We see a slight increase in vegetation greenness between May 2019 and May 2020 
* We see drastic fluctuations in EVI prior to 2019 meaning that the change in 2020 may not be statistically significant

We plan to increase out dataset to include years prior to 2016 to get a better idea of the trends in EVI and whether or not 2020 marks a significant deviation. If you clone and run this project, you can interact with the EVI chart yourself along with charts for Surface Albedo and SST to draw your own conclusions!

## How do I run this project?
Start by installing [`yarn`](https://classic.yarnpkg.com/en/docs/getting-started)

Then run the following commands in your terminal:
1. `git clone https://github.com/SpaceApps2020/EnvironmentalImpacts.git`
2. `cd EnvironmentalImpacts/enviroviz`
3. `yarn install`
4. `yarn start`

This should automatically open `http://localhost:3000/` on your computer where the webapp will be running!
