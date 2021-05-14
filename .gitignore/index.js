const Discord = require('discord.js');
const prefix = "+";
const Client = new Discord.Client();
const bdd = require("./bdd.json");
const fs = require("fs");
const moment = require ("moment")

// Commande de statut//
Client.on("ready", async () => {
    console.log("Le bot est ON")
    Client.user.setStatus("dnd")
    setTimeout(() => {
        Client.user.setActivity("Regarde " + Client.guilds.cache.size + " serveurs");
    }, 100);
});

// Commande  de clear //
Client.on("message", message => {

    if (message.content.startsWith(`${prefix}clear`)) {
        message.delete();
        if (message.member.hasPermission('MANAGE_CHANNELS')) {

            let args = message.content.trim().split(/ +/g);

            if (args[1]) {
                if (!isNaN(args[1]) && args[1] >= 1 && args[1] <= 99) {

                    message.channel.bulkDelete(args[1])
                    message.channel.send(`Vous a supprimé ${args[1]} messages`).then(m => m.delete({ timeout: 1000 }));

                }
                else {
                    message.channel.send(`Vous devez indiquer une valeur entre 1 et 99 !`).then(m => m.delete({ timeout: 1000 }));

                }
            }
            else {
                message.channel.send(`Vous devez indiquer un nombre de message à supprimer`).then(m => m.delete({ timeout: 1000 }));

            }
        }
        else {
            message.channel.send(`vous devez avoir la permission pour éxécuter cette commande`).then(m => m.delete({ timeout: 1000 }));
        }
    }
});

// Help // Dawn 
Client.on("message", message => {
    if(message.author.bot) return;
    if(message.content.startsWith(prefix + "help")){

        var embed = new Discord.MessageEmbed()
            .setColor("#46b1ec")
            .setTitle("** Dawn **")
            .setDescription("** Voici le menu d'aide que je peux t'apporter **\n\n ** Commande de modération **\n\n **+clear** : pour supprimer un certain nombre de message (max: 99 message).\n\n **+kick** : pour kick un membre du serveur.\n\n **+ban** : pour bannir un membre du serveur.\n\n **+mute** : pour rendre muet un membre du serveur.\n\n **+unmute ** : pour permattre à un membre muet de pourvoir à nouveau parler. \n\n **+tempmute** : rend muet un membre pendant un certain temps (en minute). \n\n ** Commande un peu plus fun** \n\n ** +stat ** : donne ton id. \n\n **+ping** : repond pong. \n\n **+avatar** : met ton avatar en plus grand. \n\n ** +server** : donne des renseignement sur le serveur.\n ")
            .setTimestamp()
        message.channel.send(embed);

    }
});

// Bienvenue // Dawn
Client.on("guildMemberAdd", member => {
    Client.channels.cache.get('839207979864686613').send(`Bienvenue à ${member.user.username} sur ${member.guild} !\n Nous sommes ${member.guild.memberCount} membres `)
});

// Commande de Statistique // Dawn 
Client.on("message", message => {
    if (message.content.startsWith(`${prefix}stats`)) {
        let onlines = message.guild.members.cache.filter(({ presence }) => presence.status !== 'offline').size;
        let totalmembers = message.guild.members.cache.size;
        let totalservers = Client.guilds.cache.size;
        let totalbots = message.guild.members.cache.filter(member => member.user.bot).size;

        const monembed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Statistique')
            .setAuthor('Dawn',)
            .setDescription('Voici les statistiques')
            .setThumbnail('')
            .addFields(
                { name: 'Nombre de membres au total : ', value: totalmembers, inline: true },
                { name: 'Membres connectés : ', value: onlines, inline: true },
                { name: 'Nombre de serveurs auquel le bot appartient : ', value: totalservers, inline: true },
                { name: 'Nombre de bots sur le serveur :', value: totalbots, inline: true },
            )
            .setImage()
            .setTimestamp()

        message.channel.send(monembed);

    }
});

