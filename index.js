require('dotenv').config();
const path = require('path')
const commando = require('discord.js-commando')

const client = new commando.CommandoClient({
	owner: process.env.OWNER,
	commandPrefix: '!'
});

const TOKEN = process.env.TOKEN;

client.login(TOKEN);

client.registry.registerGroups([
	['random', 'random commands'],
	['meme', 'meme commands'],
	['play', 'Play commands']
]).registerDefaults()
	.registerCommandsIn(path.join(__dirname, 'commands'));

client.on('ready', () => {
	console.info(`Logged in as ${client.user.tag}!`);
});