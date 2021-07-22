const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {

        name: "instasearch",
        aliases: ["searchinsta", "sinsta"],
        category: "info",
        description: "Find out some nice instagram statistics",
        usage: "[instagram username]",


            /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async (bot, message, args) => {
        const name = args.join(" ");

        if (!name) {
            return message.channel.send("**Please Enter A Name!**")
                .then(m => m.delete({timeout: 5000}));
        }

        const url = `https://instagram.com/${name}/?__a=1`;

        let res;

        try {
            res = await fetch(url).then(url => url.json());
        } catch (e) {
            return message.channel.send("I couldn't find that account").then(msg => {
                msg.delete({timeout: 5000})
            })
        }

        const account = res.graphql.user;

        const embed = new MessageEmbed()
            .setColor("GREEN")
            .setTitle(account.full_name)
            .setURL(`https://instagram.com/${name}`)
            .setThumbnail(account.profile_pic_url_hd)
            .setDescription("Profile information")
            .addField("<:discordrolesfromvega:867776234649550898> **Username**", `${account.username}`)
            .addField("<:5270blurplepartner:867777554530041886>**Full name**", `${account.full_name}`)
            .addField("<:blurple_support:867399884701171732> **Biography**", `${account.biography.length == 0 ? "none" : account.biography}`)
            .addField("<:blurple_inbox:867434854529499146> **Posts**", `${account.edge_owner_to_timeline_media.count}`)
            .addField("<:8263blurplemembers:867776185056362496> **Followers**", `${account.edge_followed_by.count}`)
            .addField("👥 **Following**", `${account.edge_follow.count}`)
            .addField("<:CertifiedModerator:867418712327454730> **Private account**", `${account.is_private ? "Iya <:blurplecheck:867777554572378192>" : "Tidak <:blurplecross:867777554524930058>"}`);

        message.channel.send(embed);
    }
}



/*
     .setURL(`https://instagram.com/${name}`)
            .setThumbnail(account.profile_pic_url_hd)
            .setDescription("Profile information")
            .addField("<:discordrolesfromvega:867776234649550898> **Username**", `${account.username}`)
            .addField("<:5270blurplepartner:867777554530041886>**Full name**", `${account.full_name}`)
            .addField("<:blurple_support:867399884701171732> **Biography**", `${account.biography.length == 0 ? "none" : account.biography}`)
            .addField("<:blurple_inbox:867434854529499146> **Posts**", `${account.edge_owner_to_timeline_media.count}`)
            .addField("<:8263blurplemembers:867776185056362496> **Followers**", `${account.edge_followed_by.count}`)
            .addField("👥 **Following**", `${account.edge_follow.count}`)
            .addField("<:CertifiedModerator:867418712327454730> **Private account**", `${account.is_private ? "Iya <:blurplecheck:867777554572378192>" : "Tidak <:blurplecross:867777554524930058>"}`);

        message.channel.send(embed);
*/
