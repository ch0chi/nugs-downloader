import express from 'express';
import path from 'path';
import {envConfig} from "../../config/config.env.js";

const router = express.Router();
const __dirname = path.resolve();

router.use(express.static("public"));
router.get('/bookmarklets', (req, res) => {
    const publicPath = __dirname + '/public'
    res.render(`${publicPath}/index`,{serverUrl:envConfig.serverUrl});
})

export {router as publicRoutes};
