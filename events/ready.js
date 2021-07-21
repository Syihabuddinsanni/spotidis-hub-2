module.exports = async (client) => {
  client.Ready = true, 
  client.user.setPresence({
    status: "idle",  // You can show online, idle, and dnd
    activity: [{
        name: "Working On Update!",  // The message shown
        type: "WATCHING", // PLAYING, WATCHING, LISTENING, STREAMING,
    }
    , {
        type: "LISTENING",
        name: "!help | sadis.gang",
        url: "https://discord.gg/gj65TB8Y"
    }] ,
    //status akan ganti setiap 15 secod
    interval: 15


});
    client.Manager.init(client.user.id);
    client.log("Successfully Logged in as " + client.user.tag); // You can change the text if you want, but DO NOT REMOVE "client.user.tag"
client.RegisterSlashCommands();
};

    