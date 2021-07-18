const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");

module.exports = {
    name: "resume",
    description: "Melanjutkan pemutaran musik", //Resumes the music
    usage: "",
    permissions: {
        channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
        member: [],
    },
    aliases: [],
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async (client, message, args, { GuildDB }) => {
        let player = await client.Manager.get(message.guild.id);
        if (!player) return client.sendTime(message.channel, "<a:warn:866161245232693291> Tidak ada musik yang sedang diputar.");
        if (!message.member.voice.channel) return client.sendTime(message.channel, "<a:warn:866161245232693291> Masuk voice channel dulu sobad!");
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return client.sendTime(message.channel, "<a:warn:866161245232693291>  Yah bot nya lagi di pake orang.");

        if (player.playing) return client.sendTime(message.channel, "<a:warn:866161245232693291> | **Musik tidak di pause**");
        player.pause(false);
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

            if (!member.voice.channel) return client.sendTime(interaction, "<a:warn:866161245232693291>  Masuk voice channel dulu sobad!");
            if (guild.me.voice.channel && !guild.me.voice.channel.equals(member.voice.channel)) return client.sendTime(interaction, "<a:warn:866161245232693291>Yah bot nya lagi di pake orang.");

            let player = await client.Manager.get(interaction.guild_id);
            if (!player) return client.sendTime(interaction, "<a:warn:866161245232693291> Tidak ada musik yang sedang diputar.");
            if (player.playing) return client.sendTime(interaction, "<a:warn:866161245232693291> | **Musik tidak di pause**");
            player.pause(false);
            client.sendTime(interaction, "**⏯ Dilanjutkan!**");
        },
    },
};
