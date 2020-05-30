# importing of NetCDF files
import netCDF4
# plotting and data visualisations
from matplotlib import pyplot as plt
# n-dimensional arrays
import numpy as np
# high level functions for working with NetCDF files
import xarray as xr
# add colour labels to plot
import matplotlib.patches as mpatches

data = xr.open_dataset('V2018344203600.L2_JPSS1_OC.nc')
print(data)
