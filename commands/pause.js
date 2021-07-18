const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");

module.exports = {
    name: "pause",
    description: "Memberhentikan musik / pause lah cok", //Pauses the music
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
        if (!player) return client.sendTime(message.channel, "<a:alert1:853103770254180372> | **Tidak ada musik yang diputar**"); //Nothing is playing right now...
        if (!message.member.voice.channel) return client.sendTime(message.channel, "<a:alert1:853103770254180372> | **Masuk voice channel dulu sobad...**");
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return client.sendTime(message.channel, ":x: | **Bot nya lagi dipake cuk!**");
        if (player.paused) return client.sendTime(message.channel, "<a:alert1:853103770254180372> | **Music sudah dihentikan!**"); //Music already paused!
        player.pause(true);
        let embed = new MessageEmbed().setAuthor(`Di pause!`, client.config.IconURL).setColor("RANDOM").setDescription(`Type \`${GuildDB.prefix}resume\` untuk melanjutkan!`);
        await message.channel.send(embed);
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

            if (!member.voice.channel) return client.sendTime(interaction, "<a:alert1:853103770254180372> | **Masuk ke voice channel dulu sobad!**");
            if (guild.me.voice.channel && !guild.me.voice.channel.equals(member.voice.channel)) return client.sendTime(interaction, ":x: | **Bot nya lagi dipake cuk!**");

            let player = await client.Manager.get(interaction.guild_id);
            if (!player) return client.sendTime(interaction, "<a:alert1:853103770254180372> | **Tidak ada yang sedang diputar...**");
            if (player.paused) return client.sendTime(interaction, "Music sudah Di hentikan!");
            player.pause(true);
            client.sendTime(interaction, "**⏸ Di pause!**");
        },
    },
};