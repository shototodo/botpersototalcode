
module.exports = {
  name: 'kick',
  description: 'Kick un membre du serveur.',
  
  run : async (Client, message, args, prefix) => {

    // the perm. that the member need it to ban someone
    if(!message.member.hasPermission('KICK_MEMBERS', 'ADMINISTRATOR'))
    // if someone dont hv perm it will send this message
    message.channel.send("Tu n'as pas la permission pour utiliser cette commande.");
  
    else {
      if (!message.guild) return;
  
      const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  
      if (user) {
  
        const member = message.guild.member(user);
  
        if (member) {
  
          member
  
          // kick code 
            .kick({
                // the reason
              reason: 'They were bad!',
            })
            .then(() => {
            // it will send this message once the person is kicked
              message.reply(`${member.user} a bien été kick.`);
            })
            // log err in the console
            .catch(err => {
              // if the bot wasnt able to kick the member bcz he hv a higher role it will not kick him and if the bot dont hv to perm it will not kick him and send this messge
              message.reply(`Je n'arrive pas à le kick. Bizarre...`);
  
              console.error(err);
            });
        } else {
          // if the member isnt in the server and u typed e.g. =kick @karimx it will send this message
          message.reply("That user isn't in this guild!");
        }
      } else {
       // if u typed =kick without mentioning some1 it will send this message
        message.reply("Sans la mention de la personne ca va être difficile de le kick.");
      }
  };
  }
}  