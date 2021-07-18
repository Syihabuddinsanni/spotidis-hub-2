const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");

module.exports = {
    name: "volume",
    description: "Mengecek atau mengganti volume", //Check or change the current volume
    usage: "<volume>",
    permissions: {
        channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
        member: [],
    },
    aliases: ["vol", "v"],
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async (client, message, args, { GuildDB }) => {
        let player = await client.Manager.get(message.guild.id);
        if (!player) return client.sendTime(message.channel, "<a:warn:866161245232693291> Gak ada musik yang sedang diputar.");
        if (!args[0]) return client.sendTime(message.channel, `🔉 | Current volume \`${player.volume}\`.`);
        if (!message.member.voice.channel) return client.sendTime(message.channel, "<a:warn:866161245232693291> Masuk voice channel dulu sobad!");
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return client.sendTime(message.channel, "<a:warn:866161245232693291> | Bot nya lagi dipake cuk!");
        if (!parseInt(args[0])) return client.sendTime(message.channel, `**Please choose a number between** \`1 - 100\``);
        let vol = parseInt(args[0]);
        player.setVolume(vol);
        client.sendTime(message.channel, `🔉 | **Volume set to** \`${player.volume}\``);
    },
    SlashCommand: {
        options: [
            {
                name: "amount",
                value: "amount",
                type: 4,
                required: false,
                description: "Enter a volume from 1-100. Default is 100.",
            },
        ],
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
            if (guild.me.voice.channel && !guild.me.voice.channel.equals(member.voice.channel)) return client.sendTime(interaction, "<a:warn:866161245232693291> Botnya lagi dipake cuk.");
            let player = await client.Manager.get(interaction.guild_id);
            if (!player) return client.sendTime(interaction, "<a:warn:866161245232693291> Gak ada musik yang sedang diputar.");
            if (!args[0].value) return client.sendTime(interaction, `🔉 | Current volume \`${player.volume}\`.`);
            let vol = parseInt(args[0].value);
            if (!vol || vol < 1 || vol > 100) return client.sendTime(interaction, `**Please choose a number between** \`1 - 100\``);
            player.setVolume(vol);
            client.sendTime(interaction, `🔉 | Volume set to \`${player.volume}\``);
        },
    },
};
