import { RegisteredButtonInteraction } from "../../client/interactions";
import database from "@calmguild/database";

const interaction: RegisteredButtonInteraction = {
  execute: async (client, interaction) => {
    await database.user.update({ where: { openTicketChannelId: interaction.channelId }, data: { openTicketChannelId: null } });
    interaction.channel?.delete();
  },
  validator: (interaction) => interaction.customId.toLowerCase() === "closeticket",
};

export default interaction;
