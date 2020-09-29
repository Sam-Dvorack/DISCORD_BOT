const commando = require('discord.js-commando')
const ytdl = require('ytdl-core');

var servers = {};

class stop extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'stop',
			group: 'play',
			memberName: 'stop',
			description: 'stop music'
		});
	}

	run(message, args) {
		message.channel.send("Ending the music play....")

		message.guild.voiceConnection.disconnect();
	}

}

module.exports = stop;