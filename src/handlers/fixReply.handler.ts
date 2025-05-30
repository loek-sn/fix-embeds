import type { Client, Message, OmitPartialGroupDMChannel } from "discord.js";
import { replaceLink } from "../lib/fix/replaceLink";

export function createFixReplyHandler(client: Client<boolean>) {
    return async function handleFixReply(message: OmitPartialGroupDMChannel<Message<boolean>>) {
        if(!message.mentions.users.has(client.user!.id)) return;
        const metion = message.reference?.messageId;
        if(!metion) return;
        const metionMessage = await message.channel.messages.fetch(metion);
        if(!metionMessage) return;
        // filter out the content that is not a link
        const links = metionMessage.content.match(/https?:\/\/[^\s]+/g);
        if(!links) return;
        for(const link of links.map(replaceLink).filter(v => v !== undefined)) {
            await message.channel.send(link);
        }
    }
}