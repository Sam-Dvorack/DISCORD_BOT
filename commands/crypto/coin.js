const commando = require("discord.js-commando");
const Scraper = require("../../WebScraper");

class DiceRollCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: "coin",
      group: "coin",
      memberName: "coin",
      description: "Shows coin prices",
    });
  }

  async run(message, args) {
    Scraper.getPriceFeed(message);
  }
}

module.exports = DiceRollCommand;
