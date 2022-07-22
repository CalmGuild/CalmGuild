import { CommandData } from "discord.js";
import getUserFromInput from "../../utils/getUserFromInput";
import database from "@calmguild/database";

const command: CommandData = {
  run: async (client, message, args) => {
    if (!message.guild || !args[0]) return;

    const user = await getUserFromInput(client, args[0]);
    if (!user) {
      message.reply("Couldn't find user");
      return;
    }

    const userData = await database.user.findFirst({ where: { discordId: user.id }, select: { timeJoinedWaitlist: true, frozenOnWaitlist: true } });
    if (!userData || !userData.timeJoinedWaitlist) {
      message.reply("User not on waitlist");
      return;
    }

    await database.user.update({ where: { discordId: user.id }, data: { frozenOnWaitlist: !userData.frozenOnWaitlist } });
    message.reply(`User ${userData.frozenOnWaitlist ? "un" : ""}frozen`);
  },
  requiredPermission: "STAFF",
  minimumArguments: 1,
  usage: "waitlist frozen <user>",
};

export default command;
