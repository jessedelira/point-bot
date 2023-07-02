// import dotenv from "dotenv";
// import { Client, GatewayIntentBits } from "discord.js";
// import { addCommand, execute } from "./commands/add.js";
// import { initCommand, executeInit } from "./commands/init.js";
// dotenv.config();



// const client = new Client({
//   intents: [
//     GatewayIntentBits.Guilds,
//     GatewayIntentBits.GuildMessages,
//     GatewayIntentBits.GuildMembers,
//     GatewayIntentBits.DirectMessages,
//     GatewayIntentBits.MessageContent,
//   ],
// });

// // The ready event is vital, it means that only _after_ this will your bot start reacting to information
// client.on("ready", async () => {
//   const guildId = "206217346388328458";
//   const guild = client.guilds.cache.get(guildId);
//   if (!guild) return console.log(`Guild with ID ${guildId} not found.`);

//   await guild.commands.create(addCommand);
//   await guild.commands.create(initCommand);
// });

// client.on("interactionCreate", async (interaction) => {
//   if (!interaction.isCommand()) return;

//   if (interaction.commandName === "add") {
//     await execute(interaction);
//   }

//   if (interaction.commandName === 'init') {
//     const guildId = "206217346388328458";
//     await executeInit(interaction, guildId, client);
//   }
// });

// // Check to see if the message that was sent by user contains "+" and is not sent by a bot
// client.on("messageCreate", (message) => {
//   if (
//     message.content.includes("help") &&
//     !message.author.bot &&
//     (message.author.username === "diraq" ||
//       message.author.username === "jessedelira")
//   ) {
//     message.channel.send(
//       "To add points to a user, type the following: <@user> +<number of points>"
//     );
//     message.channel.send(
//       "To see the leaderboard, type the following: point leaderboard"
//     );
//     message.channel.send(
//       "To initialize the point system, type the following: init"
//     );
//   }

//   // if (
//   //   message.content.includes("init") &&
//   //   !message.author.bot &&
//   //   (message.author.username === "diraq" ||
//   //     message.author.username === "jessedelira")
//   // ) {
//   //   const guild = client.guilds.cache.get(message.guild.id);

//   //   if (guild) {
//   //     guild.members
//   //       .fetch()
//   //       .then((members) => {
//   //         members.forEach((serverMember) => {
//   //           if (
//   //             checkIfUserExistsInPointSystem(serverMember.user.username) ===
//   //             false
//   //           ) {
//   //             point_system.push({
//   //               username: serverMember.user.username,
//   //               points: 0,
//   //             });
//   //           }
//   //         });
//   //       })
//   //       .catch(console.error);
//   //   }

//   //   message.channel.send(
//   //     "All current members of the server have been added to the point system. Let the toxic competition begin!"
//   //   );
//   //   message.channel.send(
//   //     "https://tenor.com/view/herewego-joker-darkknight-batman-heathledger-gif-5215603"
//   //   ); // Send gif of joker "And. here. we. go!"
//   // }

//   // if (
//   //   message.content.includes("point leaderboard") &&
//   //   !message.author.bot &&
//   //   (message.author.username === "diraq" ||
//   //     message.author.username === "jessedelira")
//   // ) {
//   //   const sortedPointSystem = point_system.sort((a, b) => {
//   //     return b.points - a.points;
//   //   });

//   //   let leaderboard = "";
//   //   sortedPointSystem.forEach((user, index) => {
//   //     leaderboard += `${index + 1}. ${user.username} - ${user.points} points\n`;
//   //   });

//   //   message.channel.send(leaderboard);
//   // } else {
//   //   if (message.content.toLowerCase().includes("+") && !message.author.bot) {
//   //     const messageSplit = message.content.split(" ");
//   //     const preprocessedUserId = messageSplit[0];
//   //     const processedUserId =
//   //       removeExtraInformationOnUserId(preprocessedUserId);

//   //     let points = messageSplit[1].substring(1);
//   //     const guild = client.guilds.cache.get(message.guild.id);

//   //     if (guild) {
//   //       guild.members
//   //         .fetch()
//   //         .then((members) => {
//   //           members.forEach((serverMember) => {
//   //             if (serverMember.user.id === processedUserId) {
//   //               point_system.forEach((user) => {
//   //                 if (serverMember.user.username === user.username) {
//   //                   user.points = user.points + parseInt(points);
//   //                   points = null;
//   //                 }
//   //               });
//   //             }
//   //           });
//   //         })
//   //         .catch(console.error);
//   //     }

//   //     message.channel.send("Points recorded for user: " + preprocessedUserId);
//   //   }
//   // }
// });

// client.login(process.env.DISCORD_TOKEN);
// console.log("Bot is running...");

console.log("Hello World!");