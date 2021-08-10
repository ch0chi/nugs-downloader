import dotenv from 'dotenv';
import fs from 'fs';
import chalk from "chalk";

dotenv.config();
const config = dotenv.parse(fs.readFileSync('.env'));

for (const k in config) {
    if(config.hasOwnProperty(k)) {
        process.env[k] = config[k];
    }
}

const baseConfig = {
    baseDir: config.BASE_DIR,
    proxyHost: config.PROXY_HOST || `localhost`,
    proxyPort: config.PROXY_PORT || `8121`,
    serverHost: config.SERVER_HOST || `localhost`,
    serverPort: config.SERVER_PORT || `3000`,
}

const urlConfig = {
    proxyUrl: `http://${baseConfig.proxyHost}:${baseConfig.proxyPort}`,
    serverUrl: `http://${baseConfig.serverHost}:${baseConfig.serverPort}`
}

//Exit program if base directory isn't set.
if(!baseConfig.baseDir) {
    console.log(chalk.red(`Error! Missing base directory environment url. Did you forget to setup your .env file?`));
    process.exit(9);
}

export const envConfig = Object.assign(baseConfig,urlConfig);
export const serverUrl = urlConfig.serverUrl;
