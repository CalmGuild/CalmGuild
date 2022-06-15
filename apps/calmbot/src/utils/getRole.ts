import database from "@calmguild/database";
import { RoleType } from "@calmguild/database";
import { Guild, Role } from "discord.js";

export default (roleType: RoleType, guild: Guild): Promise<Role | undefined> => {
  return new Promise(async (resolve) => {
    const roleData = await database.role.findFirst({
      where: {
        guildId: guild.id,
        roleType: roleType,
      },
      select: {
        roleId: true,
      },
    });

    if (!roleData) return resolve(undefined);
    const role = guild.roles.cache.get(roleData?.roleId);
    resolve(role);
  });
};
