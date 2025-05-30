import type { Interaction } from "discord.js";
import { command } from "../commands/fix.command";

export async function fixHandler(interaction: Interaction) {
  console.log('Received interaction:', {
    commandName: interaction.isCommand()
      ? interaction.commandName
      : 'Not a command',
  });

  if (!interaction.isChatInputCommand()) {
    console.log('Ignoring non-chat input interaction:', interaction.type);
    return;
  }

  if (interaction.commandName === 'fix') {
    try {
      await command.handler(interaction);
    } catch (error) {
      console.error('Error handling /fix:', error);
      if (!interaction.replied && !interaction.deferred) {
        await interaction.reply({
          content: 'An error occurred while processing the command.',
          ephemeral: true,
        });
      }
    }
  } else {
    console.log('Unknown command:', interaction.commandName);
    await interaction.reply({
      content: 'Unknown command.',
      ephemeral: true,
    });
  }
}