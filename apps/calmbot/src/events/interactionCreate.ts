import { Interaction } from "discord.js";
import { Event } from "../client/events";

const interactionEvent: Event = {
  execute: (client, interaction: Interaction) => {
    if (interaction.isButton()) {
      client.buttons.find((i) => i.validator(interaction))?.execute(client, interaction);
    } else if (interaction.isSelectMenu()) {
      client.selectMenus.find((i) => i.validator(interaction))?.execute(client, interaction);
    } else if (interaction.isModalSubmit()) {
      client.modals.find((i) => i.validator(interaction))?.execute(client, interaction);
    }
  },
  type: "interactionCreate",
};

export default interactionEvent;
