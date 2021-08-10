import express from 'express';
import {nugsController} from "../controllers/index.js";


const router = express.Router();
// router.use(AuthMiddleware.authenticate);
router.post('/',
    (req, res) =>
        nugsController.getNugsScope(req, res)
);

router.get('/bookmarklet',
    (req, res) =>
        nugsController.generateBookmarklet(req,res)
);

export {router as nugsRoute};
