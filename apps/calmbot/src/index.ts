import { Client } from "discord.js";
import dotenv from "dotenv";
import path from "path";
import invariant from "tiny-invariant";
import { registerCommands } from "./client/command";
import { registerEvents } from "./client/events";
import { transformClient } from "./client/transform";

dotenv.config();

invariant(process.env.BOT_TOKEN, "BOT_TOKEN env variable not defined");

const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"] });

transformClient(client);

registerCommands(client, path.join(__dirname, "commands"));
registerEvents(client, path.join(__dirname, "events"));

client.login(process.env.BOT_TOKEN);
