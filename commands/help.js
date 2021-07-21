const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  description: "Informasi tentang command bot", //Information about the bot
  usage: "[command]",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["command", "commands", "cmd"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
   run: async (client, message, args, { GuildDB }) => {
    let Commands = client.commands.map(
      (cmd) =>
        `> [\`${GuildDB ? GuildDB.prefix : client.config.DefaultPrefix}${
          cmd.name
        }${cmd.usage ? " " + cmd.usage : ""}\`](https://spotidis-hub.herokuapp.com/#commands) - ${cmd.description}` // EDIT BESOK
    );

    let Embed = new MessageEmbed()
            .setAuthor(
              `Commands of ${client.user.username}`,
              client.config.IconURL
            )
            .setColor("#0A179A")
            .addFields( //edit sekarang
              { name: '<:blurple_image:867426661918441483> __Images__', value: '> \`Masi dalam pengerkaan\`' },
              { name: '<:blurple_undeafened:867399815255556106> __Music__', value: '> `bassboost <none|low|medium|high>` | `play` | `pause` | `search` | `nowplaying` | `queue` | `volume` | `skip` | `skipto` | `seek` | `resume` | `remove` | `grab` | `disconnect` | `clear` | `loop` | `loopqueue` | `lyrics`'},
              { name: '<:blurple_settings:867424376236408832> __Utility__', value: '> `invite` | `stats` | `config` | `ping`' },
              { name: '\n<:blank:864149186811133972> ', value: '  [<:blurple_link:867400057350389790> **Support Server**](https://discord.gg/shehdSk8s3) | <:blurple_github:867418757947981834> [**GitHub**](https://github.com/syihabuddin) | <:CertifiedModerator:867418712327454730> By [**Sh3hub1337**](https://github.com/syihabuddin)' },
              
            )
            .setFooter(
              `To get info of each command type ${
                GuildDB ? GuildDB.prefix : client.config.DefaultPrefix
              }help [Command] | Have a nice day!`
            )
            .setImage('https://cdn.discordapp.com/attachments/840568082976210974/867431538169741322/standard.gif')
            .setDescription(`
            
            Discord Music Bot Version: 0.91 **(Beta Version)**
  Prefix saat ini \`${  GuildDB ? GuildDB.prefix : client.config.DefaultPrefix  }\` 
  Kalo mau ganti prefix ketikan  \`${  GuildDB ? GuildDB.prefix : client.config.DefaultPrefix  }config\` `);
  
    if (!args[0]) message.channel.send(Embed);
    else {
      let cmd =
        client.commands.get(args[0]) ||
        client.commands.find((x) => x.aliases && x.aliases.includes(args[0]));
      if (!cmd)
        return client.sendTime(message.channel, `❌ | Unable to find that command.`);

      let embed = new MessageEmbed()
        .setAuthor(`Command: ${cmd.name}`, client.config.IconURL)
        .setDescription(cmd.description)
        .setColor("GREEN")
        .setImage(client.config.Image)
        //.addField("Name", cmd.name, true)
        .addField("Aliases", `\`${cmd.aliases.join(", ")}\``, true)
        .addField(
          "Usage",
          `\`${GuildDB ? GuildDB.prefix : client.config.DefaultPrefix}${
            cmd.name
          }${cmd.usage ? " " + cmd.usage : ""}\``,
          true, client.config.Image
        )
        .addField(
          "Permissions",
          "Member: " +
            cmd.permissions.member.join(", ") +
            "\nBot: " +
            cmd.permissions.channel.join(", "),
          true
          
        )
        .setFooter(
          `Prefix - ${
            GuildDB ? GuildDB.prefix : client.config.DefaultPrefix
          }`
        );

      message.channel.send(embed);
    }
  },

SlashCommand: {
    options: [
      {
        name: "command",
        description: "Get information on a specific command",
        value: "command",
        type: 3,
        required: false
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
      let Commands = client.commands.map(
        (cmd) =>
          `> [\`${GuildDB ? GuildDB.prefix : client.config.DefaultPrefix}${
            cmd.name
          }${cmd.usage ? " " + cmd.usage : ""}\`](https://spotidis-hub.herokuapp.com/#commands) - ${cmd.description}` //NEW UI
      );
  
      let Embed = new MessageEmbed()
            .setAuthor(
              `Commands of ${client.user.username}`,
              client.config.IconURL
            )
            .setColor("#0A179A")
            .setFooter(
              `To get info of each command type ${
                GuildDB ? GuildDB.prefix : client.config.DefaultPrefix
              }help [Command] | Have a nice day!`
            ).setDescription(`${Commands.join("\n")}

  Discord Music Bot Version: 0.91 **(Beta Version)**
  [✨ **Support Server**](https://discord.gg/shehdSk8s3) | [**GitHub**](https://github.com/syihabuddin) | By [**Sh3hub1337**](https://github.com/syihabuddin) 
  https://cdn.discordapp.com/attachments/752712711556694057/865839960137007144/PicsArt_07-17-01.18.11.jpg`);
      if (!args) return interaction.send(Embed);
      else {
        let cmd =
          client.commands.get(args[0].value) ||
          client.commands.find((x) => x.aliases && x.aliases.includes(args[0].value));
        if (!cmd)
          return client.sendTime(interaction, `❌ | Unable to find that command.`);
  
        let embed = new MessageEmbed()
          .setAuthor(`Command: ${cmd.name}`, client.config.IconURL)
          .setDescription(cmd.description)
          .setColor("GREEN")
          .setImage(client.config.Image)
          //.addField("Name", cmd.name, true)
          .addField("Aliases", cmd.aliases.join(", "), true)
          .addField(
            "Usage",
            `\`${GuildDB ? GuildDB.prefix : client.config.DefaultPrefix}${
              cmd.name
            }\`${cmd.usage ? " " + cmd.usage : ""}`,
            true,client.config.Image
          )
         
          .addField(
            "Permissions",
            "Member: " +
              cmd.permissions.member.join(", ") +
              "\nBot: " +
              cmd.permissions.channel.join(", "),
            true
          )
          .setFooter(
            `Prefix - ${
              GuildDB ? GuildDB.prefix : client.config.DefaultPrefix
            }`
          );
  
        interaction.send(embed);
      }
  },
}};

























//V 0.91
/*const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  description: "Informasi tentang command bot", //Information about the bot
  usage: "[command]",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["command", "commands", "cmd"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  /* run: async (client, message, args, { GuildDB }) => {
    let Commands = client.commands.map(
      (cmd) =>
        `> [\`${GuildDB ? GuildDB.prefix : client.config.DefaultPrefix}${
          cmd.name
        }${cmd.usage ? " " + cmd.usage : ""}\`](https://spotidis-hub.herokuapp.com/#commands) - ${cmd.description}` // EDIT BESOK
    );

    let Embed = new MessageEmbed()
            .setAuthor(
              `Commands of ${client.user.username}`,
              client.config.IconURL
            )
            .setColor("#0A179A")
            .setFooter(
              `To get info of each command type ${
                GuildDB ? GuildDB.prefix : client.config.DefaultPrefix
              }help [Command] | Have a nice Day Brader Wokwkowko!`
            ).setDescription(`${Commands.join("\n")}
            
            Discord Music Bot Version: 0.91 **(Beta Version)**
  [✨ **Support Server**](https://discord.gg/shehdSk8s3) | [**GitHub**](https://github.com/syihabuddin) | By [**Sh3hub1337**](https://github.com/syihabuddin)
  `);
  
    if (!args[0]) message.channel.send(Embed);
    else {
      let cmd =
        client.commands.get(args[0]) ||
        client.commands.find((x) => x.aliases && x.aliases.includes(args[0]));
      if (!cmd)
        return client.sendTime(message.channel, `❌ | Unable to find that command.`);

      let embed = new MessageEmbed()
        .setAuthor(`Command: ${cmd.name}`, client.config.IconURL)
        .setDescription(cmd.description)
        .setColor("GREEN")
        .setImage(client.config.Image)
        //.addField("Name", cmd.name, true)
        .addField("Aliases", `\`${cmd.aliases.join(", ")}\``, true)
        .addField(
          "Usage",
          `\`${GuildDB ? GuildDB.prefix : client.config.DefaultPrefix}${
            cmd.name
          }${cmd.usage ? " " + cmd.usage : ""}\``,
          true, client.config.Image
        )
        .addField(
          "Permissions",
          "Member: " +
            cmd.permissions.member.join(", ") +
            "\nBot: " +
            cmd.permissions.channel.join(", "),
          true
          
        )
        .setFooter(
          `Prefix - ${
            GuildDB ? GuildDB.prefix : client.config.DefaultPrefix
          }`
        );

      message.channel.send(embed);
    }
  },

SlashCommand: {
    options: [
      {
        name: "command",
        description: "Get information on a specific command",
        value: "command",
        type: 3,
        required: false
      },
    ],
    /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */

   /* run: async (client, interaction, args, { GuildDB }) => {
      let Commands = client.commands.map(
        (cmd) =>
          `> [\`${GuildDB ? GuildDB.prefix : client.config.DefaultPrefix}${
            cmd.name
          }${cmd.usage ? " " + cmd.usage : ""}\`](https://spotidis-hub.herokuapp.com/#commands) - ${cmd.description}` //NEW UI
      );
  
      let Embed = new MessageEmbed()
            .setAuthor(
              `Commands of ${client.user.username}`,
              client.config.IconURL
            )
            .setColor("#0A179A")
            .setFooter(
              `To get info of each command type ${
                GuildDB ? GuildDB.prefix : client.config.DefaultPrefix
              }help [Command] | Have a nice day!`
            ).setDescription(`${Commands.join("\n")}

  Discord Music Bot Version: 0.91 **(Beta Version)**
  [✨ **Support Server**](https://discord.gg/shehdSk8s3) | [**GitHub**](https://github.com/syihabuddin) | By [**Sh3hub1337**](https://github.com/syihabuddin) 
  https://cdn.discordapp.com/attachments/752712711556694057/865839960137007144/PicsArt_07-17-01.18.11.jpg`);
      if (!args) return interaction.send(Embed);
      else {
        let cmd =
          client.commands.get(args[0].value) ||
          client.commands.find((x) => x.aliases && x.aliases.includes(args[0].value));
        if (!cmd)
          return client.sendTime(interaction, `❌ | Unable to find that command.`);
  
        let embed = new MessageEmbed()
          .setAuthor(`Command: ${cmd.name}`, client.config.IconURL)
          .setDescription(cmd.description)
          .setColor("GREEN")
          .setImage(client.config.Image)
          //.addField("Name", cmd.name, true)
          .addField("Aliases", cmd.aliases.join(", "), true)
          .addField(
            "Usage",
            `\`${GuildDB ? GuildDB.prefix : client.config.DefaultPrefix}${
              cmd.name
            }\`${cmd.usage ? " " + cmd.usage : ""}`,
            true,client.config.Image
          )
         
          .addField(
            "Permissions",
            "Member: " +
              cmd.permissions.member.join(", ") +
              "\nBot: " +
              cmd.permissions.channel.join(", "),
            true
          )
          .setFooter(
            `Prefix - ${
              GuildDB ? GuildDB.prefix : client.config.DefaultPrefix
            }`
          );
  
        interaction.send(embed);
      }
  },
}};
*/