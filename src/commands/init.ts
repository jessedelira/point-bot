import { SlashCommandBuilder } from 'discord.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const initCommand = new SlashCommandBuilder()
	.setName('init')
	.setDescription('Initialize server for point system');

const executeInit = async (interaction: any, guildId: string, client: any) => {
	const guild = client.guilds.cache.get(guildId);

	// TODO: You will need to check existing if users exist in the point system before adding them.
	if (guild) {
		guild.members
			.fetch()
			.then((members: any) => {
				members.forEach((serverMember: any) => {
					// serverMember = Id of the user with @
					// serverMember.user = Id of the user with @
					addMember(
						serverMember.user.username,
						0,
						serverMember.user.id,
					);
				});
			})
			.catch(console.error); // Will error out here if you try to /init twice
	}

	await interaction.reply(
		'All current members of the server have been added to the point system. Let the toxic competition begin!' +
			'\n' +
			'https://tenor.com/view/herewego-joker-darkknight-batman-heathledger-gif-5215603',
	);
};

export { initCommand, executeInit };

const addMember = async (
	username: string,
	strikes: number,
	discordId: string,
) => {
	const newMember = await prisma.member.create({
		data: {
			username,
			strikes,
			discordId,
		},
	});
	console.log(`New member created with ID: ${newMember.id}`);
};
