import axios from "axios";
import {Recording} from "./recording.js";
import {envConfig} from "../config/config.env.js";

export class LivePhish extends Recording {

    livePhishCookies;
    user;

    constructor(cookies, user, recording) {
        super(recording);
        this.livePhishCookies = cookies;
        this.user = user;
    }

    async getTrackUrls() {
        let tracks = [];
        const trackIds = this.getRecording().tracks;
        for (const track of trackIds) {
            const trackUrl = await this.fetchTrackUrl(track.id);
            tracks.push({
                url: trackUrl,
                title: track.title.replace(/[/\\?%*:|"<>]/g, '_')
            });
        }
        return tracks;
    }

    createBaseStreamUrl(){
        let streamUri = 'https://www.livephish.com/bigriver/subPlayer.aspx?HLS=1&app=1&'
        let paramString = "endDateStamp=&lxp=&nn_userID=&startDateStamp=&subCostplanIDAccessList=&subscriptionID=&tk=&trackID=";
        let params = new URLSearchParams(paramString);
        params.set('endDateStamp',this.user.endDateStamp);
        params.set('nn_userID',this.user.nn_userID);
        params.set('startDateStamp',this.user.startDateStamp);
        params.set('subCostplanIDAccessList',this.user.subCostplanIDAccessList);
        params.set('lxp',this.user.endDateStamp);
        params.set('subscriptionID',this.user.subscriptionID);
        params.set('tk',envConfig.livePhishTK);
        return streamUri.concat(params.toString());
    }

    async fetchTrackUrl(trackID) {
        const proxyurl = process.env.PROXY_URL ?? "http://localhost:8121";
        const baseStreamUrl = `https://www.livephish.com/bigriver/subPlayer.aspx?HLS=1&trackID=${trackID}`;
        const url = this.createBaseStreamUrl() + trackID;
        try {
            const res = await axios.get(`${url}`);
            return res.data.streamLink;
        } catch (err) {
            throw new Error(`Error fetching track url from live phish! ${err}`);
        }
    }
}
