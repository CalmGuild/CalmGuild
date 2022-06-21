import { MessageActionRow, MessageButton } from "discord.js";
import { CommandData } from "../client/command";

const command: CommandData = {
  run(client, message) {
    message.reply("Pong!");
    message.channel.send({ components: [new MessageActionRow().addComponents(new MessageButton().setLabel("test").setCustomId("test").setStyle("DANGER"))] });
  },
  usage: "ping",
};

export default command;
