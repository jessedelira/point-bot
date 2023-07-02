import { CacheType, Interaction, SlashCommandBuilder } from 'discord.js';

const addCommand = new SlashCommandBuilder()
	.setName('add')
	.setDescription('Add points to a user')
	.addUserOption((option) =>
		option
			.setName('user')
			.setDescription('The user to add points to')
			.setRequired(true),
	)
	.addIntegerOption((option) =>
		option
			.setName('points')
			.setDescription('The amount of points to add')
			.setRequired(true),
	);

const execute = async (interaction: any) => {
	const user = interaction.options.getUser('user');
	const points = interaction.options.getInteger('points');

	// TODO: Add logic to add points to user here.
	// point_system.forEach((user) => {
	//   if (serverMember.user.username === user.username) {
	//     user.points = user.points + parseInt(points);
	//     points = null;
	//   }
	// });

	await interaction.reply(`${points} points added to ${user.username}`);
};

export { addCommand, execute };
