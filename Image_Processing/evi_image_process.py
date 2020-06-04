from PIL import Image


class ImageProcessor():
    def __init__(self, img_name):
        self.im = Image.open(img_name)
        self.pix = self.im.load()
        self.x_size = self.im.size[0]
        self.y_size = self.im.size[1]
        self.colors = [(255, 255, 229), (247, 252, 185), (217,
                                                          240, 163), (173, 221, 142), (120, 198, 121),
                       (65, 171, 93), (35, 132, 67), (0, 104, 55), (0, 69, 41)]
        self.color_frequencies = []

    def process(self):
        for i in range(0, 9):
            self.color_frequencies.append(
                {"color": "rgb" + str(self.colors[i]) + "", "freq": 0})
        for i in range(self.x_size):
            for j in range(self.y_size):
                if(self.pix[i, j] in self.colors):
                    self.color_frequencies[self.colors.index(
                        self.pix[i, j])]["freq"] += 1
        return self.color_frequencies


f = open("../enviroviz/src/VegetationData.json", "w")
f.write("{\n")
for i in ("2016_EVI.png", "2017_EVI.png", "2018_EVI.png", "2019_EVI.png", "2020_EVI.png"):
    processor = ImageProcessor("../EVI_Images/" + i)
    processor.process()
    f.write('"' + str(i[0:4]) + '"' + " : " +
            str(processor.color_frequencies) + ",\n ")

f.write("\n}")
