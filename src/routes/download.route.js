import express from 'express';
import {downloadController} from "../controllers/index.js";
// import {AuthMiddleware} from "../middleware/auth.middleware.js";

const router = express.Router();

// router.use(AuthMiddleware.authenticate);

//Download Route Test
router.post('/', (req, res) => downloadController.downloadTracks(req, res ));

export {router as downloadRoute};
