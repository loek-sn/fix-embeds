import { SlashCommandBuilder, type Interaction } from "discord.js";
import { replaceLink } from "../lib/fix/replaceLink";
import type { CommandInterface } from "./commandInterface";
import { int, z } from "zod/v4";

const inputSchema = z.url()

export const command = {
    data: new SlashCommandBuilder()
        .setName("fix")
        .setDescription("Fixes the links in the message")
        .addStringOption(option =>
            option.setName("link")
                .setDescription("The link to fix")
                .setRequired(true)
        ).toJSON(),
    async handler(interaction) {
        if (!interaction.isCommand()) return;

        const { commandName } = interaction;

        if (commandName === "fix") {
            const link = interaction.options.get("link", true).value
            const { success, data, error } = inputSchema.safeParse(link)
            if(!success) {
                await interaction.reply({
                    content: `Invalid link: ${error.message}`,
                    flags: ["Ephemeral"]
                })
                return;
            }
            const fixedLink = replaceLink(data);
            if(!fixedLink) {
                await interaction.reply({
                    content: `No fix available for the link: ${data}`,
                    flags: ["Ephemeral"]
                });
                return;
            }

            await interaction.reply(`Fixed link: ${fixedLink}`);
            return;
        }
    }
} satisfies CommandInterface