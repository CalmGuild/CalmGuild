import { Message } from "discord.js";
import { Command } from "../client/command";
import checkPermission from "./checkPermission";

export const checkCommandConditions = async (command: Command, message: Message, args: string[]) => {
  const requiredPermission = command.requiredPermission;
  if (requiredPermission && message.member) {
    const hasPermission = await checkPermission(message.member, requiredPermission);

    if (!hasPermission) {
      message.reply(`You are missing permission: \`${requiredPermission}\``);
      return false;
    }
  }

  const minimumArguments = command.minimumArguments;
  if (minimumArguments && args.length < minimumArguments) {
    message.reply(`You need at least ${minimumArguments} arguments\nUsage: \`${command.usage}\``);
    return false;
  }

  return true;
};
