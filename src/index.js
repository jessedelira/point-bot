import dotenv from "dotenv";
dotenv.config();

import { Client, GatewayIntentBits } from "discord.js";

const point_system = [
  {
    username: "jessedelira",
    points: 0,
  },
];

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
    const messageSplit = message.content.split(" ");
    const usernameBeingGivenPoints = messageSplit[0];
    // remove first two characters from usernameBeingGivenPoints
    const usernameBeingGivenPointsWithoutPlus =
      usernameBeingGivenPoints.substring(2);
    const test = usernameBeingGivenPointsWithoutPlus.slice(0, -1);
    const points = messageSplit[1].substring(1);
    const guild = client.guilds.cache.get(message.guild.id);

    console.log("User id being assigned points", test);
    console.log("User points being assigned", points);

    if (guild) {
      guild.members
        .fetch()
        .then((members) => {
          members.forEach((member) => {
            console.log(member.user.id);
            console.log(test);
            if (member.user.id == test) {
              point_system.forEach((user) => {
                if (user.username === member.user.username) {
                  user.points = user.points + parseInt(points);
                }
              });
            } else {
              point_system.push({
                username: member.user.username,
                points: 0,
              });
            }

            // console.log(member.user.username);
            // console.log(member.user.id);
          });
        })
        .catch(console.error);
    }
    console.log("This is a test commit");
    console.log(point_system);
    // send message to just the channel that the message was sent in
    message.channel.send("Points recorded for user id: " + test);
  }
});

client.login(process.env.DISCORD_TOKEN);
console.log("Bot is running...");
