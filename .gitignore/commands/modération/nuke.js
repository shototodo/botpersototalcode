module.exports = {
    name : 'nuke',
    description : 'Reset le channel.',
    run : async (Client, message, args, prefix) => {
    
        // if the member don't have this perm return by sending this msg
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Tu n'as pas la permission pour utiliser cette commande.")
    
        // getting the channel's id that is gonna be nuked
        var channel = Client.channels.cache.get(message.channel.id)
    
        // getting the position of the channel by the category
        var posisi = channel.position
    
       // clonning the channel
        channel.clone().then((channel2) => {
            
            // sets the position of the new channel
            channel2.setPosition(posisi)
    
            // deleting the nuked channel
            channel.delete()
    
            // sending a msg in the new channel
            channel2.send(`Boom...`).then(
              
                // sends a GIF in the new channel
                channel2.send(`https://c.tenor.com/lMZjKoeGHdUAAAAC/missile-explosion.gif`)
            )
        })
    }
}