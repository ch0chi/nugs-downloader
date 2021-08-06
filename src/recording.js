export class Recording {

    recording;

    constructor(recording) {
        this.recording = recording;
    }

    getRecording() {
        return this.recording;
    }

    getAlbum() {
        return this.getRecording().album;
    }

    getArtistName() {
        return this.getRecording().artist;
    }
}
