import axios from 'axios';
import {Recording} from "./recording.js";

export class Nugs extends Recording{

    nugsUser;

    constructor(nugsUser,recording) {
        super(recording);
        this.nugsUser = nugsUser
    }

    createBaseStreamUrl() {
        let streamUri = "https://streamapi.nugs.net/bigriver/subplayer.aspx?";
        let paramString = "orgn=nndesktop&HLS=1&app=1&endDateStamp=&nn_userID=&startDateStamp=&subCostplanIDAccessList=&subscriptionID=&trackID=";
        let params = new URLSearchParams(paramString);
        params.set('endDateStamp', this.nugsUser.endDateStamp);
        params.set('nn_userID', this.nugsUser.nn_userID);
        params.set('startDateStamp', this.nugsUser.startDateStamp);
        params.set('subCostplanIDAccessList', this.nugsUser.subCostplanIDAccessList);
        params.set('subscriptionID', this.nugsUser.subscriptionID);

        return streamUri.concat(params.toString());
    }

    async getTrackUrls() {
        let tracks = [];
        const trackIds = this.getRecording().tracks;
        for(const track of trackIds) {
            const trackUrl = await this.fetchTrackUrl(track.id);
            tracks.push({
                url:trackUrl,
                title:track.title.replace(/[/\\?%*:|"<>]/g,'_')
            });
        }
        return tracks;
    }

    /**
     *Calls the stream api and returns the fully qualified url containing the link to the track.
     *
     * @param {*} trackID
     */
    async fetchTrackUrl(trackID) {
        const proxyurl = process.env.PROXY_URL ?? "http://localhost:8121";
        const url = this.createBaseStreamUrl() + trackID;
        try{
            const res = await axios.get(`${proxyurl}/${url}`);
            return res.data.streamLink;
        }
        catch(err) {
            throw new Error(`Error fetching track url! ${err}`);
        }
        //return `Unable to fetch track with id of ${trackID}`
    }



}
