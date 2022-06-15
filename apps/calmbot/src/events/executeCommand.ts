import { Message } from "discord.js";
import { handleCommand } from "../client/command";
import { Event } from "../client/events";
import { getCommand } from "../utils/getCommand";

const executeCommand: Event = {
  execute: (client, message: Message) => {
    if (!message.guild || message.author.bot) return;

    const prefix = "c!";
    if (!message.content.toLowerCase().startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift()?.toLowerCase();
    if (!commandName) return;

    const command = getCommand(client.commands, commandName);
    if (!command) return;

    handleCommand(client, command, message, args);
  },
  type: "messageCreate",
};

export default executeCommand;
