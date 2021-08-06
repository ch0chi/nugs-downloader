import express from "express";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import * as corsAnywhere from'cors-anywhere';
import {routes} from "./src/routes/index.js";
import {AuthService} from "./src/services/auth.service.js";
import chalk from "chalk";

const app = express();
const authService = new AuthService();
dotenv.config();
//Setup env variables
//process.env.AUTH_TOKEN = '5ab2ba2922a459666057e33498968738941c0c6b644ce5ec187b19c161cd8f254986bb0228668da2428ca764236c8e6fd822e765eebee997fad28d892cddb16a';
process.env.AUTH_TOKEN=authService.generateAuthToken();//todo auth doesn't actually do anything yet

app.use(express.json());

//Initiate routing
app.use('/',routes);

//error handler
app.use( (err, req, res, next) => {
    res.status(400).send(err.message);
})

//Start Server
const port = process.env.SERVER_PORT;
app.listen(port, () => {
   console.log(`Nugs Downloader listening at http://localhost:${port}`);
   console.log(`Auth Token: ${process.env.AUTH_TOKEN}`);
});

//Start Cors Anywhere Reverse Proxy Server
const corsHost = process.env.PROXY_HOST;
const corsPort = process.env.PROXY_PORT;

corsAnywhere.createServer({
    originWhitelist: [],
    //requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie','cookie2']
}).listen(corsPort, corsHost, () => {
   console.log(`Running CORS Anywhere on ${corsHost}:${corsPort}`);
});

//Setup url env variables.
process.env.PROXY_URL = `http://${process.env.PROXY_HOST}:${process.env.PROXY_PORT}`;
process.env.SERVER_URL=`http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`;

//Generates script to inject into console
const nugsScript = () => {
    //return `(()=>{let e=angular.element($0).scope().$$childHead??$($0).scope().$$childHead,t=e.$$nextSibling;t=t?e.$$nextSibling.recording:e.$$childHead.$$nextSibling.recording;let s={};s=e.hasOwnProperty("userInfo")?e.userInfo:(e=$($0).scope().$$childHead).user;const n=t.getTracks();let a=[];for(const e of n)a.push({id:e.ID(),title:e.title()});let i={user:{startDateStamp:s.subStartDateStamp(),endDateStamp:s.subEndDateStamp(),nn_userID:s.ID(),subCostplanIDAccessList:s.subCostplanIDAccessList(),subscriptionID:s.subID()},recording:{album:t.title(),artist:t.artistName(),tracks:a}};const r=\`${process.env.PROXY_URL}/${process.env.SERVER_URL}/nugs\`;fetch(r,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)})})();`;
    return `javascript: (()=>{let e=document.getElementById("you-enjoy-myself");e&&e.parentNode.removeChild(e);let t=document.createElement("script");t.id="you-enjoy-myself",t.type="text/javascript";let n=()=>{let e=angular.element("[ng-controller=AppController]").scope().$$childHead,t=e.$$nextSibling;t=t?e.$$nextSibling.recording:e.$$childHead.$$nextSibling.recording;let n={};n=e.hasOwnProperty("userInfo")?e.userInfo:e.user;const s=t.getTracks();let o=[];for(const e of s)o.push({id:e.ID(),title:e.title()});let r={user:{startDateStamp:n.subStartDateStamp(),endDateStamp:n.subEndDateStamp(),nn_userID:n.ID(),subCostplanIDAccessList:n.subCostplanIDAccessList(),subscriptionID:n.subID()},recording:{album:t.title(),artist:t.artistName(),tracks:o}};const a=\`${process.env.PROXY_URL}/${process.env.SERVER_URL}/nugs\`;fetch(a,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)})};t.appendChild(document.createTextNode(n)),document.body.appendChild(t),n()})(document);`;
}

const livePhishScript = () => {
    //return `(()=>{const e=document.cookie;let t=angular.element($0).scope().$$childHead??$($0).scope().$$childHead,i=t.$$nextSibling;const n=(i=i?t.$$nextSibling.recording:t.$$childHead.$$nextSibling.recording).getTracks();let o=[];for(const e of n)o.push({id:e.ID(),title:e.title()});let c={cookies:e,recording:{album:i.title(),artist:i.artistName(),tracks:o}};const s=\`${process.env.PROXY_URL}/${process.env.SERVER_URL}/livephish\`;fetch(s,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(c)})})();`;
    return `javascript: (()=>{let e=document.getElementById("you-enjoy-myself");e&&e.parentNode.removeChild(e);let t=document.createElement("script");t.id="you-enjoy-myself",t.type="text/javascript";let o=()=>{const e=document.cookie;let t=angular.element("[ng-controller=AppController]").scope().$$childHead,o=t.$$nextSibling;const n=(o=o?t.$$nextSibling.recording:t.$$childHead.$$nextSibling.recording).getTracks();let i=[];for(const e of n)i.push({id:e.ID(),title:e.title()});let l={cookies:e,recording:{album:o.title(),artist:o.artistName(),tracks:i}};const c=\`${process.env.PROXY_URL}/${process.env.SERVER_URL}/livephish\`;fetch(c,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(l)})};t.appendChild(document.createTextNode(o)),document.body.appendChild(t),o()})(document);`;
}

const generateScript = () => {
    const args = process.argv;
    if(args[2] === 'livephish') {
        console.log(chalk.cyan(`Generating live phish script...`));
        return livePhishScript();
    }
    else if(args[2] === 'nugs') {
        console.log(chalk.cyan(`Generating nugs script`));
        return nugsScript();
    }
    return nugsScript();//default
}

console.log(chalk.yellow(`#################################################################`))
console.log(chalk.yellow(`######################## Bookmarklet URL ########################`))
console.log(chalk.yellow(`#################################################################`))
console.log(chalk.bgCyan(chalk.black(generateScript())));
console.log(chalk.yellow(`#################################################################`))
