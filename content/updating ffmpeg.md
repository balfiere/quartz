---
created: 2025-07-18T18:00:55.5555-05:00
modified: 2025-07-19T00:24:28.2828-05:00
tags: [linux]
publish: true
---


the version of ffmpeg that comes installed on pop os 22.04 is version 4.4.2, which doesn't come with `libsvtav1` to make [[video to avif|avif files]] and doesn't work well with [[normalizing audio#batch normalize audio files|ffmpeg-normalize]]. i followed [this tutorial](https://docs.vultr.com/how-to-install-the-latest-static-build-of-ffmpeg) to install it but got the version [here](https://gist.github.com/BlueSwordM/86dfcb6ab38a93a524472a0cbe4c4100). also see another av1 encoding tutorial [here](https://gist.github.com/mrintrepide/b3009f5d0f08d437ebbb4c17cbf36e18).

```bash
sudo apt remove ffmpeg
sudo mkdir -p /opt/ffmpeg
cd /opt/ffmpeg
sudo wget https://github.com/BtbN/FFmpeg-Builds/releases/download/latest/ffmpeg-master-latest-linux64-gpl.tar.xz
sudo tar xvf ffmpeg-master-latest-linux64-gpl.tar.xz
cd ffmpeg-*-gpl/bin/
sudo ln -s "${PWD}/ffmpeg" /usr/bin/
sudo ln -s "${PWD}/ffprobe" /usr/bin/
sudo ln -s "${PWD}/ffplay" /usr/bin/
```
