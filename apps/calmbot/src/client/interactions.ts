import { ButtonInteraction, Client, ModalSubmitInteraction, SelectMenuInteraction } from "discord.js";

import fs from "fs";
import path from "path";

interface RegisteredInteraction<T> {
  execute: (client: Client, interaction: T) => void;
  validator: (interaction: T) => boolean;
}

export type RegisteredModalSubmitInteraction = RegisteredInteraction<ModalSubmitInteraction>;
export type RegisteredSelectMenuInteraction = RegisteredInteraction<SelectMenuInteraction>;
export type RegisteredButtonInteraction = RegisteredInteraction<ButtonInteraction>;

export type PossibleInteraction = RegisteredModalSubmitInteraction | RegisteredSelectMenuInteraction | RegisteredButtonInteraction;

export const registerInteractions = (client: Client, interactionDirectory: string) => {
  const files = fs.readdirSync(interactionDirectory);

  for (const file of files) {
    const fileName = file.toLowerCase();

    const stats = fs.statSync(path.join(interactionDirectory, file));
    if (!stats.isDirectory()) continue;

    const interactionFiles = fs.readdirSync(path.join(interactionDirectory, file));
    for (const interactionFile of interactionFiles) {
      const interactionFileStats = fs.statSync(path.join(interactionDirectory, file, interactionFile));

      if (!interactionFileStats.isFile() || !interactionFile.endsWith(".js")) continue;

      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const interaction: PossibleInteraction = require(path.join(interactionDirectory, file, interactionFile)).default;

      switch (fileName) {
        case "buttons":
          client.buttons.push(interaction as RegisteredButtonInteraction);
          break;
        case "selectMenus":
          client.selectMenus.push(interaction as RegisteredSelectMenuInteraction);
          break;
        case "modals":
          client.modals.push(interaction as RegisteredModalSubmitInteraction);
          break;
      }
    }
  }
};
