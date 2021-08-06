import {Nugs} from "../nugs.js";
import chalk from "chalk";
import axios from "axios";
export class NugsController {

    async getNugsScope(req, res) {
        const user = req.body.user;
        const recording = req.body.recording;
        const nugs = new Nugs(user,recording);

        try{
            const tracks = await nugs.getTrackUrls();
            const data = {
                tracks:tracks,
                album:nugs.getAlbum(),
                artist:nugs.getArtistName()
            };

            const req = await axios.post(`http://localhost:3000/download`,data);
        } catch(err) {
            console.log(chalk.red(`Error: ${err}`));
        }
        return res.json({data: `Success!`});
    }
}
