# Point-Bot

## Description
This is a Discord bot that allows users to create and manage **toxic** points for other users.

## Setup
1. Clone the repository
2. Install the required packages
   1. `npm install`
3. Create MySQL instance with Docker 
    1. `docker run --name point-bot-db -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password -d mysql` to create the instance
    2. Connect to the instance with your favorite MySQL client to ensure it is running
4. Create a `.env` file in the root directory
    1. Get your Discord bot token from the [Discord Developer Portal](https://discord.com/developers/applications)
        1. Should look like this: `DISCORD_TOKEN=your_token_here` in your .env file
    2. You will also need to add your MySQL database credentials to the .env file
        1. Should look like this: `mysql://user:password@host:port/database` in your .env file
4. Create the database tables/migration
    1. `npx sequelize-cli db:migrate`
5. Run the bot

## Notes
** MUST BE USING NODE VERSION v18.16.1 **