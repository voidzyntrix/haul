# Haul

Paste a link, keep the video. Haul saves video and audio from TikTok, Instagram, Facebook, X, Reddit, Vimeo and a thousand more sites, on your own phone or computer: no server in between, no account, no tracking.

This repository holds the website, **https://voidzyntrix.github.io/haul/**, and the downloads:

- **Windows, macOS, Linux:** [latest release](https://github.com/voidzyntrix/haul/releases/latest) (`Haul-Windows.exe`, `Haul-macOS.zip`, `Haul-Linux.tar.gz`). Free and unlimited.
- **Android:** [Google Play](https://play.google.com/store/apps/details?id=io.github.voidzyntrix.haul). Free with 5 downloads a day, or a one-time payment for more.

The apps' source code is kept in a separate, private repository; its release workflow publishes the desktop builds here.

## The website

A single static page with no build step: `index.html`, `landing.css`, `landing.js`, `theme-boot.js` and two icons. It loads nothing from other sites and its Content-Security-Policy stops it from connecting anywhere. GitHub Pages serves it from the root of `main` (Settings → Pages → Deploy from a branch → `main` / `(root)`).

To look at it locally:

```bash
python -m http.server 8130 --bind 127.0.0.1
```

Haul uses [yt-dlp](https://github.com/yt-dlp/yt-dlp) and [ffmpeg](https://ffmpeg.org/), which are separate projects under their own licences.
