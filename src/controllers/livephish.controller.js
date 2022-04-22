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
        const bookmarklet = `javascript: (()=>{let a=document.getElementById("you-enjoy-myself");a&&a.parentNode.removeChild(a);let b=document.createElement("script");b.id="you-enjoy-myself",b.type="text/javascript";let c=()=>{const a=document.cookie;let b=angular.element("[ng-controller=AppController]").scope(),c=b.$$childHead.$$nextSibling,d={};d=b.hasOwnProperty("userInfo")?b.userInfo:b.user,c=c?b.$$childHead.$$nextSibling.recording:b.$$childHead.$$childHead.$$nextSibling.recording;const e=c.getTracks();let f=[];for(const a of e)f.push({id:a.ID(),title:a.title()});let g={cookies:a,recording:{album:c.title(),artist:c.artistName(),tracks:f},user:{startDateStamp:d.subStartDateStamp(),endDateStamp:d.subEndDateStamp(),nn_userID:d.ID(),subCostplanIDAccessList:d.subCostplanIDAccessList(),subscriptionID:d.subID()}};const h=\`${envConfig.proxyUrl}/${envConfig.serverUrl}/api/livephish\`,i=fetch(h,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(g)})};b.appendChild(document.createTextNode(c)),document.body.appendChild(b),c()})(document);`;
        return res.json({data:bookmarklet});
    }
}