// Commande de Stat user //
Client.on("message", async message => {

    if (message.author.bot) return;

    if (message.content.startsWith(prefix + "info")) {
        if (message.mentions.users.first()) {
            user = message.mentions.users.first();
        } else {
            user = message.author;
        }
        const member = message.guild.member(user);

        const embed = new Discord.MessageEmbed()
            .setColor('#ff5555')
            .setThumbnail(user.avatarURL)
            .setTitle(`Information sur ${user.username}#${user.discriminator} :`)
            .addField('ID du compte:', `${user.id}`, true)
            .addField('Pseudo sur le serveur :', `${member.nickname ? member.nickname : 'Aucun'}`, true)
            .addField('A crée son compte le :', `${moment.utc(user.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, true)
            .addField('A rejoint le serveur le :', `${moment.utc(member.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`, true)
            .addField('Status:', `${user.presence.status}`, true)
            .addField('Roles :', member.roles.cache.map(roles => `${roles.name}`).join(', '), true)
            .addField(`En réponse a :`, `${message.author.username}#${message.author.discriminator}`)
        message.channel.send(embed)
    }
})

// Commande de Warn et de Unwarn //
Client.on("message", message => {
    if (message.content.startsWith(`${prefix}warn`)) {
        if (message.member.hasPermission("BAN_MEMBERS")) {

            if (!message.mentions.users.first()) return;

            utilisateur = message.mentions.users.first().id

            if (bdd["warn"][utilisateur] == 2) {
                message.channel.send(utilisateur + " a été ban suite aux 3 warns")
                delete bdd["warn"][utilisateur]
                message.guild.members.ban(utilisateur)
                Savebdd
            }
            else {
                if (!bdd["warn"][utilisateur]) {
                    bdd[message.guild.id]["warn"][utilisateur] = 1
                    Savebdd();
                    message.channel.send(" tu as à présent " + bdd["warn"][utilisateur] + " avertissement.")
                }
                else {
                    bdd[message.guild.id]["warn"][utilisateur]++
                    Savebdd();
                    message.channel.send("Tu as à présent" + bdd["warn"][utilisateur] + " avertissements.")
                }
            }
        }
        else {
            message.channel.send("Vous n'avez pas les permissions requise pour faire cette action.")
        }
    }
    if (message.content.startsWith(`${prefix}unwarn`)) {
        if (message.member.hasPermission("BAN_MEMBERS")) {

            if (!message.mentions.users.first()) return;
            utilisateur = message.mentions.users.first().id
            delete bdd[message.guild.id]["warn"][utilisateur]
            Savebdd();
            message.channel.send("Tu n'as plus d'avertissement à présent.")

        }
    }
});

// Commande de ticket //
Client.on("message", (message) => {
    if (message.content.startsWith(`${prefix}ticket`))
        if (message.member.hasPermission('ADMINISTRATOR')) {

            const monembedticket = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setAuthor('Kuroko', 'https://i.pinimg.com/236x/ca/ad/13/caad13366c5fb8947cd0331c0087b0d7.jpg')
                .setDescription('Appuie sur la réaction pour créer un ticket \n \ Le salon ticket sera normalemment tout en haut du serveur avec ton nom ')
                .setThumbnail('')
                .setTimestamp()
                .setFooter('');

            message.channel.send(monembedticket).then(m => m.react('🎟️')).then(message.delete({ timeout: 1000 }))

            Client.on("messageReactionAdd", (reaction, user) => {
                if (user.bot) return
                if (reaction.emoji.name == "🎟️") {
                    reaction.message.channel.send('Tu as réagi :🎟️ ').then(m => m.delete({ timeout: 1000 }));

                    var channel_ticket = reaction.message.guild.channels

                    channel_ticket.create(`ticket de ${user.username}`, {
                        type: 'text',
                        permissionOverwrites: [{
                            id: reaction.message.guild.id,
                            deny: ['SEND_MESSAGES'],
                            allow: ['ADD_REACTIONS']
                        }]

                    }).then(channel_ticket => {

                        const ticketlock = new Discord.MessageEmbed()
                            .setColor('#0099ff')
                            .setAuthor('Kuroko', 'https://i.pinimg.com/236x/ca/ad/13/caad13366c5fb8947cd0331c0087b0d7.jpg')
                            .setDescription('Appuie sur la réaction pour créer un ticket \n \ Le salon ticket se fermera tout seul')
                            .setThumbnail('')
                            .setTimestamp()
                            .setFooter('');

                        channel_ticket.send(ticketlock).then(m => m.react('🔒'))
                    })
                }
                Client.on("message", message => {
                    if (message.content === prefix + "close") {
                        if (!message.member.hasPermission("ADMINISTRATOR")) return;
                        message.channel.delete();
                    };
                });
            })

        }
        else {
            message.channel.send("Vous n'avez pas la permission adminitrateur pour faire cette commande")
        }
});

// Commande de Mute, unmute & tempmute, ban // 
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
                mention.roles.add("839506361909248000");
                message.reply(mention.displayName + " mute avec succès.");
            }
        }
        
        if (message.content.startsWith(prefix + "unmute")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Membre non ou mal mentionné.");
            }
            else{
                mention.roles.remove("839506361909248000");
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

                mention.roles.add("839506361909248000");
                setTimeout(function() {
                    mention.roles.remove("839506361909248000");
                    message.channel.send("<@" + mention.id + "> Tu peux désormais de nouveau parler !");
                }, args[2] * 1000 * 60)
            }
        }
    }
});

// Système d'anti-lien //
Client.on('message', async message => {

    let blacklisted = ['discord.gg'];

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

Client.on("guildCreate", guild => {
    bdd[guild.id] = {}
    Savebdd()
});

function Savebdd() {
    fs.writeFile("./bdd.json", JSON.stringify(bdd, null, 4), (err) => {
        if (err) message.channel.send("une erreur est survenue.");
    });
}

Savebdd();

Client.login(process.env.TOKEN)
