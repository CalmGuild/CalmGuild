import { CommandData, Util } from "discord.js";
import database from "@calmguild/database";
import getUUIDFromName from "../utils/apis/mojang";
import { getPlayer } from "../utils/apis/hypixel";

const command: CommandData = {
  run: async (client, message, args) => {
    if (!message.guild || !args[0]) return;

    const user = await database.user.findFirst({ where: { discordId: message.author.id } });
    if (user?.minecraftUuid) {
      message.reply("Your account is already linked, if you want this changed please contact a staff member.");
      return;
    }

    const uuid = await getUUIDFromName(args[0]);
    if (!uuid) {
      message.reply("Invalid minecraft name. Please ensure you typed it in correctly.");
      return;
    }

    const alreadyExistingUser = await database.user.findFirst({ where: { minecraftUuid: uuid } });
    if (alreadyExistingUser) {
      message.reply("A player has already linked to this account, please contact staff if this is an issue.");
      return;
    }

    const hypixelPlayer = await getPlayer(uuid);
    if (!hypixelPlayer) {
      message.reply("Hypixel has no data for this player, please ensure you typed in the name correctly.");
      return;
    }

    const discord = hypixelPlayer.socialMedia?.links?.DISCORD;
    if (!discord) {
      message.reply("Your hypixel account is not linked to your discord!");
      return;
    }

    if (discord !== message.author.tag) {
      message.reply(`This hypixel account is linked to another discord user by the name of ${Util.escapeMarkdown(discord)}. If this is an old name of yours please relink your hypixel account to reflect your current name.`);
      return;
    }

    database.user
      .upsert({ where: { discordId: message.author.id }, create: { discordId: message.author.id, minecraftUuid: uuid }, update: { minecraftUuid: uuid } })
      .then(() => {
        message.reply("Account linked!");
      })
      .catch((err) => {
        console.error(err);
        message.reply("Account linking failed! Please report this to staff.");
      });
  },
  minimumArguments: 1,
  usage: "link <minecraft-ign>",
};

export default command;
