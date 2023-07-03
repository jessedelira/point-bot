import { SlashCommandBuilder } from 'discord.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const cooldowns = new Map();
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
			.setRequired(true)
			.setMinValue(1)
			.setMaxValue(100),
	)
	.addStringOption((option) =>
		option
			.setName('reason')
			.setDescription('The reason for adding points')
			.setRequired(false)
			.setMinLength(5),
	);

const execute = async (interaction: any) => {
	const user = interaction.options.getUser('user');
	const username = user.username;
	const points = interaction.options.getInteger('points');
	const reason = interaction.options.getString('reason');

	if (cooldowns.has(user.id)) {
		const expirationTime = cooldowns.get(user.id) + 5000;

		if (Date.now() < expirationTime) {
			const remainingTime = (expirationTime - Date.now()) / 1000;
			await interaction.reply(
				`Please wait ${remainingTime.toFixed(
					1,
				)} more second(s) before reusing the command.`,
			);
			return;
		}
	}

	addPointRecord(username, points, reason);

	// create an interaction replay to user that includes the user points and reason
	await interaction.reply(
		`${points} points added to ${user} for the reason of "${reason}"`,
	);

	cooldowns.set(user.id, Date.now());
	setTimeout(() => cooldowns.delete(user.id), 5000);
};

const addPointRecord = async (
	username: string,
	points: number,
	reason: string,
) => {
	// Find the CUID of the user
	const foundUser = await prisma.member.findUnique({
		where: {
			username: username,
		},
	});
	if (!foundUser) {
		console.log(`User ${username} not found`);
		return;
	}

	const newPointRecord = await prisma.pointRecord.create({
		data: {
			amount: points,
			reason: reason,
			memberId: foundUser.id,
		},
	});
	console.log(`New point record created with ID: ${newPointRecord.id}`);
};

export { addCommand, execute };
