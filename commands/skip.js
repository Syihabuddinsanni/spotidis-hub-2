const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");

module.exports = {
    name: "skip",
    description: "Melompati musik yang sedang diputar", //Skip the current song
    usage: "",
    permissions: {
        channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
        member: [],
    },
    aliases: ["s", "next"],
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async (client, message, args, { GuildDB }) => {
        let player = await client.Manager.get(message.guild.id);
        if (!player) return client.sendTime(message.channel, "<a:warn:866161245232693291> Gak bisa skip. gak ada lagu yang diputar.");
        if (!message.member.voice.channel) return client.sendTime(message.channel, "<a:warn:866161245232693291> | **You must be in a voice channel to use this command!**");
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return client.sendTime(message.channel, "<a:warn:866161245232693291> Waduh. bot nya lagi dipake tuh.");
        player.stop();
        await message.react("✅");
    },
    SlashCommand: {
        /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
        run: async (client, interaction, args, { GuildDB }) => {
            const guild = client.guilds.cache.get(interaction.guild_id);
            const member = guild.members.cache.get(interaction.member.user.id);

            if (!member.voice.channel) return client.sendTime(interaction, "<a:warn:866161245232693291> Masuk voice channel dulu sobad!");
            if (guild.me.voice.channel && !guild.me.voice.channel.equals(member.voice.channel)) return client.sendTime(interaction, "<a:warn:866161245232693291> Waduh. bot nya lagi dipake tuh.");

            const skipTo = interaction.data.options ? interaction.data.options[0].value : null;

            let player = await client.Manager.get(interaction.guild_id);

            if (!player) return client.sendTime(interaction, "<a:warn:866161245232693291> Gak bisa skip. gak ada lagu yang diputar.");
            console.log(interaction.data);
            if (skipTo !== null && (isNaN(skipTo) || skipTo < 1 || skipTo > player.queue.length)) return client.sendTime(interaction, "<a:warn:866161245232693291> Nomor antrian salah !");
            player.stop(skipTo);
            client.sendTime(interaction, "<a:checklist:866180443572928532> **Skipped!**");
        },
    },
};
