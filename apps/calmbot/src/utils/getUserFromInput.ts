/* eslint-disable @typescript-eslint/no-empty-function */
import { Client, User } from "discord.js";
import getUUIDFromName from "./apis/mojang";
import isProperId from "./regex/isProperId";
import isProperMinecraftUsername from "./regex/isProperMinecraftUsername";
import database from "@calmguild/database";

type InputTypes = "DISCORD_ID" | "MINECRAFT_USERNAME" | "MINECRAFT_UUID";

export default (client: Client, input: string, allowedInputTypes: InputTypes[] = ["DISCORD_ID", "MINECRAFT_USERNAME", "MINECRAFT_UUID"]): Promise<User | undefined> => {
  return new Promise(async (resolve) => {
    // check if input is a discord id
    if (allowedInputTypes.includes("DISCORD_ID") && isProperId(input)) {
      const user = await client.users.fetch(input).catch(() => {});
      if (user) return resolve(user);
    }

    // check if input is a valid minecraft name
    if (allowedInputTypes.includes("MINECRAFT_USERNAME") && isProperMinecraftUsername(input)) {
      const uuid = await getUUIDFromName(input).catch(() => {});
      if (uuid) {
        const userData = await database.user.findFirst({ where: { minecraftUuid: uuid }, select: { discordId: true } });
        if (userData) {
          const user = await client.users.fetch(userData.discordId).catch(() => {});
          if (user) return resolve(user);
        }
      }
    }

    if (allowedInputTypes.includes("MINECRAFT_UUID")) {
      const userData = await database.user.findFirst({ where: { minecraftUuid: input }, select: { discordId: true } });
      if (userData) {
        const user = await client.users.fetch(userData.discordId).catch(() => {});
        if (user) return resolve(user);
      }
    }

    resolve(undefined);
  });
};
