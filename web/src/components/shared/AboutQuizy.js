import { Card, Col, Timeline, Typography } from "antd";
import {
	GiftOutlined,
	BellOutlined,
	ExperimentOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";

const iconStyle = {
	fontSize: "1.25rem",
};

const itemStyle = {
	padding: 0,
};

const gridStyle = {
	width: "100%",
	marginBottom: "1rem",
};

const AboutQuizy = () => {
	return (
		<>
			<Col span={8} style={{ padding: "2rem" }}>
				<Card.Grid style={gridStyle}>
					<Typography.Title level={2}>About Quizy</Typography.Title>
					<Typography.Text>
						Quizy is a quiz application where you can create quiz and play with
						your team. It lets you create categories, questions and let other
						join quiz. It has real time score system.
					</Typography.Text>
				</Card.Grid>
				<Card.Grid style={gridStyle}>
					<Typography.Title level={2}>How to host a quiz</Typography.Title>
					<Typography.Text>
						First you have to create an account in Quizy. To create one, go to{" "}
						<NavLink to="/register">register</NavLink>. After you register,{" "}
						<NavLink to="/login">login</NavLink>. You can now create categories,
						questions and quiz. Create a quiz with questions and host the quiz.
					</Typography.Text>
				</Card.Grid>
				<Card.Grid style={gridStyle}>
					<Typography.Title level={2}>How to join a quiz</Typography.Title>
					<Typography.Text>
						Any hosted quiz has a unique pin. You can join just by using the
						pin. To join, go to <NavLink to="/">home</NavLink> on the right you
						have a <b>Join quiz</b> section where you can submit your name and
						pin.
					</Typography.Text>
				</Card.Grid>
			</Col>
			<Col span={8} style={{ padding: "2rem" }}>
				<Timeline>
					<Timeline.Item
						color="green"
						dot={<GiftOutlined style={iconStyle} />}
						style={itemStyle}
					>
						<p>What's new?</p>
						<Timeline>
							<Timeline.Item>New flawless UI</Timeline.Item>
							<Timeline.Item>New pass option</Timeline.Item>
							<Timeline.Item>Wrong answer negative marking</Timeline.Item>
							<Timeline.Item style={itemStyle}>
								Option to kick player
							</Timeline.Item>
						</Timeline>
					</Timeline.Item>
					<Timeline.Item
						color="blue"
						dot={<BellOutlined style={iconStyle} />}
						style={itemStyle}
					>
						<p>What's coming?</p>
						<Timeline>
							<Timeline.Item color="red">
								Import questions from excel
							</Timeline.Item>
							<Timeline.Item color="red">
								Import categories from excel
							</Timeline.Item>
							<Timeline.Item color="red">Order player position</Timeline.Item>
							<Timeline.Item color="red" style={itemStyle}>
								Quiz settings
							</Timeline.Item>
						</Timeline>
					</Timeline.Item>
					<Timeline.Item
						color="red"
						dot={<ExperimentOutlined style={iconStyle} />}
						style={itemStyle}
					>
						<p>Additional ideas</p>
						<Timeline>
							<Timeline.Item color="grey">Mobile app</Timeline.Item>
							<Timeline.Item color="grey">Buzzer round</Timeline.Item>
							<Timeline.Item color="grey" style={itemStyle}>
								QR code for joining quiz
							</Timeline.Item>
						</Timeline>
					</Timeline.Item>
				</Timeline>
			</Col>
		</>
	);
};

export default AboutQuizy;
