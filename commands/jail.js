//UNDER CONSTRUCTION

const Discord = require("discord.js");
const AmeClient = require('amethyste-api');
const AmeAPI = new AmeClient("bb03f373caa534fcfcbaeae177a65134f44a6e57ba7a7b098be273867b376d8a677ddae3c23c6ded4fec8288573945e8c3483689deb13f229376ad4b5b60231d");

module.exports = {
 
        name: "jail",
        category: "image",
        noalias: [''],
        description: "Sends User To Jail",
        usage: "[username | nickname | mention | ID] (optional)",
      
    
        /**
      *
      * @param {import("../structures/DiscordMusicBot")} client
      * @param {import("discord.js").Message} message
      * @param {string[]} args
      * @param {*} param3
      */
    run: async (bot, message, args) => {
        let user = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.member;
        let m = await message.channel.send("<a:loading_1:867683285768732682> Tunggu cuk...");
        let buffer = await AmeAPI.generate("jail", { url: user.user.displayAvatarURL({ format: "png", size: 1024 }) });
        let attachment = new Discord.MessageAttachment(buffer, "jail.png");
        m.delete({ timeout: 5000 });
        message.channel.send(attachment);
    }
};
