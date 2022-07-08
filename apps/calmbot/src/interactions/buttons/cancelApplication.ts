import { RegisteredButtonInteraction } from "../../client/interactions";
import database from "@calmguild/database";

const interaction: RegisteredButtonInteraction = {
  execute: async (client, interaction) => {
    const memberId = interaction.customId.split("_")[1];
    if (!memberId) return interaction.reply("Error");

    if (interaction.user.id !== memberId) return interaction.reply({ content: "Only the creator of the application can do this", ephemeral: true });

    await database.user.update({ where: { discordId: memberId }, data: { guildApplicationChannelId: null } });
    interaction.channel?.delete();
  },
  validator: (interaction) => interaction.customId.toLowerCase().startsWith("cancelapplication"),
};

export default interaction;
