import dotenv from "dotenv";
dotenv.config();

import { Client, GatewayIntentBits } from "discord.js";

const point_system = [];

const checkIfUserExistsInPointSystem = (username) => {
  let userExists = false;
  point_system.forEach((user) => {
    if (user.username === username) {
      userExists = true;
    }
  });
  return userExists;
};

const removeExtraInformationOnUserId = (preprocessedUserId) => {
  // remove first two characters from user id
  const usernameBeingGivenPointsWithoutPlus = preprocessedUserId.substring(2);
  // remove last character from user id
  const userGivenPointsId = usernameBeingGivenPointsWithoutPlus.slice(0, -1);
  return userGivenPointsId;
};

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
  if (message.content.includes("help") && !message.author.bot) {
    message.channel.send(
      "To add points to a user, type the following: <@user> +<number of points>"
    );
    message.channel.send(
      "To see the leaderboard, type the following: point leaderboard"
    );
    message.channel.send(
      "To initialize the point system, type the following: init"
    );
  }

  if (message.content.includes("init") && !message.author.bot) {
    const guild = client.guilds.cache.get(message.guild.id);

    if (guild) {
      guild.members
        .fetch()
        .then((members) => {
          members.forEach((serverMember) => {
            if (
              checkIfUserExistsInPointSystem(serverMember.user.username) ===
              false
            ) {
              point_system.push({
                username: serverMember.user.username,
                points: 0,
              });
            }
          });
        })
        .catch(console.error);
    }

    message.channel.send(
      "All current members of the server have been added to the point system. Let the toxic competition begin!"
    );
    message.channel.send(
      "https://tenor.com/view/herewego-joker-darkknight-batman-heathledger-gif-5215603"
    ); // Send gif of joker "And. here. we. go!"
  }

  if (message.content.includes("point leaderboard") && !message.author.bot) {
    const sortedPointSystem = point_system.sort((a, b) => {
      return b.points - a.points;
    });

    let leaderboard = "";
    sortedPointSystem.forEach((user, index) => {
      leaderboard += `${index + 1}. ${user.username} - ${user.points} points\n`;
    });

    message.channel.send(leaderboard);
  } else {
    if (message.content.toLowerCase().includes("+") && !message.author.bot) {
      const messageSplit = message.content.split(" ");
      const preprocessedUserId = messageSplit[0];
      const processedUserId =
        removeExtraInformationOnUserId(preprocessedUserId);

      let points = messageSplit[1].substring(1);
      const guild = client.guilds.cache.get(message.guild.id);

      if (guild) {
        guild.members
          .fetch()
          .then((members) => {
            members.forEach((serverMember) => {
              if (serverMember.user.id === processedUserId) {
                point_system.forEach((user) => {
                  if (serverMember.user.username === user.username) {
                    user.points = user.points + parseInt(points);
                    points = null;
                  }
                });
              }
            });
          })
          .catch(console.error);
      }

      message.channel.send("Points recorded for user: " + preprocessedUserId);
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
console.log("Bot is running...");
