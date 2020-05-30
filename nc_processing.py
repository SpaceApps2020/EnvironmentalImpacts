import os
import rasterio as rio
import earthpy as et

with rio.open('../V2018344203600.L2_JPSS1_OC.tif') as data:
    print(data.bounds)

