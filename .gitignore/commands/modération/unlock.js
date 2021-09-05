const discord = require('discord.js')

module.exports = {
    name: 'unlock',
    description : "Avatar d'un membre du serveur.",
    run : async (Client, message, args, prefix) => {
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("You don't have permission to do this command!")
    
        let msg = await message.channel.send("Loading...")
    
        try {
            message.channel.updateOverwrite(message.guild.roles.cache.find(e => e.name.toLowerCase().trim() == "@everyone"), {
                SEND_MESSAGES: true,
                ADD_REACTIONS: true
            })
            msg.edit("Successfully unlocked the channel!")
        }catch(e) {
            console.log(e)
        }
    }
}