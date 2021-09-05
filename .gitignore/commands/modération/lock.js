const discord = require('discord.js')

module.exports = {
    name: 'lock',
    description : "Avatar d'un membre du serveur.",
    run : async (Client, message, args, prefix) => {
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("Tu n'as pas la permission pour utiliser cette commande!")
    
        let msg = await message.channel.send("Loading...")
    
        try {
            message.channel.updateOverwrite(message.guild.roles.cache.find(e => e.name.toLowerCase().trim() == "@everyone"), {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false
            })
            msg.edit("Channel lock parfaitement!")
        }catch(e) {
            console.log(e)
        }
    }
}