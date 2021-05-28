import { Badge, List } from "antd";
import { usePlayersRealtime } from "hooks";

const positionColor = (index) =>
	["#52c41a", "#108ee9", "maroon", "#ccc"][index < 3 ? index : 3];

const PlayersScoreboard = ({ title = null, quizId }) => {
	const { isLoading, players } = usePlayersRealtime(quizId);

	return (
		<List
			header={title}
			loading={isLoading}
			itemLayout="horizontal"
			dataSource={players}
			bordered={!!title}
			renderItem={(player, index) => (
				<List.Item
					extra={
						<Badge
							count={player.score}
							showZero
							overflowCount={999}
							style={{
								color: "dimgrey",
								backgroundColor: "#fff",
								fontSize: "1rem",
							}}
						/>
					}
				>
					<List.Item.Meta
						avatar={
							<Badge
								style={{
									backgroundColor: positionColor(index),
								}}
								count={index + 1}
								showZero
								overflowCount={999}
							/>
						}
						title={player.name}
					/>
				</List.Item>
			)}
		/>
	);
};

export default PlayersScoreboard;
