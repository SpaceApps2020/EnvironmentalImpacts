from PIL import Image
im = Image.open('2020_EVI.png')

pix = im.load()

x_size = im.size[0]
y_size = im.size[1]

colors = [(255, 255, 229), (247, 252, 185), (217, 240, 163), (173, 221, 142), (120, 198, 121),
          (65, 171, 93), (35, 132, 67), (0, 69, 41), (0, 104, 55)]


color_frequencies = []
for i in range(0, 9):
    color_frequencies.append({"color": str(i + 1), "freq": 0})

for i in range(x_size):
    for j in range(y_size):
        if(pix[i, j] in colors):
            color_frequencies[colors.index(pix[i, j])]["freq"] += 1

print(color_frequencies)
