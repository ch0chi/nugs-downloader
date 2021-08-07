const middleware = {};

middleware.authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization ?? "";
    const authToken = authHeader.split(' ')[1] ?? '';
    if(!authHeader || authToken !== process.env.AUTH_TOKEN) {
        const err = new Error(`Unauthorized`);
        err.status = 401;
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log(`Unauthorized Request from ${ip}`);
        return next(err);
    }
    return next();
}

export {middleware as AuthMiddleware};

