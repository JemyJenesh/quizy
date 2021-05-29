import { Badge, List } from "antd";

const positionColor = (index) =>
	["#52c41a", "#108ee9", "maroon", "#ccc"][index < 3 ? index : 3];

const PlayersScoreboard = ({ players, currentPlayerId }) => {
	return (
		<List
			size="small"
			loading={!players}
			itemLayout="horizontal"
			dataSource={players}
			renderItem={(player, index) => (
				<List.Item
					style={{
						background:
							player.id.toString() === currentPlayerId.toString()
								? "#E6F7FF"
								: "#fff",
					}}
					extra={player.score}
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
