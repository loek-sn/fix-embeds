// scripts/registerCommands.ts
import { REST, Routes } from "discord.js";
import { env } from "../lib/env";
import { Glob } from "bun";
import path from "node:path"
import type { CommandInterface } from "../commands/commandInterface";

const rest = new REST({ version: "10" }).setToken(env.DISCORD_CLIENT_TOKEN);

try {
    console.log("Started refreshing application (/) commands.");

    // Glob to find all .ts files in ./commands
    const dest = path.resolve(import.meta.dir, "../commands")
    const files = await Array.fromAsync(new Glob(`${dest}/*.command.ts`).scan());

    console.log(files)

    // Map files to command data
    const commands = await Promise.all(
      files.map(async (file) => {
        const module = await import(file);
        // Ensure the imported module exports a valid CommandInterface
        const command: CommandInterface = module.command;
        if (command?.data) {
          return command.data; // Convert SlashCommandBuilder to JSON
        }
        console.warn(`Warning: ${file} does not export a valid command.`);
        return null;
      })
    );


    commands.forEach((cmd) => {
        if(cmd === null) {
            throw new Error("Command data is null. Ensure all command files export a valid CommandInterface.");
        }
    });

    // Register commands with Discord API
    await rest.put(Routes.applicationCommands(env.DISCORD_CLIENT_ID), {
      body: commands,
    });

    console.log(`Successfully reloaded ${commands.length} application (/) commands.`);
} catch (error) {
    console.error("Error registering commands:", error);
}