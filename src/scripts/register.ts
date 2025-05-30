import { REST, Routes } from 'discord.js';
import { env } from '../lib/env';
import { Glob } from 'bun';
import path from 'node:path';
import type { CommandInterface } from '../commands/commandInterface';

const rest = new REST().setToken(env.DISCORD_CLIENT_TOKEN);

async function registerCommands() {
  try {
    console.log('Started refreshing application (/) commands.');

    // Glob to find all .ts files in ./commands
    const dest = path.resolve(import.meta.dir, '../commands');
    const files = await Array.fromAsync(
      new Glob(`${dest}/*.command.ts`).scan(),
    );

    if (files.length === 0) {
      console.warn('No command files found in:', dest);
      return;
    }

    console.log('Command files found:', files);

    // Map files to command data
    const commands = (
      await Promise.all(
        files.map(async (file) => {
          try {
            const module = await import(file);
            const command: CommandInterface = module.command;
            if (command?.data) {
              console.log(
                `Command JSON for ${path.basename(file)}:`,
                JSON.stringify(command.data, null, 2),
              );
              return command.data;
            }
            console.warn(
              `Warning: ${path.basename(file)} does not export a valid command.`,
            );
            return null;
          } catch (error) {
            console.error(
              `Error loading command ${path.basename(file)}:`,
              error,
            );
            return null;
          }
        }),
      )
    ).filter(
      (cmd): cmd is NonNullable<CommandInterface['data']> => cmd !== null,
    );

    if (commands.length === 0) {
      console.warn('No valid commands to register.');
      return;
    }

    // Register commands with Discord API
    const response = await rest.put(
      Routes.applicationCommands(env.DISCORD_CLIENT_ID),
      {
        body: commands,
      },
    );

    console.log(
      `Successfully reloaded ${commands.length} application (/) commands.`,
    );
    console.log('Discord API response:', JSON.stringify(response, null, 2));
  } catch (error) {
    console.error('Error registering commands:', error);
    throw error;
  }
}

registerCommands();
