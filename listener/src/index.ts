import { createClient } from "redis";

const subscriber = createClient();

subscriber.connect().then(() => {
    console.log("Subscriber connected to Redis");

    subscriber.subscribe("myChannel", (message) => {
        console.log(`Received Message: ${message}`); // Fix: Corrected the string interpolation
    });
}).catch((err) => {
    console.error('Failed to connect to Redis:', err);
});
