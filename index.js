require("dotenv").config();
const path = require("path");
const commando = require("discord.js-commando");
const cron = require("node-cron");
const { getPriceFeed } = require("./WebScraper");

const client = new commando.CommandoClient({
  owner: process.env.OWNER,
  commandPrefix: "!",
});

const TOKEN = process.env.TOKEN;

client.login(TOKEN);

client.registry
  .registerGroups([
    ["random", "random commands"],
    ["meme", "meme commands"],
    ["play", "Play commands"],
    ["coin", "Shows coin prices"],
  ])
  .registerDefaults()
  .registerCommandsIn(path.join(__dirname, "commands"));

client.on("ready", () => {
  console.info(`Logged in as ${client.user.tag}!`);

  let MyChannel = client.channels.cache.find(
    (channel) => channel.id === process.env.channel_id
  );

  const task = cron.schedule("3 18 * * *", () => {
    getPriceFeed(MyChannel);
  });

  task.start();
});

client.on("message", (message) => {
  console.log(message.content);
});
