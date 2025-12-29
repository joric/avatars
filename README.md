# Identicon

Original (reverse-engineered) GitHub avatars (identicons) generator

* Live Demo: https://joric.github.io/avatars/

![](https://github.com/identicons/joric.png)

The picture above is an identicon for user "joric" with id 852547, see user id here https://api.github.com/users/joric

Original size is 420x420 pixels. See `generate.py` for details.

## wjhbr

The popular competitive programming meme features user [whjbr](https://www.reddit.com/r/196/comments/zudu8i/competitive_programing_rule/) with a github-like 5x5 avatar.
I tried bruteforcing it and found id [260864](https://api.github.com/user/260864) but it seems deleted.
Neibour users (e.g. [260863](https://api.github.com/user/260863) and [260864](https://api.github.com/user/260865)) exist.
If you know the origin of this avatar, write me via issues section.
There's a [related stackoverflow question](https://stackoverflow.com/questions/49103466/how-to-programmatically-determine-if-a-github-account-uses-the-default-profile-p), that features this avatar.

## References

* https://github.com/kashav/identicon
* https://github.com/stewartlord/identicon.js
* https://github.com/Scientificmagic/identicon
* https://stackoverflow.com/questions/49103466/how-to-programmatically-determine-if-a-github-account-uses-the-default-profile-p
* https://codegolf.stackexchange.com/questions/82290/generate-a-github-avatar
