const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: "avatar",
    aliases: ['av', 'pfp', 'pic'],
    description: "Get your own or someone else's avatar",
    usage: "[user mention]",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {

        const user = message.mentions.users.first() || message.author

        let av = new MessageEmbed()
            .setColor("#545BEE")
            .setTitle(`${user.tag} Avatar`)
            .setImage(user.displayAvatarURL({ dynamic: true, size: 512 }))
            .setDescription(`<:blurple_image:867426661918441483> [PNG](${user.avatarURL({ format: "png" })}) | <:blurple_image:867426661918441483> [JPG](${user.avatarURL({ format: "jpg" })}) | <:blurple_image:867426661918441483> [WEBP](${user.avatarURL({ format: 'webp' })}) |` )
            .setFooter(client.user.tag)
 //.setFooter( message.guild.name + message.guild.iconURL)
        message.channel.send(av)

    }
}