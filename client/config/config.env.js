import dotenv from 'dotenv';

//todo get global var sharing working
dotenv.config();
// const config = dotenv.parse();

// for (const k in config) {
//     if(k === 'SERVER_HOST' || k === 'SERVER_PORT'){
//         process.env[k] = config[k];
//     }
// }

const baseConfig = {
    serverHost: process.env.SERVER_HOST || `localhost`,
    serverPort: process.env.SERVER_PORT || `3000`,
}
export const serverUrl = `http://${baseConfig.serverHost}:${baseConfig.serverPort}/api`



