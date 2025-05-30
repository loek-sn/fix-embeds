import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  MessageFlags,
} from 'discord.js';
import { replaceLink } from '../lib/fix/replaceLink';
import type { CommandInterface } from './commandInterface';
import { z } from 'zod/v4-mini';

const inputSchema = z.url();

export const command: CommandInterface = {
  data: {
    ...new SlashCommandBuilder()
      .setName('fix')
      .setDescription('Adds an embed for discord for common links')
      .addStringOption((option) =>
        option
          .setName('link')
          .setDescription('The link to embed')
          .setRequired(true),
      )
      .setDMPermission(true)
      .toJSON(),
    integration_types: [1],
    contexts: [0, 1, 2],
  },
  async handler(interaction: ChatInputCommandInteraction) {
    try {
      const link = interaction.options.getString('link', true);
      const { success, data, error } = inputSchema.safeParse(link);
      if (!success) {
        await interaction.reply({
          content: `Invalid link: ${error.message}`,
          flags: MessageFlags.Ephemeral,
        });
        return;
      }
      const fixedLink = replaceLink(data);
      if (!fixedLink) {
        await interaction.reply({
          content: `No fix available for the link.`,
          flags: MessageFlags.Ephemeral,
        });
        return;
      }
      await interaction.reply(fixedLink);
    } catch (_error) {
      console.error('Error in /fix command');
      await interaction.reply({
        content: 'An error occurred while processing the command.',
        flags: MessageFlags.Ephemeral,
      });
    }
  },
};
