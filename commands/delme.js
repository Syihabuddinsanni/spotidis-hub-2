const { MessageEmbed, MessageReaction } = require("discord.js");

module.exports = {
	name: "del",
	description: "deletes messages if you have permissions",
    usage: "",
    permissions: {
      channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
      member: ["ADMINISTRATOR"],
    },
    aliases: ["delete"],
    /**
*
* @param {import("../structures/DiscordMusicBot")} client
* @param {import("discord.js").Message} message
* @param {string[]} args
* @param {*} param3
*/
run: async (client, message, args, { GuildDB }) => {
	
        if (!message.member.hasPermission('MANAGE_MESSAGES')) {
            message.channel.send("Izin kamu ilegal (bukan admin).")
        }
        else if(isNaN(parseInt(args[0]))){
            message.react('<a:warn:866161245232693291>')
            message.channel.send("<a:warn:866161245232693291> Syntax salah. Syntax: `del [number]`")
        }else if(parseInt(args[0]) >= 100){
            message.react('<a:warn:866161245232693291>')
            message.channel.send("<a:warn:866161245232693291> Maksimal delete message hanya 99")
        }
        else{
            message.channel.bulkDelete((parseInt(args[0]) + 1))
            .catch((err) => {
                message.react('<a:warn:866161245232693291>')
                message.channel.send("Error : " + err)
		    //this useless btw
            })
        }
}};
