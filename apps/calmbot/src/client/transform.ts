import { Client, Collection } from "discord.js";
import { Command } from "./command";
import { RegisteredButtonInteraction, RegisteredModalSubmitInteraction, RegisteredSelectMenuInteraction } from "./interactions";

export interface ClientExtensions {
  commands: Collection<string, Command>;

  buttons: RegisteredButtonInteraction[];
  selectMenus: RegisteredSelectMenuInteraction[];
  modals: RegisteredModalSubmitInteraction[];
}

export const transformClient = (client: Client) => {
  const ext: ClientExtensions = {
    commands: new Collection(),
    buttons: [],
    selectMenus: [],
    modals: [],
  };
  Object.assign(client, ext);
};
