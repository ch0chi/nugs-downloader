import express from 'express';
const router = express.Router();
import {downloadRoute} from './download.route.js';
import {nugsRoute} from './nugs.route.js';
import {livePhishRoute} from "./livephish.route.js";
import {publicRoutes} from "./public.routes.js";

const mainRoutes = [
    {
        path: '/download',
        route: downloadRoute,
        api:true
    },
    {
        path: '/nugs',
        route: nugsRoute,
        api:true
    },
    {
        path:'/livephish',
        route:livePhishRoute,
        api:true
    },
    {
        path:'/public',
        route:publicRoutes,
        api:false
    }
];

mainRoutes.forEach((route) => {
    if(route.api) {
        route.path = `/api${route.path}`
    } else{
        route.path = `${route.path}`;
    }
   router.use(route.path,route.route)
});

export {router as routes};
