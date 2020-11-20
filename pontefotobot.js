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
        .catch(console.error)
}


function processMembers(guildMembers, channel) {
    var message = '';
    guildMembers
        .filter(member => !member.user.bot)
        .filter(member => member.user.avatar === null)
        .each(member => {
            message += member.user.toString() + ' ponte foto!!! 📸\n'
            console.log(camera + ':     @' + member.user.username)
        })
    if (!config.debug_mode && message !== '') {
        channel.send(message)
            .then(() => client.destroy())
            .catch(console.error)
    } else {
        console.log(camera + ': Hasta mañana')
        client.destroy()
    }
}