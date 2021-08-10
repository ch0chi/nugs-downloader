import express from 'express';
import {livePhishController} from "../controllers/index.js";
import {corsMiddleware} from "../middleware/cors.middleware.js";

const router = express.Router();
router.post('/',
    (req, res) =>
        livePhishController.getLivePhishScope(req, res)
);
router.get('/bookmarklet', corsMiddleware.allowOrigin,
    (req, res) =>
        livePhishController.generateBookmarklet(req, res)
);

export {router as livePhishRoute};
