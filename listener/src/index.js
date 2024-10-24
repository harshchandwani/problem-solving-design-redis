"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const subscriber = (0, redis_1.createClient)();
subscriber.connect().then(() => {
    console.log("Subscriber connected to Redis");
    subscriber.subscribe("myChannel", (message) => {
        console.log(`Received Message: ${message}`); // Fix: Corrected the string interpolation
    });
}).catch((err) => {
    console.error('Failed to connect to Redis:', err);
});
