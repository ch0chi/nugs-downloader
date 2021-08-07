import express from "express";
import bodyParser from "body-parser";
import * as corsAnywhere from 'cors-anywhere';
import {routes} from "./src/routes/index.js";
import chalk from "chalk";
import {envConfig} from "./config/config.env.js";


const app = express();

app.use(express.json());

//Initiate routing
app.use('/', routes);

//error handler
app.use((err, req, res, next) => {
    res.status(400).send(err.message);
})

//Start Server
const port = envConfig.serverPort;
const server = app.listen(port, () => {
    console.log(`Nugs Downloader listening at http://localhost:${port}`);
});

//Start Cors Anywhere Reverse Proxy Server
const corsHost = envConfig.proxyHost;
const corsPort = envConfig.proxyPort;

corsAnywhere.createServer({
    originWhitelist: [],
    //requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
}).listen(corsPort, corsHost, () => {
    console.log(`Running CORS Anywhere on ${corsHost}:${corsPort}`);
});

//Generates script to inject into console
const nugsScript = () => {
    return `javascript: (()=>{let e=document.getElementById("you-enjoy-myself");e&&e.parentNode.removeChild(e);let t=document.createElement("script");t.id="you-enjoy-myself",t.type="text/javascript";let n=()=>{let e=angular.element("[ng-controller=AppController]").scope().$$childHead,t=e.$$nextSibling;t=t?e.$$nextSibling.recording:e.$$childHead.$$nextSibling.recording;let n={};n=e.hasOwnProperty("userInfo")?e.userInfo:e.user;const s=t.getTracks();let o=[];for(const e of s)o.push({id:e.ID(),title:e.title()});let r={user:{startDateStamp:n.subStartDateStamp(),endDateStamp:n.subEndDateStamp(),nn_userID:n.ID(),subCostplanIDAccessList:n.subCostplanIDAccessList(),subscriptionID:n.subID()},recording:{album:t.title(),artist:t.artistName(),tracks:o}};const a=\`${envConfig.proxyUrl}/${envConfig.serverUrl}/api/nugs\`;fetch(a,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)})};t.appendChild(document.createTextNode(n)),document.body.appendChild(t),n()})(document);`;
}

const livePhishScript = () => {
    return `javascript: (()=>{let e=document.getElementById("you-enjoy-myself");e&&e.parentNode.removeChild(e);let t=document.createElement("script");t.id="you-enjoy-myself",t.type="text/javascript";let o=()=>{const e=document.cookie;let t=angular.element("[ng-controller=AppController]").scope().$$childHead,o=t.$$nextSibling;const n=(o=o?t.$$nextSibling.recording:t.$$childHead.$$nextSibling.recording).getTracks();let i=[];for(const e of n)i.push({id:e.ID(),title:e.title()});let l={cookies:e,recording:{album:o.title(),artist:o.artistName(),tracks:i}};const c=\`${envConfig.proxyUrl}/${envConfig.serverUrl}/api/livephish\`;fetch(c,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(l)})};t.appendChild(document.createTextNode(o)),document.body.appendChild(t),o()})(document);`;
}

const generateScript = () => {
    const args = process.argv;
    if (args[2] === 'livephish') {
        console.log(chalk.cyan(`Generating live phish script...`));
        return livePhishScript();
    } else if (args[2] === 'nugs') {
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
