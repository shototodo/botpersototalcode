
const { Message } = require('discord.js')

module.exports = {
    name : 'addrole',
    description : 'Ajouter un role à un membre',
    run : async(client, message, args, id) => {
        //lets use parameters (optional)
        /**
         * @param {Message} message
         */
        //so firstly we will check whether the author of the message has permissions
        //this line means if the author doesn't have manage roles permission it will stop the process and send the following text
        if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send('You do not have permission.')
        //next we define some variables
        const target = message.mentions.members.first() //member = mentions
        if(!target) return message.channel.send('Membre non mentionné') //when no member is pinged
        const role = message.mentions.roles.first() // roles = mentions
        const role2 = roles.id.first()
        if(!role) return message.channel.send('Rôle non mentionné') //when no role is specified or pinged
        //now the code!
        await target.roles.add(role) // adding the role to the user
        message.channel.send(`${target.user.username} a obtenu ${role}`)

        if(!role2) return message.channel.send('') //when no role is specified or pinged
        //now the code!
        await target.roles.add(role2) // adding the role to the user
        message.channel.send(`${target.user.username} a obtenu ${role2}`)
    }
}