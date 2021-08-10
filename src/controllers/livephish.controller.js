import axios from "axios";
import chalk from "chalk";
import {LivePhish} from "../livePhish.js";
import {envConfig} from "../../config/config.env.js";

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
            const req = await axios.post(`${envConfig.serverUrl}/api/download`,data);
        } catch(err) {
            console.log(chalk.red(`Error: ${err}`));
        }

        return res.json({data:`Success!`});
    }

    async generateBookmarklet(req,res) {
        const bookmarklet = `javascript: (()=>{let e=document.getElementById("you-enjoy-myself");e&&e.parentNode.removeChild(e);let t=document.createElement("script");t.id="you-enjoy-myself",t.type="text/javascript";let o=()=>{const e=document.cookie;let t=angular.element("[ng-controller=AppController]").scope().$$childHead,o=t.$$nextSibling;const n=(o=o?t.$$nextSibling.recording:t.$$childHead.$$nextSibling.recording).getTracks();let i=[];for(const e of n)i.push({id:e.ID(),title:e.title()});let l={cookies:e,recording:{album:o.title(),artist:o.artistName(),tracks:i}};const c=\`${envConfig.serverUrl}/api/livephish\`;fetch(c,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(l)})};t.appendChild(document.createTextNode(o)),document.body.appendChild(t),o()})(document);`;
        return res.json({data:bookmarklet});
    }
}
