const config = require('./config.js')

var camera = config.debug_mode ? '📷' : '📸'

if (config.debug_mode) {
    console.log(camera + ': Estoy despierto, pero callado')
} else {
    console.log(camera + ': ¡Estoy despierto!')
}

const Discord = require('discord.js')
const client = new Discord.Client()

client.login(config.bot_token).then(getChannelInfo);


function getChannelInfo() {
    console.log(camera + ': ¡Estoy conectado!')
    client.channels
        .fetch(config.valid_channel)
        .then(channel => getMembers(channel))
        .catch(console.error)
}


function getMembers(channel) {
    channel.guild.members
        .fetch()
        .then(guildMembers => processMembers(guildMembers, channel))
        //.then(client.destroy())
        .catch(console.error)
}


function processMembers(guildMembers, channel) {
    guildMembers
        .filter(member => !member.user.bot)
        .filter(member => member.user.avatar === null)
        .each(member => {
            console.log(camera + ':     @' + member.user.username)
            if (!config.debug_mode) {
                channel.send(member.user.toString() + ' ponte foto!!! 📸')
            }
        })
    console.log(camera + ': Hasta mañana')
}