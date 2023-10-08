import hashlib, colorsys
from PIL import Image

id = 852547 # joric's id, see https://api.github.com/users/joric, https://github.com/identicons/joric.png
size = 420

h = hashlib.md5(str(id).encode('utf-8')).hexdigest()
m = list(map(lambda c:int(c,16),h))
h,l,s = m[25]<<8|m[26]<<4|m[27],m[30]<<4|m[31],m[28]<<4|m[29]
rgb = colorsys.hls_to_rgb(h/16/256,(192-l/5)/256,(832/5-s/5)/256)
fg = tuple(map(lambda x:round(x*255),rgb))
bg = (240, 240, 240)
img = Image.new('RGB', (size, size), bg)
r = lambda img,x,y,d,c:any(img.putpixel((i,j),c) for i in range(x,x+d) for j in range(y,y+d))
d = size // (5 + 1)

for y in range(5):
    for x in range(5):
        if m[[2,1,0,1,2][x]*5+y]%2==0:
            r(img, x*d+d//2, y*d+d//2, d, fg)

img.save(f'{id}.png')
