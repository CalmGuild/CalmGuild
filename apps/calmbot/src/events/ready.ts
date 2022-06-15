import { Event } from "../client/events";

const readyEvent: Event = {
  execute: (client) => {
    console.log(`${client.user?.tag} is online`);
  },
  type: "ready",
};

export default readyEvent;
