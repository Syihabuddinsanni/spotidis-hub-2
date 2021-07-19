const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "clear",
  description: "Menghapus daftar antrian", //Clears the server queue
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["cl", "cls"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let player = await client.Manager.get(message.guild.id);
    if (!player)
      return client.sendTime(
        message.channel,
        "<a:warn:866161245232693291> Tidak ada musik yang sedang diputar."
      );

    if (!player.queue || !player.queue.length || player.queue.length === 0)
      return client.sendTime(message.channel, "<a:warn:866161245232693291> Tidak ada musik yang sedang diputar.");
      if (!message.member.voice.channel) return client.sendTime(message.channel, "<a:warn:866161245232693291> Masuk voice channel dulu sobad !");
      if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return client.sendTime(message.channel, "<a:warn:866161245232693291> Waduh. Bot nya lagi di pake.");
    player.queue.clear();
    await client.sendTime(message.channel, "<a:checklist:866180443572928532> Berhasil menggusur antrian");
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
      if (!member.voice.channel) return client.sendTime(interaction, "<a:warn:866161245232693291> | You must be in a voice channel to use this command.");
      if (guild.me.voice.channel && !guild.me.voice.channel.equals(member.voice.channel)) return client.sendTime(interaction, "<a:warn:866161245232693291> Waduh. Bot nya lagi di pake.");
      let player = await client.Manager.get(interaction.guild_id);
      if (!player)
        return client.sendTime(interaction, "<a:warn:866161245232693291> Tidak ada musik yang sedang diputar.");

      if (!player.queue || !player.queue.length || player.queue.length === 0)
        return client.sendTime(interaction, "<a:warn:866161245232693291> Tidak ada musik yang sedang diputar.");
      player.queue.clear();
      await client.sendTime(interaction, "<a:checklist:866180443572928532> Berhasil menggusur antrian");
    },
  },
};
