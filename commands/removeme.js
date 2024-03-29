const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");

  module.exports = {
    name: "remove",
    description: `Menghapus musik dari daftar antrian`, //Remove a song from the queue
    usage: "[number]",
    permissions: {
      channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
      member: [],
    },
    aliases: ["rm"],

    /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let player = await client.Manager.players.get(message.guild.id);
    const song = player.queue.slice(args[0] - 1, 1); 
    if (!player) return client.sendTime(message.channel, "<a:warn:866161245232693291> Tidak ada musik yang sedang diputar.");
    if (!message.member.voice.channel) return client.sendTime(message.channel, "<a:warn:866161245232693291>  Masuk voice channel dulu sobad!");
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return client.sendTime(message.channel, "<a:warn:866161245232693291> Bot nya lagi dipake cuk.");
        
    if (!player.queue || !player.queue.length || player.queue.length === 0)
      return message.channel.send("<a:warn:866161245232693291> Antrian kosong. Tidak ada yang dapat dihapus");
    let rm = new MessageEmbed()
      .setDescription(`<a:checklist:866180443572928532> **|** Berhasil menghapus nomor  **\`${Number(args[0])}\`** dalam antrian!`)
      .setColor("GREEN")
      if (isNaN(args[0]))rm.setDescription(`**Usage - **${client.config.prefix}\`remove [track]\``);
      if (args[0] > player.queue.length)
      rm.setDescription(`The queue has only ${player.queue.length} songs!`);
    await message.channel.send(rm);
    player.queue.remove(Number(args[0]) - 1);
  },

//SLASH COMMANDS

  SlashCommand: {
    options: [
      {
          name: "track",
          value: "[track]",
          type: 4,
          required: true,
          description: "Remove a song from the queue",
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
      let player = await client.Manager.get(interaction.guild_id);
      const guild = client.guilds.cache.get(interaction.guild_id);
      const member = guild.members.cache.get(interaction.member.user.id);
      const song = player.queue.slice(args[0] - 1, 1);
      if (!player) return client.sendTime(interaction, "<a:warn:866161245232693291> Tidak ada musik yang sedang diputar.");
      if (!member.voice.channel) return client.sendTime(interaction, "<a:warn:866161245232693291>  Masuk voice channel dulu sobad!");
      if (guild.me.voice.channel && !guild.me.voice.channel.equals(member.voice.channel)) return client.sendTime(interaction, ":x: Bot nya lagi dipake cuk.");
  
      if (!player.queue || !player.queue.length || player.queue.length === 0)
      return client.sendTime("<a:warn:866161245232693291> Tidak ada musik yang sedang diputar.");
      let rm = new MessageEmbed()
        .setDescription(`✅ | **Berhasil menghapus nomor ** \`${Number(args[0])}\` dalam antrian!`)
        .setColor("GREEN")
      if (isNaN(args[0])) rm.setDescription(`**Usage:** \`${GuildDB.prefix}remove [track]\``);
      if (args[0] > player.queue.length)
        rm.setDescription(`The queue has only ${player.queue.length} songs!`);
      await interaction.send(rm);
      player.queue.remove(Number(args[0]) - 1);
    },
  }
};