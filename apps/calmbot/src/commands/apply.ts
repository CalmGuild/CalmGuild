import { CommandData, TextChannel } from "discord.js";
import database from "@calmguild/database";
import { getGuild } from "../utils/apis/hypixel";
import createApplication from "../utils/createApplication";
import getRole from "../utils/getRole";

const command: CommandData = {
  run: async (client, message) => {
    if (!message.guild || !message.member) return;

    const waitlistRole = await getRole("WAITLIST", message.guild);
    if (waitlistRole && message.member.roles.cache.has(waitlistRole.id)) {
      message.reply("You are already on the waitlist!");
      return;
    }

    const userData = await database.user.findFirst({ where: { discordId: message.author.id }, select: { minecraftUuid: true, guildApplicationChannelId: true } });
    if (!userData || !userData.minecraftUuid) {
      message.reply("You must link your discord account to your minecraft ign before applying. Please use the c!link (ign) command and then run c!apply again.");
      return;
    }

    const guild = await getGuild("Calm");
    if (guild && guild.members.find((m) => m.uuid === userData.minecraftUuid)) {
      message.reply("You are already in the guild!");
      return;
    }

    if (userData.guildApplicationChannelId) {
      const channel = message.guild.channels.cache.get(userData.guildApplicationChannelId);
      if (channel && channel instanceof TextChannel) {
        if (channel.permissionsFor(message.member).has("VIEW_CHANNEL")) {
          message.reply(`You already have an open application, ${channel}`);
          return;
        }

        message.reply(`Your application is currently pending review!`);
        return;
      }
    }

    createApplication(message.member, userData.minecraftUuid)
      .then(async (channel) => {
        message.reply(`Opened an appliation for you, ${channel}`);
        await database.user.update({ where: { discordId: message.author.id }, data: { guildApplicationChannelId: channel.id } });
      })
      .catch((err) => {
        console.error(err);
        message.reply("Error creating your application, please contact a staff member.");
      });
  },
  usage: "apply",
};

export default command;
