
const client = new(require("discord.js").Client)
const DiscordMusicBot = require("./structures/DiscordMusicBot");
const client = new DiscordMusicBot();
const {
    MessageEmbed
} = require('discord.js');
const fetch = require('node-fetch')
const {
    Slash
} = require("discord-slash-commands");
const slash = new Slash({
    client: client
})
const embed = new MessageEmbed();

slash.on("create", (d) => {
    console.log(`Command created: ${JSON.parse(d.config.data).name}`)
})

slash.on("command", async (command) => {
    if (command.name === "activities") {
        let channel = client.channels.cache.get(command.options.find(m => m.name === "channel").value);
        if (channel.type !== "voice") return command.callback("Channel must be a voice channel.")
        if (command.options.find(m => m.name === "type").value === "yt") {
            fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
                    method: "POST",
                    body: JSON.stringify({
                        max_age: 86400,
                        max_uses: 0,
                        target_application_id: "755600276941176913",
                        target_type: 2,
                        temporary: false,
                        validate: null
                    }),
                    headers: {
                        "Authorization": `Bot ${client.token}`,
                        "Content-Type": "application/json"
                    }
                })
                .then(res => res.json())
                .then(invite => {
                    embed.setTitle("Activity added!")
                    embed.setDescription(`Added **YouTube Together** to [${channel.name}](https://discord.gg/${invite.code})\n> Click on the hyperlink to join.`)
                    embed.setFooter(`Requested by ${command.author.username + "#" + command.author.discriminator}`)
                    embed.setColor("#7289DA")
                    command.callback({
                        embeds: embed
                    });
                })

        }
        if (command.options.find(m => m.name === "type").value === "pn") {
            fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
                    method: "POST",
                    body: JSON.stringify({
                        max_age: 86400,
                        max_uses: 0,
                        target_application_id: "755827207812677713",
                        target_type: 2,
                        temporary: false,
                        validate: null
                    }),
                    headers: {
                        "Authorization": `Bot ${client.token}`,
                        "Content-Type": "application/json"
                    }
                })
                .then(res => res.json())
                .then(invite => {
                    embed.setTitle("Activity added!")
                    embed.setDescription(`Added **Poker Night** to [${channel.name}](https://discord.gg/${invite.code})\n> Click on the hyperlink to join.`)
                    embed.setFooter(`Requested by ${command.author.username + "#" + command.author.discriminator}`)
                    embed.setColor("#7289DA")
                    command.callback({
                        embeds: embed
                    });
                })

        }
        if (command.options.find(m => m.name === "type").value === "bio") {
            fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
                    method: "POST",
                    body: JSON.stringify({
                        max_age: 86400,
                        max_uses: 0,
                        target_application_id: "773336526917861400",
                        target_type: 2,
                        temporary: false,
                        validate: null
                    }),
                    headers: {
                        "Authorization": `Bot ${client.token}`,
                        "Content-Type": "application/json"
                    }
                })
                .then(res => res.json())
                .then(invite => {
                    embed.setTitle("Activity added!")
                    embed.setDescription(`Added **Betrayal.io** to [${channel.name}](https://discord.gg/${invite.code})\n> Click on the hyperlink to join.`)
                    embed.setFooter(`Requested by ${command.author.username + "#" + command.author.discriminator}`)
                    embed.setColor("#7289DA")
                    command.callback({
                        embeds: embed
                    });
                })

        }
        if (command.options.find(m => m.name === "type").value === "fio") {
            fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
                    method: "POST",
                    body: JSON.stringify({
                        max_age: 86400,
                        max_uses: 0,
                        target_application_id: "814288819477020702",
                        target_type: 2,
                        temporary: false,
                        validate: null
                    }),
                    headers: {
                        "Authorization": `Bot ${client.token}`,
                        "Content-Type": "application/json"
                    }
                })
                .then(res => res.json())
                .then(invite => {
                    embed.setTitle("Activity added!")
                    embed.setDescription(`Added **Fishington.io** to [${channel.name}](https://discord.gg/${invite.code})\n> Click on the hyperlink to join.`)
                    embed.setFooter(`Requested by ${command.author.username + "#" + command.author.discriminator}`)
                    embed.setColor("#7289DA")
                    command.callback({
                        embeds: embed
                    });
                })

        }
    }
})

client.on("ready", () => {
    console.log("Ready");
    slash.create({
        guildOnly: false,
        data: {
            name: "activities",
            description: "Voice channel activities",
            options: [{
                    name: "channel",
                    description: "Select the voice channel you want.",
                    required: true,
                    type: 7,
                },
                {
                    name: "type",
                    description: "Type of activity.",
                    required: true,
                    type: 3,
                    choices: [{
                            name: "YouTube Together",
                            value: "yt"
                        },
                        {
                            name: "Betrayal.io",
                            value: "bio"
                        },
                        {
                            name: "Poker Night",
                            value: "pn"
                        },
                        {
                            name: "Fishington.io",
                            value: "fio"
                        }
                    ]
                }
            ]
        }
    })
})

client.login(process.env.Token)
client.build();

module.exports = client; //;-;
    