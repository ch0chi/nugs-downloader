import axios from "axios";
import ProgressBar from 'progress';
import fs from 'fs';
import chalk from 'chalk';

//todo add error handling for failed
export class DownloadService {

    async downloadTrack(url, path, title, currTrack, totalTracks) {

        const { data, headers } = await axios({
            url,
            method: 'GET',
            responseType: 'stream'
        });
        const totalLength = headers['content-length'];
        const progress = new ProgressBar(`-> downloading ${title} (${currTrack}/${totalTracks}) [:bar] :percent :etas`, {
            width: 40,
            complete: '=',
            incomplete: ' ',
            renderThrottle: 1,
            total: parseInt(totalLength)
        });

        const writer = fs.createWriteStream(path,{flags:'wx+'});
        writer.on('error', (err) => {
            //assume type 2 jam, and therefore duplicate is actually just a continuation of the song...
            if(err.code === 'EEXIST') {
                path = this.getType2(path);
                return this.downloadTrack(url,path,title,currTrack,totalTracks);
            } else {
                throw err;
            }
        })
        data.on('data', (chunk) => {
            progress.tick(chunk.length)
        })

        if(currTrack === totalTracks) {
            writer.on('finish', (data) => {
                console.log(chalk.green(`Finished!`));
            })
        }
        data.pipe(writer)
    }
    async createFolder(dir) {
        if(!fs.existsSync((dir))) {
            try{
                await fs.promises.mkdir(dir);
                console.log(chalk.green(`Created new directory in ${chalk.underline(dir)}`));
            } catch(e) {
                throw new Error(`Error creating ${dir}`);
            }
        } else{
            console.log(chalk.yellow(`Did not create ${chalk.underline(dir)}. The directory already exists!`));
        }
    }

    /**
     *If song is a type 2 jam, there will be multiple song titles with the same name.
     *We handle type 2 jams by appending a [n] to the end of the song title. Where n represents the
     * number of times that song occurs. (i.e. Lawn Boy, Crosseyed and Painless, Lawn Boy [2])
     * This function will check for the last occurrence of [n], update the occurrence so that [n] is [n + 1].
     * If no [n] match found, returns [2].
     * @param song
     * @returns {null|*}
     */
    getType2(song) {
        const rawSong = song.split('.m4a')[0];
        const reg = /\[+[^\]]*]*(?!.*\[)/; //checks for last occurrence of []
        let matched = rawSong.match(reg);
        if(matched) {
            matched = matched[0].match(/\d+/);
            if(matched) {
                const occurrence = parseInt(matched[0]);
                const rawName = rawSong.split(`[${occurrence}]`)[0];
                const updatedOccurrence = occurrence + 1;
                return `${rawName}[${updatedOccurrence}].m4a`;
            }
            //looks like there was a string in the match... return original song string
            return song;
        }
        return `${rawSong} [2].m4a`;
    }

    /**
     * @deprecated
     * @param track
     * @returns {string}
     */
    getTrackName(track){
        const end = track.indexOf('.m4a');
        const start = track.split('_')[2];
        let trackName = track.substring(track.indexOf(start),end) + '.m4a';
        trackName = trackName.replace(/_/g,' ');
        return trackName;
    }
}
