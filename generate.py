import hashlib, colorsys
from PIL import Image

id = 852547 # joric's id, see https://api.github.com/users/joric
size = 420

h = hashlib.md5(str(id).encode('utf-8')).hexdigest()
m = list(map(lambda c:int(c,16),h))
h,l,s = m[25]<<8|m[26]<<4|m[27],m[30]<<4|m[31],m[28]<<4|m[29]
rgb = colorsys.hls_to_rgb(h/16/256,(960-l)/5/256,(832-s)/5/256)
fg = tuple(map(lambda x:round(x*255),rgb))
bg = (240, 240, 240)
img = Image.new('RGB', (size, size), bg)
r = size // (5 + 1)
box = lambda img,x,y,r,c:any(img.putpixel((i,j),c) for i in range(x,x+r) for j in range(y,y+r))
any(box(img, x*r+r//2, y*r+r//2, r, fg) for x in range(5) for y in range(5) if m[[2,1,0,1,2][x]*5+y]%2==0)

img.save(f'{id}.png')
