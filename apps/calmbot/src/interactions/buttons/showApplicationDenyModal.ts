import { MessageActionRow, Modal, ModalActionRowComponent, TextInputComponent } from "discord.js";
import { RegisteredButtonInteraction } from "../../client/interactions";

const interaction: RegisteredButtonInteraction = {
  execute: async (client, interaction) => {
    const memberId = interaction.customId.split("_")[1];
    if (!memberId) return interaction.reply("Error");

    const modal = new Modal().setTitle("Deny Application").setCustomId(`denyApplication_${memberId}`);
    const textInput = new TextInputComponent().setLabel("Denial Reason").setStyle("PARAGRAPH").setRequired(true).setMaxLength(400).setCustomId("reason");
    modal.addComponents(new MessageActionRow<ModalActionRowComponent>({ components: [textInput] }));

    interaction.showModal(modal);
  },
  validator: (interaction) => interaction.customId.toLowerCase().startsWith("showapplicationdenymodal"),
};

export default interaction;
