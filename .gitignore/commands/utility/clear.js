module.exports = {
    name : 'clear',
    aliases : ['purge'],
    description : 'Supprimer un certain nombre de message.',
    run : async(client, message, args) => {
        if(message.member.permissions.has("MANAGE_MESSAGES")){
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
                            console.log("clear de " + messages.size + " message reussi ! ");
                    }).catch(err => {
                            console.log("Erreur de clear : " + err);
                    });
                }
            }
        }
    }
}
