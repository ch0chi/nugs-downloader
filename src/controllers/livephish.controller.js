import axios from "axios";
import chalk from "chalk";
import {LivePhish} from "../livePhish.js";

export class LivephishController {

    async getLivePhishScope(req,res) {
        const cookies = req.body.cookies;
        const recording = req.body.recording;

        const livePhish = new LivePhish(cookies, recording);

        try{
            const tracks = await livePhish.getTrackUrls();
            const data = {
                tracks:tracks,
                album:livePhish.getAlbum(),
                artist:livePhish.getArtistName()
            };
            const req = await axios.post(`http://localhost:3000/download`,data);
        } catch(err) {
            console.log(chalk.red(`Error: ${err}`));
        }

        return res.json({data:`Success!`});

    }
}
