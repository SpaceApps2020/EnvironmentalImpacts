from PIL import Image
import os

class ImageProcessor():
    def __init__(self, img_name):
        self.im = Image.open(img_name)
        self.pix = self.im.load()
        self.x_size = self.im.size[0]
        self.y_size = self.im.size[1]
        self.colors = [(10, 33, 88), (13, 60, 138), (28, 91, 166), (54, 127, 185), (90, 157, 204), (141, 190, 218), (187, 210, 235), (214, 230, 245), (246, 250, 255)]
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


f = open("./enviroviz/src/VegetationData.json", "w")
f.write("{\n")

for i in ('2016 may.png', '2017 may.png', '2018 may.png', '2019 may.png', '2020 feb.png'):
    path = 'SST Data/' + i
    processor = ImageProcessor(path)
    f.write('"' + str(i[0:4]) + '"' + " : " +
            str(processor.process()) + ",\n ")

f.write("\n}")
