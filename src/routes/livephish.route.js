import express from 'express';
import {livePhishController} from "../controllers/index.js";

const router = express.Router();
router.post('/',
    (req, res) =>
        livePhishController.getLivePhishScope(req, res));

export {router as livePhishRoute};
