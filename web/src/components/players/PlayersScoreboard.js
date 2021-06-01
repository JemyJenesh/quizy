import { Badge, List, Typography } from "antd";

const positionColor = (index) =>
	["#52c41a", "#108ee9", "maroon", "#ccc"][index < 3 ? index : 3];

const PlayersScoreboard = ({ players, currentPlayerId, size = "small" }) => {
	return (
		<List
			size={size}
			loading={!players}
			itemLayout="horizontal"
			dataSource={players}
			renderItem={(player, index) => (
				<List.Item
					style={{
						background:
							player.id.toString() === currentPlayerId?.toString()
								? "#E6F7FF"
								: "#fff",
						fontSize: size !== "small" ? "2rem" : "1rem",
						lineHeight: size !== "small" ? "2rem" : "1rem",
					}}
					extra={player.score}
				>
					<List.Item.Meta
						avatar={
							<Badge
								style={{
									backgroundColor: positionColor(index),
									fontSize: size !== "small" ? "2rem" : "1rem",
									height: size !== "small" ? "2.2rem" : "1.1rem",
									lineHeight: size !== "small" ? "2.2rem" : "1.1rem",
									padding: size !== "small" ? "0 10px" : "0 6px",
								}}
								count={index + 1}
								showZero
								overflowCount={999}
							/>
						}
						title={
							size !== "small" ? (
								<Typography.Title level={2} style={{ margin: 0 }}>
									{player.name}
								</Typography.Title>
							) : (
								player.name
							)
						}
					/>
				</List.Item>
			)}
		/>
	);
};

export default PlayersScoreboard;
