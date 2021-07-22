
const { MessageEmbed } = require("discord.js");
module.exports = {

      name: "avatar",
      description: "Shows Avatar",
      category: "image",

      usage: "[username | nickname | mention | ID](optional)",
    aliases: ["av"],
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async (bot, message, args) => { 
      
      let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.member;
  
      if (args[0]) {
        message.channel.send({
          embed: {
  
            title: `${user.user.username}'s Avatar`,
  
            color: 0xFFEFD5,
  
            image: {
              url: `${user.user.displayAvatarURL({dynamic: true})}` + '?size=4096'
            },
  
            timestamp: new Date(),
  
            footer: {
              text: message.guild.name,
              icon_url: message.guild.iconURL()
            }
          }
        })
      }
      else if (!args[0]) {
        message.channel.send({
          embed: {
  
            title: `${user.user.username}'s Avatar`,
  
            color: 0xFFEFD5,
  
            image: {
              url: `${user.user.displayAvatarURL({ dynamic: true })}` + '?size=4096'
            },
  
            timestamp: new Date(),
  
            footer: {
              text: message.guild.name,
              icon_url: message.guild.iconURL()
            }
  
          }
        })
      }
    }
  }