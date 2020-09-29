const commando = require('discord.js-commando')
const ytdl = require('ytdl-core');

var servers = {};

class playing extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'play',
			group: 'play',
			memberName: 'play',
			description: 'Play music from YouTube'
		});
	}

	run(message, args) {
		function parseVimeoUrl(url) {
			var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/,
				match = args.match(regExp);

			return match ? match[3] : false;
		}

		const valid = parseVimeoUrl(args)

		if (valid === false) {
			message.channel.send("Please provide a valid YouTube link");
			return;
		}

		function play(connection, message) {
			var server = servers[message.guild.id]

			server.dispatcher = connection.playStream(ytdl(server.queue[0], { filter: "audioonly" }));

			server.queue.shift();

			server.dispatcher.on("end", function () {
				if (server.queue[0]) {
					play(connection, message);
				} else {
					connection.disconnect();
				}
			});
		}

		if (!args) {
			message.channel.send("Please provide a YouTube link");
			return;
		}



		if (!message.member.voiceChannel) {
			message.channel.send("You must be in a voice channel to play the bot!");
			return;
		}

		if (!servers[message.guild.id])
			servers[message.guild.id] = {
				queue: []
			}

		var server = servers[message.guild.id];

		server.queue.push(args);

		if (!message.guild.voiceConnection)
			message.member.voiceChannel.join()
				.then(function (connection) {
					play(connection, message);
				})
	}
}

module.exports = playing;