import { CommandData } from "discord.js";
import getUserFromInput from "../../utils/getUserFromInput";
import database from "@calmguild/database";
import getRole from "../../utils/getRole";

const command: CommandData = {
  run: async (client, message, args) => {
    if (!message.guild || !args[0]) return;

    const user = await getUserFromInput(client, args[0]);
    if (!user) {
      message.reply("Couldn't find user");
      return;
    }

    const userData = await database.user.findFirst({ where: { discordId: user.id }, select: { timeJoinedWaitlist: true } });
    if (!userData || !userData.timeJoinedWaitlist) {
      message.reply("User not on waitlist");
      return;
    }

    await database.user.update({ where: { discordId: user.id }, data: { timeJoinedWaitlist: null, informedOnWaitlist: null, frozenOnWaitlist: null } });

    message.reply("Removed from waitlist");

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const member = await message.guild.members.fetch(user.id).catch(() => {});
    if (member) {
      const waitlistRole = await getRole("WAITLIST", message.guild);
      if (waitlistRole) member.roles.remove(waitlistRole);
    }
  },
  requiredPermission: "STAFF",
  minimumArguments: 1,
  usage: "waitlist remove <user>",
};

export default command;
