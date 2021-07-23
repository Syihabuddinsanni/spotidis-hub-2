const { Client, Message, MessageEmbed } = require('discord.js');
const figlet = require('figlet');


module.exports = {
    name: 'ascii',
    aliases: ['i-text'],
    description: 'Get ascii Text',
    useage: 'ascii <text>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        if (!args[0]) return message.channel.send('Please provide some text');

        msg = args.join(" ");

        figlet.text(msg, function (err, data) {
            if (err) {
                console.log('Something went wrong');
                console.dir(err);
            }
            if (data.length > 2000) return message.channel.send('Please provide text shorter than 2000 characters')

            message.channel.send(
                new MessageEmbed()
                    .setColor("545BEE")
                    .setAuthor(message.author.tag)
                    .setDescription('```' + data + '```')
                    .setFooter(message.author.tag)
            )
        })
    }
}