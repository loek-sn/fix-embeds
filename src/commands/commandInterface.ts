import type { Interaction, RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord.js";

export interface CommandInterface {
    data: RESTPostAPIChatInputApplicationCommandsJSONBody
    handler: (interaction: Interaction) => Promise<void>;
}