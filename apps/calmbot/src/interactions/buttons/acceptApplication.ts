import { RegisteredButtonInteraction } from "../../client/interactions";
import database from "@calmguild/database";
import getRole from "../../utils/getRole";

const interaction: RegisteredButtonInteraction = {
  execute: async (client, interaction) => {
    if (!interaction.guild) return;

    const memberId = interaction.customId.split("_")[1];
    if (!memberId) return interaction.reply("Error");

    await database.user.update({ where: { discordId: memberId }, data: { guildApplicationChannelId: null } });
    await interaction.channel?.delete();

    const waitlistRole = await getRole("WAITLIST", interaction.guild);
    if (!waitlistRole) return;

    interaction.guild.members.fetch(memberId).then((member) => {
      member.roles.add(waitlistRole);
    });
  },
  validator: (interaction) => interaction.customId.toLowerCase().startsWith("acceptapplication"),
};

export default interaction;
