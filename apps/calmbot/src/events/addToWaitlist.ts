import { BaseGuildTextChannel, GuildMember } from "discord.js";
import { Event } from "../client/events";
import getRole from "../utils/getRole";
import database from "@calmguild/database";
import getChannel from "../utils/getChannel";

const addToWaitlist: Event = {
  execute: async (client, oldMember: GuildMember, newMember: GuildMember) => {
    const newRoles = newMember.roles.cache.filter((role) => !oldMember.roles.cache.has(role.id));
    const oldRoles = oldMember.roles.cache.filter((role) => !newMember.roles.cache.has(role.id));

    if (newRoles.size === 0 && oldRoles.size === 0) return;

    const waitlistRole = await getRole("WAITLIST", newMember.guild);
    if (!waitlistRole) return;

    // waitlist role added
    if (newRoles.has(waitlistRole.id) && !oldRoles.has(waitlistRole.id)) {
      await database.user.update({ where: { discordId: newMember.id }, data: { timeJoinedWaitlist: Date.now(), informedOnWaitlist: null, frozenOnWaitlist: null } });

      const waitlistChannel = await getChannel("WAITLIST", newMember.guild);
      if (waitlistChannel instanceof BaseGuildTextChannel) {
        const guildData = await database.guild.upsert({ where: { guildId: newMember.guild.id }, create: { guildId: newMember.guild.id }, update: {}, select: { waitlistJoinMessage: true } });
        waitlistChannel.send(`${newMember}\n${guildData.waitlistJoinMessage}`);
      }
    }

    // waitlist role removed
    else if (oldRoles.has(waitlistRole.id) && !newRoles.has(waitlistRole.id)) {
      await database.user.update({ where: { discordId: newMember.id }, data: { timeJoinedWaitlist: null, informedOnWaitlist: null, frozenOnWaitlist: null } });
    }
  },
  type: "guildMemberUpdate",
};

export default addToWaitlist;
