import { List, Typography } from "antd";

const PlayerInfo = ({ player }) => {
	return (
		<List
			size="small"
			header={
				<Typography.Title level={5} style={{ margin: 0 }}>
					{player?.name} (You)
				</Typography.Title>
			}
			bordered
			loading={!player}
		>
			{/* <List.Item actions={[<Typography.Text>20</Typography.Text>]}>
				Attempts
			</List.Item>
			<List.Item
				actions={[<Badge count={10} style={{ backgroundColor: "#52c41a" }} />]}
			>
				Correct answers
			</List.Item>
			<List.Item
				actions={[<Badge count={10} style={{ backgroundColor: "#1890FF" }} />]}
			>
				Bonus Score
			</List.Item> */}
			<List.Item actions={[<Typography.Text>{player?.score}</Typography.Text>]}>
				Score
			</List.Item>
		</List>
	);
};

export default PlayerInfo;
