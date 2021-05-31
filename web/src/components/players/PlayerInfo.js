import { Badge, Button, Col, Row, Typography } from "antd";
import { UnorderedListOutlined } from "@ant-design/icons";

const PlayerInfo = ({ player, toggleDrawer }) => {
	return (
		<div className="container-sm">
			<Row align="middle">
				<Col flex={0}>
					<Button
						shape="circle"
						onClick={toggleDrawer}
						icon={<UnorderedListOutlined style={{ color: "#2db7f5" }} />}
					/>
				</Col>
				<Col flex={1}>
					<Typography.Title
						type="secondary"
						level={3}
						style={{ margin: 0, textAlign: "center" }}
					>
						{player?.name}
					</Typography.Title>
				</Col>
				<Col flex={0}>
					<Badge
						count={player?.score}
						overflowCount={999}
						style={{
							color: "dimgrey",
							backgroundColor: "#fff",
							fontSize: "1.5rem",
						}}
						showZero
					/>
				</Col>
			</Row>
		</div>
	);
};

export default PlayerInfo;
