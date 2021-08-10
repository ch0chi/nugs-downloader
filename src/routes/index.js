import express from 'express';
const router = express.Router();
import {downloadRoute} from './download.route.js';
import {nugsRoute} from './nugs.route.js';
import {livePhishRoute} from "./livephish.route.js";
import {corsMiddleware} from "../middleware/cors.middleware.js";

router.use(corsMiddleware.allowOrigin);
const mainRoutes = [
    {
        path: '/download',
        route: downloadRoute
    },
    {
        path: '/nugs',
        route: nugsRoute
    },
    {
        path:'/livephish',
        route:livePhishRoute
    }
];

mainRoutes.forEach((route) => {
    route.path = `/api${route.path}`;
   router.use(route.path,route.route)
});

export {router as routes};
