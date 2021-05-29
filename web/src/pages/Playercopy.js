import {
	Badge,
	Button,
	Col,
	Divider,
	Drawer,
	Progress,
	Row,
	Typography,
	List,
	Table,
	Tag,
	Space,
} from "antd";
import { UnorderedListOutlined } from "@ant-design/icons";
import { useState } from "react";

const positionColor = (index) =>
	["#52c41a", "#108ee9", "maroon", "#aaa"][index < 3 ? index : 3];

const Player = () => {
	const [open, setOpen] = useState(false);
	const toggleOpen = () => setOpen(!open);
	const data = [
		{
			key: "0",
			name: "Jane Doe",
			score: 55,
		},
		{
			key: "1",
			name: "John Brown",
			score: 30,
		},
		{
			key: "2",
			name: "Jim Green",
			score: 20,
		},
		{
			key: "3",
			name: "Joe Black",
			score: 15,
		},
	];
	return (
		<div>
			<Drawer
				placement="bottom"
				visible={open}
				onClose={toggleOpen}
				height="100%"
				title="Scoreboard"
			>
				<List
					size="small"
					header={
						<div
							style={{
								width: "100%",
								display: "flex",
								justifyContent: "space-between",
								padding: "0 1rem",
							}}
						>
							<span>Players</span>
							<span>Score</span>
						</div>
					}
					dataSource={data}
					renderItem={(item, i) => (
						<List.Item extra={item.score}>
							<List.Item.Meta
								avatar={
									<Badge
										style={{
											backgroundColor: positionColor(i),
										}}
										count={++i}
										overflowCount={999}
									/>
								}
								title={item.name}
							/>
						</List.Item>
					)}
				></List>
			</Drawer>
			<div
				style={{
					display: "flex",
					padding: "0.5rem 1.5rem",
					alignItems: "center",
				}}
			>
				<Progress percent={50} showInfo={false} />
				<div
					style={{
						width: "3rem",
						textAlign: "end",
						display: "flex",
						alignItems: "flex-end",
						justifyContent: "flex-end",
					}}
				>
					<Badge
						style={{
							backgroundColor: "#fff",
							color: "#000",
							fontSize: "1rem",
							height: "1.5rem",
							lineHeight: "1.5rem",
							padding: 0,
						}}
						count={16}
						overflowCount={999}
					/>
					s
				</div>
			</div>
			<Divider className="m-0" />
			<div className="container" style={{ backgroundColor: "#f9f9f9" }}>
				<Row justify="space-between" align="middle">
					<Col flex={0}>
						<Button
							shape="circle"
							icon={<UnorderedListOutlined />}
							onClick={toggleOpen}
						/>
					</Col>
					<Col flex={1}>
						<Typography.Title
							level={4}
							style={{ margin: 0, textAlign: "center" }}
						>
							Team A
						</Typography.Title>
					</Col>
					<Col flex={0}>
						<Badge
							key="score"
							style={{
								backgroundColor: "transparent",
								color: "#000",
								fontSize: "1rem",
								padding: 0,
								verticalAlign: "bottom",
								border: 0,
								boxShadow: "none",
							}}
							count={0}
							showZero
							overflowCount={999}
						/>
					</Col>
				</Row>
			</div>
		</div>
	);
};

export default Player;
