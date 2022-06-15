import { Client, Collection } from "discord.js";
import { Command } from "./command";

export interface ClientExtensions {
  commands: Collection<string, Command>;
}

export const transformClient = (client: Client) => {
  const ext: ClientExtensions = {
    commands: new Collection(),
  };
  Object.assign(client, ext);
};
