import {envConfig} from "../../config/config.env.js";

const middleware = {};

middleware.allowOrigin = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    return next();
}

export {middleware as corsMiddleware}
