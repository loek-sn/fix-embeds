import type {
  ChatInputCommandInteraction,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
  RESTPostAPIContextMenuApplicationCommandsJSONBody,
} from 'discord.js';

export interface CommandInterface {
  data:
    | RESTPostAPIChatInputApplicationCommandsJSONBody
    | RESTPostAPIContextMenuApplicationCommandsJSONBody;
  handler: (interaction: ChatInputCommandInteraction) => Promise<void>;
}
