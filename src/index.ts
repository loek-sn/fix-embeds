import { Client, Events, GatewayIntentBits } from 'discord.js';
import { env } from './lib/env';
import { command } from './commands/fix.command';
import { createFixReplyHandler } from './handlers/fixReply.handler';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
  ],
});

client.on(Events.ClientReady, (readyClient) => {
  console.log(`Logged in as ${readyClient.user.tag}!`);
});

client.on(Events.InteractionCreate, async (interaction) => {
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
});

client.on(Events.MessageCreate, createFixReplyHandler(client));

client.login(env.DISCORD_CLIENT_TOKEN).catch((error) => {
  console.error('Error logging in:', error);
});
