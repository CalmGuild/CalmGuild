import { CommandData, MessageActionRow, MessageButton } from "discord.js";

const ticketReasons = ["Questions", "Punishment Appeals", "Reporting Users", "Claiming Giveaways", "Bug Reports", "Scheduling Events"].map((reason) => `• **${reason}**\n`).join("");

const command: CommandData = {
  run: async (client, message) => {
    if (!message.guild) return;

    const button = new MessageButton().setCustomId("showTicketModal").setLabel("Open Ticket").setStyle("SUCCESS").setEmoji("✉️");
    const row = new MessageActionRow().addComponents(button);

    message.channel.send({ components: [row], content: `Please click the button below to open a ticket and get private support from staff.\nThis can be for example but __not limited to__\n\n${ticketReasons}` });
  },
  usage: "ticket",
  aliases: ["open"],
};

export default command;
