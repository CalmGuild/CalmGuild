import { Channel, GuildMember, MessageActionRow, MessageButton, MessageEmbed, OverwriteData, PermissionResolvable } from "discord.js";
import getRole from "../utils/getRole";
import { getNameHistoryFromUUID } from "./apis/mojang";
import database from "@calmguild/database";

const ALLOW_PERMISSIONS: PermissionResolvable[] = ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "SEND_MESSAGES", "USE_EXTERNAL_EMOJIS", "ATTACH_FILES", "EMBED_LINKS"];

export default (member: GuildMember, uuid: string): Promise<Channel> => {
  return new Promise(async (resolve, reject) => {
    const permissions: OverwriteData[] = [
      { id: member.guild.roles.everyone, deny: "VIEW_CHANNEL" },
      { id: member, allow: ALLOW_PERMISSIONS },
    ];

    const applicationsTeam = await getRole("APPLICATIONS_TEAM", member.guild);
    if (applicationsTeam) permissions.push({ id: applicationsTeam, allow: ALLOW_PERMISSIONS });

    const nameHistory = await getNameHistoryFromUUID(uuid);
    if (!nameHistory) return reject("Couldn't fetch minecraft name");

    const name = nameHistory[nameHistory.length - 1];

    member.guild.channels
      .create(`app${name ? `-${name.name}` : ""}`, { permissionOverwrites: permissions })
      .then(async (channel) => {
        const guildData = await database.guild.findFirst({ where: { guildId: member.guild.id }, select: { applicationQuestions: true } });
        const applicationQuestions = guildData?.applicationQuestions.map((question) => `**${question}**:\n\n`).join("") ?? "";

        const embed = new MessageEmbed().setTitle("Application for Calm Guild");
        embed.setDescription(
          `Welcome! Please copy and paste the format below and send your answers to each question in this channel. Then, when you are done, click the "Submit Application" button below. If it was not your intention to apply, click the "Cancel" button below\n\n${applicationQuestions}`
        );

        const submitButton = new MessageButton().setStyle("SUCCESS").setLabel("Submit Application").setCustomId(`submitApplication_${member.id}`);
        const cancelButton = new MessageButton().setStyle("DANGER").setLabel("Cancel").setCustomId(`cancelApplication_${member.id}`);
        const row = new MessageActionRow({ components: [submitButton, cancelButton] });

        channel.send({ content: member.toString(), embeds: [embed], components: [row] });
        resolve(channel);
      })
      .catch(reject);
  });
};
