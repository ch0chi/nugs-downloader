import chalk from 'chalk';
import {exec} from "child_process";
import path from 'path';
import {DownloadService} from "../services/download.service.js";

export class DownloadController {

    downloadService;

    constructor() {
        this.downloadService = new DownloadService();
    }

    async downloadTracks(req, res) {
        const tracks = req.body.tracks;
        const album = req.body.album;
        const artist = req.body.artist;

        console.log(chalk.cyan(`Download initiated for ${artist} - ${album}...`));

        const baseDir = process.env.BASE_DIR;
        const artistDirName = `${baseDir}${artist.trim()}`;
        const albumDirName = this.downloadService.prepareAlbumDirName(artistDirName,album);

        //Create directories
        try{
            await this.downloadService.createFolder(artistDirName);
            await this.downloadService.createFolder(albumDirName);
        } catch(e) {
            console.log(chalk.red(e));
        }

        //Download and save tracks
        let currTrack = 1;
        for(let track of tracks) {
            let trackName = track.title;
            const fileName = `${albumDirName}/${trackName}.m4a`;
            try {
                await this.downloadService.downloadTrack(track.url, fileName, track.title, currTrack, tracks.length);
                currTrack++;
            }
            catch(err) {
                console.log(chalk.red(`Error downloading track! ${err}`));
            }
        }

        //todo work in progress for converting from m4a to mp3
        // const script = `${process.cwd()}/convertM4a.sh`;
        // exec(`bash ${script} -p '.${albumDirName}/'`,(err, stdout, stderr) => {
        //     console.log('got here');
        //     if(err) {
        //         console.log(chalk.red(err));
        //     } else {
        //         console.log(chalk.blue(`stdout: ${stdout}`));
        //         console.log(chalk.red(`stderr: ${stderr}`));
        //     }
        // })
        return res.json({data: 'Success!'});
    }
}


