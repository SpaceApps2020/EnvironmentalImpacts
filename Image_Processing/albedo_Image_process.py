from PIL import Image
import os

class ImageProcessor():
    def __init__(self, img_name):
        self.im = Image.open(img_name)
        self.pix = self.im.load()
        self.x_size = self.im.size[0]
        self.y_size = self.im.size[1]
        self.colors = [(8,48,107), (8, 81, 156), (33, 113, 181), (66, 146, 198), (107, 174, 214), (158, 202, 225), (198, 219, 239), (222, 235, 247), (247, 251, 255)]
        self.color_frequencies = []

    def process(self):
        for i in range(0, 9):
            self.color_frequencies.append(
                {"color": "rgb" + str(self.colors[i]) + "", "freq": 0})
        for i in range(self.x_size):
            for j in range(self.y_size):
                if(self.pix[i, j] in self.colors):
                    self.color_frequencies[self.colors.index(self.pix[i, j])]["freq"] += 1
        return self.color_frequencies

f = open("../enviroviz/src/SurfaceAlbedoData.json", "w")
f.write("{\n")

for i in ('2016_Albedo.png', '2017_Albedo.png', '2018_Albedo.png', '2019_Albedo.png', '2020_Albedo.png'):
    path = '../Albedo_Images/' + i
    processor = ImageProcessor(path)
    f.write('"' + str(i[0:4]) + '"' + " : " + str(processor.process()) + ",\n ")

f.write("\n}")
