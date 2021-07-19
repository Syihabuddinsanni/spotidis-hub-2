const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "disconnect",
  description: "Memberhentikan musik dan keluar voice channel", //Stop the music and leave the voice channel
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["leave", "exit", "quit", "dc", "stop"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let player = await client.Manager.get(message.guild.id);
    if (!message.member.voice.channel) return client.sendTime(message.channel, "<a:warn:866161245232693291> Masuk voice channel dulu sobad !");
    if (!player) return client.sendTime(message.channel,"<a:warn:866161245232693291> Tidak ada musik yang sedang diputar.");
    await client.sendTime(message.channel,":notes: | **Disconnected!**");
    await message.react("✅");
    player.destroy();
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

      if (!member.voice.channel)
        return client.sendTime(
          interaction,
          "<a:warn:866161245232693291> Masuk voice channel dulu sobad !"
        );
      if (
        guild.me.voice.channel &&
        !guild.me.voice.channel.equals(member.voice.channel)
      )
        return client.sendTime(
          interaction,
          `<a:warn:866161245232693291> Kamu harus masuk ke ${guild.me.voice.channel} untuk melakukan command.`
        );

      let player = await client.Manager.get(interaction.guild_id);
      if (!player)
        return client.sendTime(
          interaction,
          "<a:warn:866161245232693291> Tidak ada musik yang sedang diputar."
        );
      player.destroy();
      client.sendTime(
        interaction,
        ":notes: | **Disconnected!**"
      );
    },
  },
};
