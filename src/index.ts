import { Client, Events, GatewayIntentBits } from 'discord.js';
import { env } from './lib/env';
import { command } from './commands/fix.command';
import { createFixReplyHandler } from './handlers/fixReply.handler';

const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
]});

client.on(Events.ClientReady, readyClient => {
  console.log(`Logged in as ${readyClient.user.tag}!`);
});

client.on(Events.InteractionCreate, command.handler)
client.on(Events.MessageCreate, createFixReplyHandler(client))

await client.login(env.DISCORD_CLIENT_TOKEN);