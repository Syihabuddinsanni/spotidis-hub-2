const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");

module.exports = {
    name: "loop",
    description: "Mengulang musik yang sedang diputar", //Loop the current song
    usage: "",
    permissions: {
      channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
      member: [],
    },
    aliases: ["l", "repeat"],
    /**
      *
      * @param {import("../structures/DiscordMusicBot")} client
      * @param {import("discord.js").Message} message
      * @param {string[]} args
      * @param {*} param3
      */
    run: async (client, message, args, { GuildDB }) => {
      let player = await client.Manager.get(message.guild.id);
      if (!player) return client.sendTime(message.channel, "<a:warn:866161245232693291> | **Tidak ada yang sedang diputar. . .**");
      if (!message.member.voice.channel) return client.sendTime(message.channel, "<a:warn:866161245232693291> Masuk voice channel dulu sobad !");
      if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return client.sendTime(message.channel, "<a:warn:866161245232693291> Bot nya lagi dipake cuk !");

        if (player.trackRepeat) {
          player.setTrackRepeat(false)
          client.sendTime(message.channel, `<a:checklist:866180443572928532> Loop \`Berhasil Dimatikan!\``);
        } else {
          player.setTrackRepeat(true)
          client.sendTime(message.channel, `<a:checklist:866180443572928532> Loop \`Berhasil Diaktifkan!\``);
        }
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
          const voiceChannel = member.voice.channel;
          let player = await client.Manager.get(interaction.guild_id);
          if (!player) return client.sendTime(interaction, "<a:warn:866161245232693291> | **Tidak ada yang sedang diputar. . .**"); 
          if (!member.voice.channel) return client.sendTime(interaction, "<a:warn:866161245232693291> | Masuk voice channel dulu sobad !");
          if (guild.me.voice.channel && !guild.me.voice.channel.equals(member.voice.channel)) return client.sendTime(interaction, "<a:warn:866161245232693291> Bot nya lagi dipake cuk !");

            if(player.trackRepeat){
                  player.setTrackRepeat(false)
                  client.sendTime(interaction, `<a:checklist:866180443572928532> Loop \`Berhasil Dimatikan!\``);
              }else{
                  player.setTrackRepeat(true)
                  client.sendTime(interaction, `<a:checklist:866180443572928532> Loop \`Berhasil Diaktifkan!\``);
              }
          console.log(interaction.data)
        }
      }    
};