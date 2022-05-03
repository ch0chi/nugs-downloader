import axios from "axios";
import chalk from "chalk";
import {LivePhish} from "../livePhish.js";
import {envConfig} from "../../config/config.env.js";

export class LivephishController {

    async getLivePhishScope(req,res) {
        const cookies = req.body.cookies;
        const recording = req.body.recording;
        const user = req.body.user;

        const livePhish = new LivePhish(cookies, user, recording);

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
        const bookmarklet = `javascript: (()=>{let a=document.getElementById(\`you-enjoy-myself\`);a&&a.parentNode.removeChild(a);let b=document.createElement("script");b.id="you-enjoy-myself",b.type="text/javascript";let c=()=>{const a=document.cookie;let b=angular.element("[ng-controller=AppController]"),c=b.scope(),d=c.$$childHead.$$nextSibling,e={};e=c.hasOwnProperty("userInfo")?c.userInfo:c.user,d=d?c.$$childHead.$$nextSibling.recording:c.$$childHead.$$childHead.$$nextSibling.recording;const f=d.getTracks();let g=[];for(const a of f)g.push({id:a.ID(),title:a.title()});let h={cookies:a,recording:{album:d.title(),artist:d.artistName(),tracks:g},user:{startDateStamp:e.subStartDateStamp(),endDateStamp:e.subEndDateStamp(),nn_userID:e.ID(),subCostplanIDAccessList:e.subCostplanIDAccessList(),subscriptionID:e.subID(),signSubMagicString:b.injector().get("SIGNSUB_MAGIC_STRING")}};const i=\`${envConfig.proxyUrl}/${envConfig.serverUrl}/api/livephish\`,j=fetch(i,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(h)})};b.appendChild(document.createTextNode(c)),document.body.appendChild(b),c()})(document);`;
        return res.json({data:bookmarklet});
    }
}
