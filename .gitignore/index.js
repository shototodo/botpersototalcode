const Discord = require('discord.js');

const prefix = "+"

const Client = new Discord.Client();

Client.on("ready", async () =>{
    console.log("Le bot est ON")
});

Client.on("message", message => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") return;

    if(message.content === prefix + "ping"){
        message.channel.send("Pong.");
    };

    if(message.content === prefix + "stat"){
        message.channel.send(message.author.username + " qui a pour identifiant :" + message.author.id + " a posté un message");
    }

    else if (message.content === prefix + "server"){
        message.channel.send("Nom du serveur : " + message.guild.name + "\nNombre d'utilisateurs : " + message.guild.memberCount);
    }

    else if (message.content === prefix + "avatar"){
        message.channel.send(`Votre avatar est : ${message.author.displayAvatarURL({ format: 'png'})}`)
    }
});

Client.on ("message", message => {
    if(message.author.bot) return;
    if(message.channel.type == "dm")return;

    if(message.member.hasPermission("BAN_MEMBERS")){
        if (message.content.startsWith(prefix + "ban")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Membre non ou mal mentionné.");
            }
            else {
                if(mention.bannable){
                    mention.ban();
                    message.channel.send(mention.displayName + " a été banni avec succès. ")
                }
                else{
                    message.reply("Impossible de bannir ce membre.");
                }
            }
        }
    }
    if(message.member.hasPermission("KICK_MEMBERS")){
        if (message.content.startsWith(prefix + "kick")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Membre non ou mal mentionné.");
            }
            else {
                if (mention.kickable){
                    mention.kick();
                    message.channel.send(mention.displayName + " a été kick avec succès.");
                    console.log(" il a été kick ma gueule ")
                }
                else {
                    message.reply("Impossible de kick ce membre.");
                }
            }
        }
    }
    if(message.member.hasPermission("MANAGE_MESSAGES")){
        if (message.content.startsWith(prefix + "mute")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Membre non ou mal mentionné.");
            }
            else{
                mention.roles.add("790979314144903238");
                message.reply(mention.displayName + " mute avec succès.");
            }
        }
        
        if (message.content.startsWith(prefix + "unmute")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Membre non ou mal mentionné.");
            }
            else{
                mention.roles.remove("790979314144903238");
                message.reply(mention.displayName + " unmute avec succès.");
            }
        }
        
        if (message.content.startsWith(prefix + "tempmute")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Membre non ou mal mentionné.");
            }
            else{
                let args = message.content.split(" ");

                mention.roles.add("790979314144903238");
                setTimeout(function() {
                    mention.roles.remove("790979314144903238");
                    message.channel.send("<@" + mention.id + "> Tu peux désormais de nouveau parler !");
                }, args[2] * 1000 * 60)
            }
        }
    }
});


Client.on('message', async message => {
    if(message.author.id === "790680156489383947")return;

    let blacklisted = ['https://', 'http://', 'discord.gg',];
  
    let foundInText = false;
    for (var i in blacklisted) {
        if (message.content.toLowerCase().includes(blacklisted[i].toLowerCase())) foundInText = true;
    }
    
    if (foundInText) {
        message.delete();
        message.channel.send(new Discord.MessageEmbed()
      .setDescription(':no_entry: Les liens sont interdits dans ce serveur !!')
      .setColor(`#ff0000`))
    }
  });
  
  Client.on('message', async message => {
  
    let blacklisted = ["fdp", 'connard', 'ntm', 'va te faire' , ' va te faire foutre', 'enculé', 'encule', 'nique ta race', 'nique'];
  
    let foundInText = false;
    for (var i in blacklisted) {
        if (message.content.toLowerCase().includes(blacklisted[i].toLowerCase())) foundInText = true;
    }
    
    if (foundInText) {
        message.delete();
        message.channel.send(new Discord.MessageEmbed()
      .setDescription(':no_entry: Les insultes sont interdits dans ce serveur !!')
      .setColor(`#ff0000`))
    }
}); 
  
Client.on("message", message => {
    if(message.member.permissions.has("MANAGE_MESSAGES")){
        if(message.content.startsWith(prefix + "clear")){
            let args = message.content.split(" ");
            
            if(args[1] == undefined){
                message.reply(" Nombre de message non ou mal défini.");
            }
            else{
                let number = parseInt(args[1]);
                
                if(isNaN(number)){
                    message.reply("Nombre de message non ou mal défini.");
                }
                else{
                    message.channel.bulkDelete(number).then(messages =>{
                        console.log("clear de" + messages.size + " message reussi ! ");
                    }).catch(err => {
                        console.log("Erreur de clear : " + err);
                    });
                }
            }
        }
    }
});

Client.login(process.env.TOKEN)
