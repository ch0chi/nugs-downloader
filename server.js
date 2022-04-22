import express from "express";
import bodyParser from "body-parser";
import * as corsAnywhere from 'cors-anywhere';
import {routes} from "./src/routes/index.js";
import chalk from "chalk";
import {envConfig} from "./config/config.env.js";


const app = express();

app.set('view engine', 'ejs');
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

/**
 * @deprecated
 *  This function is not currently being used. The bookmarklet is created in the nugs controller
 * @returns {`javascript: (()=>{let e=document.getElementById("you-enjoy-myself");e&&e.parentNode.removeChild(e);let t=document.createElement("script");t.id="you-enjoy-myself",t.type="text/javascript";let n=()=>{let e=angular.element("[ng-controller=AppController]").scope().$$childHead,t=e.$$nextSibling;t=t?e.$$nextSibling.recording:e.$$childHead.$$nextSibling.recording;let n={};n=e.hasOwnProperty("userInfo")?e.userInfo:e.user;const s=t.getTracks();let o=[];for(const e of s)o.push({id:e.ID(),title:e.title()});let r={user:{startDateStamp:n.subStartDateStamp(),endDateStamp:n.subEndDateStamp(),nn_userID:n.ID(),subCostplanIDAccessList:n.subCostplanIDAccessList(),subscriptionID:n.subID()},recording:{album:t.title(),artist:t.artistName(),tracks:o}};const a=\`${string}/${string}/api/nugs\`;fetch(a,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)})};t.appendChild(document.createTextNode(n)),document.body.appendChild(t),n()})(document);`}
 */
//Generates script to inject into console
const nugsScript = () => {
    return `javascript: (()=>{let e=document.getElementById("you-enjoy-myself");e&&e.parentNode.removeChild(e);let t=document.createElement("script");t.id="you-enjoy-myself",t.type="text/javascript";let n=()=>{let e=angular.element("[ng-controller=AppController]").scope().$$childHead,t=e.$$nextSibling;t=t?e.$$nextSibling.recording:e.$$childHead.$$nextSibling.recording;let n={};n=e.hasOwnProperty("userInfo")?e.userInfo:e.user;const s=t.getTracks();let o=[];for(const e of s)o.push({id:e.ID(),title:e.title()});let r={user:{startDateStamp:n.subStartDateStamp(),endDateStamp:n.subEndDateStamp(),nn_userID:n.ID(),subCostplanIDAccessList:n.subCostplanIDAccessList(),subscriptionID:n.subID()},recording:{album:t.title(),artist:t.artistName(),tracks:o}};const a=\`${envConfig.proxyUrl}/${envConfig.serverUrl}/api/nugs\`;fetch(a,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)})};t.appendChild(document.createTextNode(n)),document.body.appendChild(t),n()})(document);`;
}

/**
 * @deprecated
 *  This function is not currently being used. The bookmarklet is created in the livephish controller
 * @returns {`(()=>{let a=document.getElementById("you-enjoy-myself");a&&a.parentNode.removeChild(a);let b=document.createElement("script");b.id="you-enjoy-myself",b.type="text/javascript";let c=()=>{const a=document.cookie;let b=angular.element("[ng-controller=AppController]").scope(),c=b.$$childHead.$$nextSibling,d={};d=b.hasOwnProperty("userInfo")?b.userInfo:b.user,c=c?b.$$childHead.$$nextSibling.recording:b.$$childHead.$$childHead.$$nextSibling.recording;const e=c.getTracks();let f=[];for(const a of e)f.push({id:a.ID(),title:a.title()});let g={cookies:a,recording:{album:c.title(),artist:c.artistName(),tracks:f},user:{startDateStamp:d.subStartDateStamp(),endDateStamp:d.subEndDateStamp(),nn_userID:d.ID(),subCostplanIDAccessList:d.subCostplanIDAccessList(),subscriptionID:d.subID()}};const h=\`${string}/${string}/api/livephish\`,i=fetch(h,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(g)})};b.appendChild(document.createTextNode(c)),document.body.appendChild(b),c()})(document);`}
 */
