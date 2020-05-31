# import os
# import rasterio as rio
# import earthpy as et
# 
# with rio.open('../V2018344203600.L2_JPSS1_OC.tif') as data:
#     print(data.bounds)
#     print(data.meta)
#     print(data.res)
#     print(data.dataset_mask())

import matplotlib.pyplot as plt
import netCDF4

from PIL import Image
img = Image.open('bias_sst.png')
pix = img.load()
print(pix[500, 500])

