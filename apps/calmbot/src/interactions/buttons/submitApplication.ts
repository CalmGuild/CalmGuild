import { Message, MessageActionRow, MessageButton, MessageEmbed, TextChannel, Util } from "discord.js";
import { RegisteredButtonInteraction } from "../../client/interactions";
import disableButtons from "../../utils/disableButtons";
import getRole from "../../utils/getRole";

const interaction: RegisteredButtonInteraction = {
  execute: async (client, interaction) => {
    if (!interaction.guild) return;

    const memberId = interaction.customId.split("_")[1];
    if (!memberId) return interaction.reply("Error");

    if (interaction.user.id !== memberId) return interaction.reply({ content: "Only the creator of the application can do this", ephemeral: true });

    if (!(interaction.channel instanceof TextChannel)) return;

    interaction.reply({ content: "You have submited this application. You will be informed once it is either accepted or denied. If you have any questions, don't hesitate to contact a staff member", ephemeral: true });
    await interaction.channel?.permissionOverwrites.edit(interaction.user.id, { VIEW_CHANNEL: false });

    if (interaction.message instanceof Message) await disableButtons(interaction.message);

    const applicationsTeam = await getRole("APPLICATIONS_TEAM", interaction.guild);
    const mcName = interaction.channel.name.split("-")[1] ?? "Unknown";

    const embed = new MessageEmbed();
    embed.setTitle("Application Submitted");
    embed.setDescription(
      `${interaction.user} has submitted their application to Calm.\n\nMinecraft IGN: ${Util.escapeMarkdown(mcName)}\nPlancke: https://plancke.io/hypixel/player/stats/${mcName}\n25karma: https://25karma.xyz/player/${mcName}`
    );

    const acceptButton = new MessageButton().setStyle("SUCCESS").setLabel("Accept").setCustomId(`acceptApplication_${memberId}`);
    const denyButton = new MessageButton().setStyle("DANGER").setLabel("Deny").setCustomId(`showApplicationDenyModal_${memberId}`);
    const row = new MessageActionRow({ components: [acceptButton, denyButton] });

    interaction.channel.send({ content: applicationsTeam?.toString() ?? null, embeds: [embed], components: [row] });
  },
  validator: (interaction) => interaction.customId.toLowerCase().startsWith("submitapplication"),
};

export default interaction;
