import {DownloadController} from "./download.controller.js";
import {NugsController} from "./nugs.controller.js";
import {LivephishController} from "./livephish.controller.js";

const downloadController = new DownloadController();
const nugsController = new NugsController();
const livePhishController = new LivephishController();
export {
    downloadController,
    nugsController,
    livePhishController
}
