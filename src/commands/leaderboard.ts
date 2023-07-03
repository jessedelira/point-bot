import { SlashCommandBuilder } from 'discord.js';
import { PrismaClient, Member, PointRecord } from '@prisma/client';

const prisma = new PrismaClient();
const leaderboardCommand = new SlashCommandBuilder()
	.setName('leaderboard')
	.setDescription('Show the leaderboard');

const executeLeaderboard = async (interaction: any) => {
	const leaderboard = await getLeaderboard();
	await interaction.reply(leaderboard);
};
const formatDiscordId = (discordId: string) => {
	return `<@${discordId}>`;
};
const getLeaderboard = async () => {
	const resultFromPointRecord = await prisma.pointRecord.groupBy({
		by: ['memberId'],
		_sum: {
			amount: true,
		},
		orderBy: {
			_sum: {
				amount: 'desc',
			},
		},
	});

	const resultFromMember = await prisma.member.findMany({
		where: {
			id: {
				in: resultFromPointRecord.map((record: any) => record.memberId),
			},
		},
	});

	const leaderboard = resultFromPointRecord.map((record: any) => {
		const member = resultFromMember.find(
			(member: any) => member.id === record.memberId,
		);

		return {
			...record,
			member,
		};
	});

	const leaderboardString = leaderboard.map((record: any, index: number) => {
		return `${index + 1}. ${formatDiscordId(record.member.discordId)}: ${
			record._sum.amount
		}`;
	});

	return leaderboardString.join('\n');
};

export { leaderboardCommand, executeLeaderboard };
