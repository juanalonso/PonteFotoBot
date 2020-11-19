console.log("📸: ¡Estoy despierto!");

const config = require('./config.js');
const Discord = require('discord.js');

const client = new Discord.Client();

client.login(config.bot_token).then(() => {

    console.log('📸: ¡Estoy conectado!');

    client.channels.fetch(config.valid_channels[0])
        .then(channel => {
            channel.guild.members.fetch()
                .then(guildMembers => {
                    guildMembers.each(member => {
                        if (!member.user.bot && member.user.avatar === null) {
                            console.log('📸: @' + member.user.username);
                            channel.send(member.user.toString() + " ponte foto!!! 📸");
                        }
                    })
                })
                .catch(console.error);
        })
        .catch(console.error);

    client.destroy();

});