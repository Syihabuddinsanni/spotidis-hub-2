const { MessageEmbed } = require("discord.js");



module.exports = {
    name: "ping",
    category: "Information",
    aliases: ["latency"],
    cooldown: 2,
    usage: "ping",
    description: "Gives you information on how fast the Bot can respond to you",
    run: async (client, message, args, user, text, prefix) => {
    try{
      let oldate = new Date().getMilliseconds()
      message.channel.send(new MessageEmbed()
        .setColor("#00ff00")
        .setTitle(`<a:ping:867672110675656715> Pinging....`)
      ).then(msg=>{
        let newtime = new Date().getMilliseconds() - oldate;
        msg.edit(new MessageEmbed()
          .setColor("#00ff00")
          .setDescription(`<a:ping:867672110675656715> ${client.ws.ping}ms\n\n<a:uptime:867672113136271430> ${client.ws.ping + newtime}ms\n\n:heartbeat: ${newtime}ms`)
        );
      })
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`❌ ERROR | An error occurred`)
            .setDescription(`\`\`\`${e.stack}\`\`\``)
        );
    }
  }
}
/**
  * @INFO
  * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/Discord-Js-Handler-Template
  * @INFO
  * Work for Milrato Development | https://milrato.eu
  * @INFO
  * Please mention Him / Milrato Development, when using this Code!
  * @INFO
*/
