import axios from "axios";
import {Recording} from "./recording.js";

export class LivePhish extends Recording {

    livePhishCookies;

    constructor(cookies, recording) {
        super(recording);
        this.livePhishCookies = cookies;
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

    async fetchTrackUrl(trackID) {
        const proxyurl = process.env.PROXY_URL ?? "http://localhost:8121";
        const baseStreamUrl = `https://www.livephish.com/bigriver/subPlayer.aspx?HLS=1&trackID=${trackID}`;
        try {
            const res = await axios.get(`${baseStreamUrl}`, {
                headers: {
                    Cookie: this.livePhishCookies
                }
            });
            return res.data.streamLink;
        } catch (err) {
            throw new Error(`Error fetching track url from live phish! ${err}`);
        }
    }
}
