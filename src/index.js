import dotenv from "dotenv";
dotenv.config();

import { Client, GatewayIntentBits } from "discord.js";

const point_system = [
    {
        "username": "jessedelira",
        "points": 0
    }
]

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Check to see if the message that was sent by user contains "+" and is not sent by a bot
client.on("messageCreate", (message) => {
  // Check if the message contains "hello" and is not sent by a bot
  if (message.content.toLowerCase().includes("+") && !message.author.bot) {
    // message will look like this "@user +2"
    const messageContent = message.content;
    // split the message by spaces
    const messageSplit = messageContent.split(" ");
    // get the username of the user that sent the message
    const username = messageSplit[0];
    // get the number of points to add to the user
    const points = messageSplit[1];

    console.log(username);
    console.log(points)

    const guild = client.guilds.cache.get(message.guild.id);

    if (guild) {
        guild.members.fetch().then(members => {
          members.forEach(member => {
            console.log(member.user.username)
            console.log(member.user.id)
          });
        }).catch(console.error);
      }

    // send message to just the channel that the message was sent in
    message.channel.send("Hello there!");
  }
});

client.login(process.env.DISCORD_TOKEN);
console.log("Bot is running...");
