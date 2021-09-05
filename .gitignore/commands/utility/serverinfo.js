const discord = require('discord.js');
const moment = require(`moment`)




module.exports = {
    name: "serverinfo",
    description : 'Info sur le serveur',
    run : async (Client, message, args, prefix) => { // cmd handler
        
        if(!message.member.hasPermission('ADMINISTRATOR'))
        // if someone dont hv perm it will send this message
        message.channel.send("You don't have permission to use that command.");
        else{

            // getting all the roles of the server
        const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString()).slice(0, -1)
    
        // getting all the members of the server
        const members = message.guild.members.cache;
        
        // getting all the channels of the server
        const channels = message.guild.channels.cache;
        
        // getting all the emojis of the server
        const emojis = message.guild.emojis.cache
    
        
        let rolesdisplay;
    
        // if the lenght is lower then 20, display all roles
        if(roles.length < 20) {
            rolesdisplay = roles.join(' ')
        } else {
        
            //if the lenght is more then 20, display only 20
            rolesdisplay = roles.slice(20).join(' ')
        }
    
        // if i typed guild it make ref to message.guild
        const { guild } = message
        
        // tyeping name, region, memberCount, owner isntead of guild.name
        const { name, region, memberCount, owner } = guild
        
        // getting the server's pfp
        const icon = guild.iconURL()
    
        // create an embed
        var serverEmbed = new discord.MessageEmbed()
        .setColor("RANDOM") //sets the color
        
        // sets the title of the embed
        .setTitle(`Server info of ${name}`)
        
        // sets the pic of the embed to the server's pfp
        .setImage(message.guild.iconURL())
        
        // adding a field with the general info
        .addField(`General`, [
            `**Name:** ${name}`, // server name
            `**ID:** ${message.guild.id}`, // server's id
            `**Owner:** ${message.guild.owner.user.tag}`, // server's owner
            `**Boost Tier:** ${message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : 'None'}`, // boost tier
            `**Boost Level:** ${message.guild.premiumSubscriptionCount || '0'}`, // how many times it got boosted
            `**Created At:** ${moment(message.guild.createdTimestamp).format('LT')} ${moment(message.guild.createdTimestamp).format('LL')} ${moment(message.guild.createdTimestamp).fromNow()}`, // when did the server got created 
            '\u200b'
        ])
        
        // adding a field with the stats info
        .addField('Stats', [
            `**Role Count:** ${roles.length}`, // how many roles in the server
            `**Emoji Count:** ${emojis.size}`, // how many emojis
            `**Normal Emoji Count:** ${emojis.filter(emoji => !emoji.animated).size}`, // how many not animated emojis
            `**Animated Emoji Count:** ${emojis.filter(emoji => emoji.animated).size}`, // how many animated emoji
            `**Member Count:** ${message.guild.memberCount}`, // how many members in the server
            `**Humans:** ${members.filter(member => !member.user.bot).size}`, // how many are humans
            `**Bots:** ${members.filter(member => member.user.bot).size}`, // how many are bots
            `**Online:** ${members.filter(member => member.presence.status === 'online').size}`, // how many are online
            `**Offline:** ${members.filter(member => member.presence.status === 'offline').size}`, // how many are offline
            `**Do Not Disturb:** ${members.filter(member => member.presence.status === 'dnd').size}`, // how many have DND
            `**Idle:** ${members.filter(member => member.presence.status === 'idle').size}`, // how many have idle
            `**Text Channels:** ${channels.filter(channel => channel.type === 'text').size}`, // how many text channels
            `**Voice Channels:** ${channels.filter(channel => channel.type === 'voice').size}`, // how many voice channels
            '\u200b'
        ])
        
        // sending the embed
        message.channel.send(serverEmbed)
        }
    }

}

module.exports.help = {
    name: "serverinfo",
    aliases: ['server-info', 'server']
}