const config = require('./config.js');

var camera = config.debug_mode ? '📷' : '📸';

if (config.debug_mode) {
    console.log(camera + ': Estoy despierto, pero callado');
} else {
    console.log(camera + ': ¡Estoy despierto!');
}

const Discord = require('discord.js');
const client = new Discord.Client();

client.login(config.bot_token)
    .then(() => {

        console.log(camera + ': ¡Estoy conectado!');

        client.channels.fetch(config.valid_channel)
            .then(channel => {
                channel.guild.members.fetch()
                    .then(guildMembers => {
                        guildMembers.each(member => {
                            if (!member.user.bot && member.user.avatar === null) {
                                console.log(camera + ': @' + member.user.username);
                                if (!config.debug_mode) {
                                    channel.send(member.user.toString() + ' ponte foto!!! 📸');
                                }
                            }
                        })
                        client.destroy();
                    })
                    .catch(console.error);
            })
            .catch(console.error);
    });