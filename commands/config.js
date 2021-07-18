const { MessageEmbed, MessageReaction } = require("discord.js");

module.exports = {
  name: "config",
  description: "Edit settingan bot", //Edit the bot settings
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: ["ADMINISTRATOR"],
  },
  aliases: ["conf"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let Config = new MessageEmbed()
      .setAuthor("Server Config", client.config.IconURL)
      .setColor("BLUE")
      .addField("Prefix", GuildDB.prefix, true)
      .addField("DJ Role", GuildDB.DJ ? `<@&${GuildDB.DJ}>` : "Belum disetting", true)
      .setDescription(`
Apa yang ingin di edit ?

<:Number1:866133483398496256> - \`Server Prefix\`
<:Number2:866133498771275817> - \`DJ Role\`
`);

    let ConfigMessage = await message.channel.send(Config);
    await ConfigMessage.react("<:Number1:866133483398496256>");
    await ConfigMessage.react("<:Number2:866133498771275817>");
    let emoji = await ConfigMessage.awaitReactions(
      (reaction, user) =>
        user.id === message.author.id &&
        ["<:Number1:866133483398496256>", "<:Number2:866133498771275817>"].includes(reaction.emoji.name),
      { max: 1, errors: ["time"], time: 30000 }
    ).catch(() => {
      ConfigMessage.reactions.removeAll();
      client.sendTime(
        message.channel, "<a:warn:866161245232693291> Waktu habis. Jalankan command ulang!"
      );
      ConfigMessage.delete(Config);
    });
    let isOk = false;
    try {
      emoji = emoji.first();
    } catch {
      isOk = true;
    }
    if (isOk) return; //im idiot sry ;-;
    /**@type {MessageReaction} */
    let em = emoji;
    ConfigMessage.reactions.removeAll();
    if (em._emoji.name === "<:Number1:866133483398496256>") {
      await client.sendTime(message.channel, "Mau ganti prefix apa sobad ?");
      let prefix = await message.channel.awaitMessages(
        (msg) => msg.author.id === message.author.id,
        { max: 1, time: 30000, errors: ["time"] }
      );
      if (!prefix.first())
        return client.sendTime(message.channel, "Respon terlalu lama.");
      prefix = prefix.first();
      prefix = prefix.content;

      await client.database.guild.set(message.guild.id, {
        prefix: prefix,
        DJ: GuildDB.DJ,
      });

      client.sendTime(
        message.channel, `Berhasil memperbarui prefix  \`${prefix}\``
      );
    } else {
      await client.sendTime(
        message.channel, "Silahkan mention calon 'DJ' role nya."
      );
      let role = await message.channel.awaitMessages(
        (msg) => msg.author.id === message.author.id,
        { max: 1, time: 30000, errors: ["time"] }
      );
      if (!role.first())
        return client.sendTime(message.channel, "Respon terlalu lama.");
      role = role.first();
      if (!role.mentions.roles.first())
        return client.sendTime(
          message.channel, "Silahkan mention calon 'DJ' role nya."
        );
      role = role.mentions.roles.first();

      await client.database.guild.set(message.guild.id, {
        prefix: GuildDB.prefix,
        DJ: role.id,
      });

      client.sendTime(
        message.channel, "<a:checklist:866180443572928532> Berhasil menyimpan role <@&" + role.id + ">"
      );
    }
  },

  SlashCommand: {
    options: [
      {
        name: "prefix",
        description: "Check the bot's prefix",
        type: 1,
        required: false,
        options: [
          {
            name: "symbol",
            description: "Set the bot's prefix",
            type: 3,
            required: false,
          },
        ],
      },
      {
        name: "dj",
        description: "Check the DJ role",
        type: 1,
        required: false,
        options: [
          {
            name: "role",
            description: "Set the DJ role",
            type: 8,
            required: false,
          },
        ],
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
      let config = interaction.data.options[0].name;
      let member = await interaction.guild.members.fetch(interaction.user_id);
      //TODO: if no admin perms return...
      if (config === "prefix") {
        //prefix stuff
        if (
          interaction.data.options[0].options &&
          interaction.data.options[0].options[0]
        ) {
          //has prefix
          let prefix = interaction.data.options[0].options[0].value;
          await client.database.guild.set(interaction.guild.id, {
            prefix: prefix,
            DJ: GuildDB.DJ,
          });
          client.sendTime(interaction, `The prefix has now been set to \`${prefix}\``);
        } else {
          //has not prefix
          client.sendTime(interaction, `The prefix of this server is \`${GuildDB.prefix}\``);
        }
      } else if (config === "djrole") {
        //DJ role
        if (
          interaction.data.options[0].options &&
          interaction.data.options[0].options[0]
        ) {
          let role = interaction.guild.roles.cache.get(
            interaction.data.options[0].options[0].value
          );
          await client.database.guild.set(interaction.guild.id, {
            prefix: GuildDB.prefix,
            DJ: role.id,
          });
          client.sendTime(
            interaction, `Successfully changed the DJ role of this server to ${role.name}`
          );
        } else {
          /**
           * @type {require("discord.js").Role}
           */
          let role = interaction.guild.roles.cache.get(GuildDB.DJ);
          client.sendTime(interaction, `The DJ role of this server is ${role.name}`);
        }
      }
    },
  },
};
