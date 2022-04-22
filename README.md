


# Nugs.net and Live Phish Plus Downloader


An app that downloads **any** show from either nugs.net or plus.livephish.com with a click of a button.

**Note: You must be a Nugs member to download shows off of Nugs, or a Live Phish Plus member to download shows off of Live Phish Plus.**

**Note (04/2022 update): I am currently updating the LivePhish script to work. It seems a bug has arisen that requires the `tk` url param
to be present when fetching a track. I'll update this within the week.**
## Requirements:
Node version >= 14.0.0

## Installation:

1. `git clone git@github.com:ch0chi/nugs-downloader.git`
2. `cd nugs-downloader`
3. Run `npm install` in server root to install required packages for the server.
4. Copy the .env.example file to a new .env file
    - `cp .env.example .env`
5. Configure the .env file
```
   BASE_DIR="<required: the directory where you want to all shows to download to.>"
   PROXY_HOST='<optional: the full url for the proxy host'
   PROXY_PORT='<optional: the proxy host port>'
   SERVER_HOST='<optional: the full url for the api server host>'
   SERVER_PORT='<optional: the api server host port>'
   LIVE_PHISH_TK='<required if downloading for live phish:
    the tk url param found when playing a song.
    Check the console for the value.
    Should appear when the streamPlayer attempts to fetch a track.>
   ```
- Gotchas and Notes
    - When setting the BASE_DIR variable, be sure to include a trailing slash at the end of the path.

## Usage

### First Time Usage
When first using the app, you'll need to add the bookmarklet scripts to your browser's bookmark bar.
Luckily, this app will auto-generate these into draggable links via a fancy front-end.

Start the server by running `npm run serve`

The terminal will output a link to the bookmarklet generator url:
```

#################################################################
####################### Bookmarklet URL #########################
#################################################################
           http://localhost:3000/public/bookmarklets
#################################################################


```
Copy and paste the bookmarklet url into your browser, and follow the instructions provided.

**Note:** you can keep the terminal session running after this step. The download server will be running.


### Starting the Server
Starting the download server (must be in root directory of the app): `npm run serve`
- The download server will continuously run in the terminal session until stopped.
- Download status will print to the terminal.

### Bookmarklets
The app provides an auto-generated bookmarklet for each streaming platform.
If you ever need to re-generate the bookmarklets, follow the "First Time Usage" steps.

### Converting tracks to mp3
I provided a bash shell script that will convert all ".m4a" files into .mp3 files. You'll need to install ffmpeg to use the shell script.
- The shell script can be run either inside of the downloaded album directory or outside.
- The script will first convert the track to mp3 and then delete the old m4a track.
