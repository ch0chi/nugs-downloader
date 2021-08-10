import {Nugs} from "../nugs.js";
import chalk from "chalk";
import axios from "axios";
import {envConfig} from "../../config/config.env.js";
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

            const req = await axios.post(`${envConfig.serverUrl}/api/download`,data);
        } catch(err) {
            console.log(chalk.red(`Error: ${err}`));
        }
        return res.json({data: `Success!`});
    }

    generateBookmarklet(req,res) {
        const bookmarklet = `javascript: (()=>{let e=document.getElementById("you-enjoy-myself");e&&e.parentNode.removeChild(e);let t=document.createElement("script");t.id="you-enjoy-myself",t.type="text/javascript";let n=()=>{let e=angular.element("[ng-controller=AppController]").scope().$$childHead,t=e.$$nextSibling;t=t?e.$$nextSibling.recording:e.$$childHead.$$nextSibling.recording;let n={};n=e.hasOwnProperty("userInfo")?e.userInfo:e.user;const s=t.getTracks();let o=[];for(const e of s)o.push({id:e.ID(),title:e.title()});let r={user:{startDateStamp:n.subStartDateStamp(),endDateStamp:n.subEndDateStamp(),nn_userID:n.ID(),subCostplanIDAccessList:n.subCostplanIDAccessList(),subscriptionID:n.subID()},recording:{album:t.title(),artist:t.artistName(),tracks:o}};const a=\`${envConfig.serverUrl}/api/nugs\`;fetch(a,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)})};t.appendChild(document.createTextNode(n)),document.body.appendChild(t),n()})(document);`;
        return res.json({data:bookmarklet});
    }
}
