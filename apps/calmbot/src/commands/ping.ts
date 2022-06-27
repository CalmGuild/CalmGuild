import { CommandData } from "../client/command";

const command: CommandData = {
  run(client, message) {
    message.reply("Pong!");
  },
  usage: "ping",
};

export default command;
