module.exports = {
  Admins: ["309182131811254272", "UserID"], //Admins of the bot
  ExpressServer: true,//If you wanted to make the website run or not
  DefaultPrefix: process.env.Prefix || ">", //Default prefix, Server Admins can change the prefix
  Port: 3000, //Which port website gonna be hosted
  SupportServer: "https://discord.gg/sbySMS7m3v", //Support Server Link
  Token: process.env.Token || "", //Discord Bot Token
  ClientID: process.env.Discord_ClientID || "", //Discord Client ID
  ClientSecret: process.env.Discord_ClientSecret || "", //Discord Client Secret
  Scopes: ["identify", "guilds", "applications.commands"], //Discord OAuth2 Scopes
  CallbackURL: "/api/callback", //Discord OAuth2 Callback URL
  "24/7": false, //If you want the bot to be stay in the vc 24/7
  CookieSecret: "Pikachu is cute", //A Secret like a password
  IconURL:
    "https://media.discordapp.net/attachments/855346696590589976/863764959820120084/863450718295162880.gif", //URL of all embed author icons | Dont edit unless you dont need that Music CD Spining DEFAULT : https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif
    djBlue:
    "https://cdn.discordapp.com/attachments/752712711556694057/865839960137007144/PicsArt_07-17-01.18.11.jpg", //ngawur
  Permissions: 2205280576, //Bot Inviting Permissions
  Website: process.env.Website || "https://spotidis-hub.herokuapp.com", //http://localhost Website where it was hosted at includes http or https || Use "0.0.0.0" if you using Heroku

  //Lavalink
  Lavalink: {
    id : "Main",
    host: "157.90.147.60",
    port:  2333,
    pass: "magicmoments",
    },
  
  //Alternate Lavalink
  /*
  Lavalink: {
    id: "Main",
    host: "lava.sudhan.tech",
    port: 1234,
    pass: "CodingWithSudhan", 
  },
  */

  //Please go to https://developer.spotify.com/dashboard/
  Spotify: {
    ClientID: process.env.Spotify_ClientID || "", //Spotify Client ID
    ClientSecret: process.env.Spotify_ClientSecret || "", //Spotify Client Secret
  },
};
