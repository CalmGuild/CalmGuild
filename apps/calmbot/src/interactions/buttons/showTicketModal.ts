import { MessageActionRow, Modal, ModalActionRowComponent, TextInputComponent } from "discord.js";
import { RegisteredButtonInteraction } from "../../client/interactions";
import database from "@calmguild/database";

const interaction: RegisteredButtonInteraction = {
  execute: async (client, interaction) => {
    const databaseUser = await database.user.findFirst({ where: { discordId: interaction.user.id } });

    // Make sure user doesn't already have a ticket open
    if (databaseUser && databaseUser.openTicketChannelId) {
      const channel = interaction.guild?.channels.cache.get(databaseUser.openTicketChannelId);

      if (channel) return interaction.reply({ content: `Already have a ticket open ${channel}`, ephemeral: true });

      await database.user.update({ where: { discordId: databaseUser.discordId }, data: { openTicketChannelId: null } });
    }

    const modal = new Modal();
    const textInput = new TextInputComponent().setLabel("How can we help you? (not required)").setStyle("PARAGRAPH").setMaxLength(400).setCustomId("reason");

    modal.setTitle("Create Ticket").addComponents(new MessageActionRow<ModalActionRowComponent>().addComponents(textInput)).setCustomId("createTicket");

    interaction.showModal(modal);
  },
  validator: (interaction) => interaction.customId.toLowerCase() === "showticketmodal",
};

export default interaction;
