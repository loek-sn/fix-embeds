import { Client, Events, GatewayIntentBits } from 'discord.js';
import { env } from './lib/env';
import { createFixReplyHandler } from './handlers/fixReply.handler';
import { fixHandler } from './handlers/fix.handler';

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

client.on(Events.InteractionCreate, fixHandler);

client.on(Events.MessageCreate, createFixReplyHandler(client));

client.login(env.DISCORD_CLIENT_TOKEN).catch((error) => {
  console.error('Error logging in:', error);
});
