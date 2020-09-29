const commando = require('discord.js-commando')
const ytdl = require('ytdl-core');

//var servers = {};

class skip extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'skip',
			group: 'play',
			memberName: 'skip',
			description: 'skip music from YouTube'
		});
	}

	run(message, args, ops) {
		// const serverQueue = queue.get(message.guild.id);

		// serverQueue.songs.shift();

		// message.channell.send('Skipping the song...');

		var server = servers[message.guild.id];
		if (server.dispatcher) server.dispatcher.end();
	}

}

module.exports = skip;