const livePhishScript = () => {
    //let oldScript = `javascript: (()=>{let e=document.getElementById("you-enjoy-myself");e&&e.parentNode.removeChild(e);let t=document.createElement("script");t.id="you-enjoy-myself",t.type="text/javascript";let o=()=>{const e=document.cookie;let t=angular.element("[ng-controller=AppController]").scope().$$childHead,o=t.$$nextSibling;const n=(o=o?t.$$nextSibling.recording:t.$$childHead.$$nextSibling.recording).getTracks();let i=[];for(const e of n)i.push({id:e.ID(),title:e.title()});let l={cookies:e,recording:{album:o.title(),artist:o.artistName(),tracks:i}};const c=\`${envConfig.proxyUrl}/${envConfig.serverUrl}/api/livephish\`;fetch(c,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(l)})};t.appendChild(document.createTextNode(o)),document.body.appendChild(t),o()})(document);`;
    return `(()=>{let a=document.getElementById("you-enjoy-myself");a&&a.parentNode.removeChild(a);let b=document.createElement("script");b.id="you-enjoy-myself",b.type="text/javascript";let c=()=>{const a=document.cookie;let b=angular.element("[ng-controller=AppController]").scope(),c=b.$$childHead.$$nextSibling,d={};d=b.hasOwnProperty("userInfo")?b.userInfo:b.user,c=c?b.$$childHead.$$nextSibling.recording:b.$$childHead.$$childHead.$$nextSibling.recording;const e=c.getTracks();let f=[];for(const a of e)f.push({id:a.ID(),title:a.title()});let g={cookies:a,recording:{album:c.title(),artist:c.artistName(),tracks:f},user:{startDateStamp:d.subStartDateStamp(),endDateStamp:d.subEndDateStamp(),nn_userID:d.ID(),subCostplanIDAccessList:d.subCostplanIDAccessList(),subscriptionID:d.subID()}};const h=\`${envConfig.proxyUrl}/${envConfig.serverUrl}/api/livephish\`,i=fetch(h,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(g)})};b.appendChild(document.createTextNode(c)),document.body.appendChild(b),c()})(document);`;
}

/**
 * @deprecated
 *  bookmarklets are created within each service's respective controllers
 * @returns {`(()=>{let a=document.getElementById("you-enjoy-myself");a&&a.parentNode.removeChild(a);let b=document.createElement("script");b.id="you-enjoy-myself",b.type="text/javascript";let c=()=>{const a=document.cookie;let b=angular.element("[ng-controller=AppController]").scope(),c=b.$$childHead.$$nextSibling,d={};d=b.hasOwnProperty("userInfo")?b.userInfo:b.user,c=c?b.$$childHead.$$nextSibling.recording:b.$$childHead.$$childHead.$$nextSibling.recording;const e=c.getTracks();let f=[];for(const a of e)f.push({id:a.ID(),title:a.title()});let g={cookies:a,recording:{album:c.title(),artist:c.artistName(),tracks:f},user:{startDateStamp:d.subStartDateStamp(),endDateStamp:d.subEndDateStamp(),nn_userID:d.ID(),subCostplanIDAccessList:d.subCostplanIDAccessList(),subscriptionID:d.subID()}};const h=\`${string}/${string}/api/livephish\`,i=fetch(h,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(g)})};b.appendChild(document.createTextNode(c)),document.body.appendChild(b),c()})(document);`|`javascript: (()=>{let e=document.getElementById("you-enjoy-myself");e&&e.parentNode.removeChild(e);let t=document.createElement("script");t.id="you-enjoy-myself",t.type="text/javascript";let n=()=>{let e=angular.element("[ng-controller=AppController]").scope().$$childHead,t=e.$$nextSibling;t=t?e.$$nextSibling.recording:e.$$childHead.$$nextSibling.recording;let n={};n=e.hasOwnProperty("userInfo")?e.userInfo:e.user;const s=t.getTracks();let o=[];for(const e of s)o.push({id:e.ID(),title:e.title()});let r={user:{startDateStamp:n.subStartDateStamp(),endDateStamp:n.subEndDateStamp(),nn_userID:n.ID(),subCostplanIDAccessList:n.subCostplanIDAccessList(),subscriptionID:n.subID()},recording:{album:t.title(),artist:t.artistName(),tracks:o}};const a=\`${string}/${string}/api/nugs\`;fetch(a,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)})};t.appendChild(document.createTextNode(n)),document.body.appendChild(t),n()})(document);`}
 */
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
console.log(chalk.yellow(`####################### Bookmarklet URL #########################`))
console.log(chalk.yellow(`#################################################################`))
console.log(chalk.cyan(`           ${envConfig.serverUrl}/public/bookmarklets`));
console.log(chalk.yellow(`#################################################################`))
