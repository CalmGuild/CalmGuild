import { Collection } from "discord.js";
import { Command } from "../client/command";

export const getCommand = (commands: Collection<string, Command>, name: string): Command | undefined => {
  let command: Command | undefined = undefined;

  // command matches name
  command = commands.get(name.toLowerCase());
  if (command) return command;

  // command alias matches name
  command = commands.find((command) => command.aliases !== undefined && command.aliases.includes(name.toLowerCase()));
  if (command) return command;

  // default subcommand with alias matches name
  return commands.find((c) => c.subcommands?.find((subcommand) => subcommand.defaultSubcommand !== undefined && subcommand.aliases !== undefined && subcommand.aliases.includes(name.toLowerCase())) !== undefined);
};
