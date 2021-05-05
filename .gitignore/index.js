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
