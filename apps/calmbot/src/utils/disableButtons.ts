import { Message, MessageActionRow } from "discord.js";

export default (message: Message): Promise<Message> => {
  return new Promise((resolve, reject) => {
    const rows: MessageActionRow[] = [];
    for (const row of message.components) {
      const newRow = new MessageActionRow();
      newRow.addComponents(
        row.components.map((component) => {
          if (component.type === "BUTTON") return component.setDisabled(true);
          return component;
        })
      );
      rows.push(newRow);
    }

    message.edit({ components: rows }).then(resolve).catch(reject);
  });
};
