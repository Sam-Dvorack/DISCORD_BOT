const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");

const { MessageEmbed } = require("discord.js");

const getPriceFeed = async (message) => {
  try {
    const url = "https://coinmarketcap.com/";
    const { data } = await axios({ method: "GET", url: url });

    const $ = cheerio.load(data);
    const elementSel =
      "#__next > div > div.main-content > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div:nth-child(1) > div.h7vnx2-1.bFzXgL > table > tbody > tr";

    const keys = [
      "rank",
      "name",
      "price",
      "24h",
      "7d",
      "marketCap",
      "volume",
      "circulatingSupply",
    ];

    const coinArray = [];

    $(elementSel).each((parentIdx, parentElem) => {
      let keyIdx = 0;
      const coinObj = {};

      if (parentIdx <= 9) {
        $(parentElem)
          .children()
          .each((childIdx, ChildElem) => {
            let tdValue = $(ChildElem).text();

            if (keyIdx == 1 || keyIdx == 0) {
              tdValue = $("p:first-child", $(ChildElem).html()).text();
            }

            if (tdValue) {
              coinObj[keys[keyIdx]] = tdValue;
              keyIdx++;
            }
          });

        coinArray.push(coinObj);
      }
    });

    // coinArray.forEach((coin) => {
    //   //   message.reply(coin.name + " " + coin.price);
    // });
    // console.log(coinArray);
    let Fields = coinArray.map((coin) => {
      return { name: coin.name, value: coin.price, inline: true };
    });

    console.log(x);
    const exampleEmbed = new MessageEmbed()
      .setColor("#0099ff")
      .setThumbnail(
        "https://www.europeanbusinessreview.com/wp-content/uploads/2021/07/cryptocurrency-696x465.jpg"
      )
      .setURL("https://coinmarketcap.com/")
      .setTitle("Cryptocurrency Prices")
      .setDescription("Today's Cryptocurrency Prices by Market Cap")
      .addFields(...Fields)
      .setImage(
        "https://www.europeanbusinessreview.com/wp-content/uploads/2021/07/cryptocurrency-696x465.jpg"
      )
      .setTimestamp()
      .setFooter(
        "Cryptocurrency Prices",
        "https://www.europeanbusinessreview.com/wp-content/uploads/2021/07/cryptocurrency-696x465.jpg"
      );

    message.reply(exampleEmbed);
    // console.log(coinArray);
  } catch (error) {}
};

module.exports = { getPriceFeed };
