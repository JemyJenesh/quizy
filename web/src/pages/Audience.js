import React from "react";
import { Row, Col, Progress, Tag, Typography, Space } from "antd";
import { PlayersList } from "components";
import { useParams } from "react-router";

const Audience = () => {
	const { quizId } = useParams();
	return (
		<div style={styles.container}>
			<Row gutter={12}>
				{/* <Col span={5}>
					<PlayersList quizId={quizId} />
				</Col> */}
				<Col span={24}>
					<Space direction="vertical" align="center" style={styles.fill}>
						<Typography.Title level={1} style={styles.text}>
							What is the height of Mt. Everest? Lorem ipsum dolor sit amet
							consectetur adipisicing elit. Voluptates perferendis quia dolore
							reiciendis, aperiam alias nobis labore quo optio possimus.
						</Typography.Title>
						<Tag color="geekblue" style={styles.category}>
							General
						</Tag>
						<Row style={styles.optionsContainer} gutter={12}>
							<Col span={12}>
								<Tag style={styles.option}>8848 mt.</Tag>
							</Col>
							<Col span={12}>
								<Tag style={styles.option}>8848 mt.</Tag>
							</Col>
							<Col span={12}>
								<Tag style={styles.option}>8848 mt.</Tag>
							</Col>
							<Col span={12}>
								<Tag style={styles.option}>8848 mt.</Tag>
							</Col>
						</Row>
						<Progress
							type="circle"
							percent={75}
							format={(percent) => <h1 style={styles.time}>{`${percent}`}</h1>}
						/>
					</Space>
				</Col>
			</Row>
		</div>
	);
};

const styles = {
	container: {
		padding: "1rem",
	},
	time: {
		margin: 0,
	},
	text: {
		textAlign: "center",
		margin: "1rem 0",
	},
	category: {
		fontSize: "2rem",
		padding: "1rem",
	},
	fill: {
		width: "100%",
	},
	optionsContainer: {
		width: "100%",
		marginTop: "2rem",
	},
	option: {
		width: "100%",
		padding: "2rem",
		fontSize: "2.5rem",
		marginBottom: "2rem",
		textAlign: "center",
	},
};

export default Audience;
