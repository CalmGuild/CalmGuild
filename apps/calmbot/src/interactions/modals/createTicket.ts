import { GuildMember, MessageActionRow, MessageButton, MessageEmbed, OverwriteData, PermissionResolvable } from "discord.js";
import { RegisteredModalSubmitInteraction } from "../../client/interactions";
import database from "@calmguild/database";

const ALLOW_PERMISSIONS: PermissionResolvable[] = ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "SEND_MESSAGES", "USE_EXTERNAL_EMOJIS", "ATTACH_FILES", "EMBED_LINKS"];

const interaction: RegisteredModalSubmitInteraction = {
  execute: async (client, interaction) => {
    if (!interaction.guild || !(interaction.member instanceof GuildMember)) return;
    await interaction.deferReply({ ephemeral: true });

    const guildData = await database.guild.findFirst({ where: { guildId: interaction.guild.id }, select: { ticketRoleIds: true } });

    const reason = interaction.fields.getField("reason").value;

    const permissions: OverwriteData[] = [
      { id: interaction.guild.roles.everyone, deny: "VIEW_CHANNEL" },
      { id: interaction.member.id, allow: ALLOW_PERMISSIONS },
    ];

    if (guildData?.ticketRoleIds) {
      for (const roleId of guildData?.ticketRoleIds) {
        const role = interaction.guild.roles.cache.get(roleId);
        if (!role) continue;
        permissions.push({ id: roleId, allow: ALLOW_PERMISSIONS });
      }
    }

    interaction.guild.channels
      .create(`ticket-${interaction.user.username}`, { permissionOverwrites: permissions })
      .then(async (ticketChannel) => {
        await database.user.update({ where: { discordId: interaction.user.id }, data: { openTicketChannelId: ticketChannel.id } });

        const embed = new MessageEmbed()
          .setColor("RED")
          .setDescription(reason !== "" ? reason : "No reason provided")
          .addField("Opened By", interaction.user.toString());
        const closeTicketButton = new MessageButton().setLabel("Close Ticket").setCustomId(`closeTicket`).setStyle("DANGER");

        ticketChannel.send({ embeds: [embed], components: [new MessageActionRow({ components: [closeTicketButton] })] }).then((m) => m.pin());

        interaction.editReply(`Opened a ticket for you, ${ticketChannel}`);
      })
      .catch((err) => {
        interaction.editReply("Error creating ticket channel");
        console.error(err);
      });
  },
  validator: (interaction) => interaction.customId.toLowerCase() === "createticket",
};

export default interaction;
