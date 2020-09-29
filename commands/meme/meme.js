const commando = require('discord.js-commando');
const fetch = require('node-fetch');
class meme extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'meme',
			group: 'meme',
			memberName: 'meme',
			description: 'Generate a random meme'
		});
	}

	async run(message, args) {
		let memeArray = []
		let memeDescription = []
		let NumMemes = 0

		fetch('https://api.imgflip.com/get_memes', {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		})
			.then(res => res.json())
			.then(json => {
				json.data.memes.map(memes => {
					memeArray.push(memes.url);
					memeDescription.push(memes.name)
				})

				NumMemes = memeArray.length - 1

				var randomMeme = Math.floor(Math.random() * NumMemes) + 1;

				message.reply(`${memeDescription[randomMeme]}`,
					{
						files:
							[`${memeArray[randomMeme]}`]
					});
			});
	}
}

module.exports = meme;