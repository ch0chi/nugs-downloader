import { createApp } from 'vue'
import App from './App.vue'
import {serverUrl} from "../config/config.env.js";
const app = createApp(App);
app.provide('$serverUrl',serverUrl);
app.mount('#app');
