


# Nugs.net and Live Phish Plus Downloader


An app that downloads **any** show from either nugs.net or plus.livephish.com with a click of a button.

**Note: You must be a Nugs member to download shows off of Nugs, or a Live Phish Plus member to download shows off of Live Phish Plus.**

## Requirements:
Node version >= 14.0.0

## Installation:

1. `git clone git@github.com:ch0chi/nugs-downloader.git`
2. `cd nugs-downloader`
3. Run `npm install` in server root to install required packages for the server.
4. Install and build client packages
    - `cd client`
    - `npm install && npm run build`
5. Copy the .env.example file to a new .env file
    - `cp .env.example .env`
6. Configure the .env file
```
   BASE_DIR="<required: the directory where you want to all shows to download to.>"
   PROXY_HOST='<optional: the full url for the proxy host'
   PROXY_PORT='<optional: the proxy host port>'
   SERVER_HOST='<optional: the full url for the api server host>'
   SERVER_PORT='<optional: the api server host port>'
   ```
- Gotchas and Notes
    - When setting the BASE_DIR variable, be sure to include a trailing slash at the end of the path.

## Usage

### First Time Usage
When first using the app, you'll need to add the bookmarklet scripts to your browser's bookmark bar.
Luckily, this app will auto-generate these into draggable links via a fancy front-end.

Start up the client and api server:
`npm run start-all`

The terminal should output something like the following:
```

   ┌────────────────────────────────────────┐
   │                                        │
   │   Serving!                             │
   │                                        │
   │   Local:  http://localhost:5000        │
   │                                        │
   │   Copied local address to clipboard!   │
   │                                        │
   └────────────────────────────────────────┘

```
Copy and paste the url next to "Local" in your browser, and follow the instructions provided.

**Note:** you can keep the terminal session running after this step. The download server will be running. However, for future use, you will only need to start the download server (See Download Server below).


### Download Server
Starting the download server: `npm run serve`
- The download server will continiously run in the terminal session until stopped.
- Download status will print to the terminal.


### Bookmarklets
The app provides an auto-generated bookmarklet for each streaming platform.
If you ever need to re-generate the bookmarklets, follow the "First Time Usage" steps.

### Converting tracks to mp3
I provided a bash shell script that will convert all ".m4a" files into .mp3 files. You'll need to install ffmpeg to use the shell script.
- The shell script can be run either inside of the downloaded album directory or outside.
- The script will first convert the track to mp3 and then delete the old m4a track.
