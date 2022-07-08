import { RegisteredModalSubmitInteraction } from "../../client/interactions";
import database from "@calmguild/database";
import { MessageEmbed } from "discord.js";

const interaction: RegisteredModalSubmitInteraction = {
  execute: async (client, interaction) => {
    const memberId = interaction.customId.split("_")[1];
    if (!memberId) return interaction.reply("Error");

    await database.user.update({ where: { discordId: memberId }, data: { guildApplicationChannelId: null } });

    await interaction.reply({ content: "Denied", ephemeral: true });
    await interaction.channel?.delete();

    client.users
      .fetch(memberId)
      .then((user) => {
        const embed = new MessageEmbed();
        embed.setTitle("Application to calm denied");
        embed.setDescription(`Sorry! Your application to calm has been denied for the following reason:\n\n${interaction.fields.getField("reason").value ?? "N/A"}`);
        embed.setColor("RED");

        user.send({ embeds: [embed] });
      })
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .catch(() => {});
  },
  validator: (interaction) => interaction.customId.toLowerCase().startsWith("denyapplication"),
};

export default interaction;
