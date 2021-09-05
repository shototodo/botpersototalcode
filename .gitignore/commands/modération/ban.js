

module.exports = {
  name: 'ban',
  description: 'Ban un membre du serveur.',
  
  run : async (Client, message, args, prefix) => {

    // the perm. that the member need it to ban someone
    if(!message.member.hasPermission('BAN_MEMBERS', 'ADMINISTRATOR'))
    // if someone dont hv perm it will send this message
    message.channel.send("Tu n'as pas la permission pour utiliser cette commande.");
  
    else {
      if (!message.guild) return;
  
      const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  
      if (user) {
  
        const member = message.guild.member(user);
  
        if (member) {
  
          member
  
          // banning code 
            .ban({
                // the reason
              reason: 'They were bad!',
            })
            .then(() => {
            // it will send this message once the person is banned
              message.reply(`${member.user} a bien été ban.`);
            })
            // log err in the console
            .catch(err => {
              // if the bot wasnt able to ban the member bcz he hv a higher role it will not ban him and if the bot dont hv to perm it will not ban him and send this messge
              message.reply(`Je n'arrive pas à le ban. Bizarre...`);
  
              console.error(err);
            });
        } else {
          // if the member isnt in the server and u typed e.g. =ban @karimx it will send this message
          message.reply("Mskn laisse cette personne tranquille il est même pas ici!");
        }
      } else {
       // if u typed =ban without mentioning some1 it will send this message
        message.reply("Sans la mention de la personne ca va être difficile de le ban.");
      }
  };
}
}