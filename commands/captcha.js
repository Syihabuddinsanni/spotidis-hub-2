const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    
        name: "captcha",
        noalias: [''],
        category: "image",
        description: "Shows Captcha Image Of An User",
        usage: "[username | nickname | mention | ID](optional)",

 
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
        try {
            let res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=captcha&username=${user.user.username}&url=${user.user.displayAvatarURL({ format: "png", size: 512 })}`));
            let json = await res.json();
            let attachment = new Discord.MessageAttachment(json.message, "captcha.png");
            message.channel.send(attachment);
            m.delete({ timeout: 5000 });
        } catch (e) {
            console.log(e);
            m.edit("<a:warn:866161245232693291> Error, Coba lagi! dan tag seseorang.");
        }
    }
};