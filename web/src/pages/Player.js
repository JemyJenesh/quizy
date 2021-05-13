import React, { useEffect, useState } from "react";
import { Row, Col, Button, Progress, Tag, Typography, Space } from "antd";
import { PlayerInfo, PlayersList } from "components";
import { useParams } from "react-router";
import { axios } from "utils/axios";

const Player = ({ history }) => {
	const { quizId, playerId } = useParams();
	const [player, setPlayer] = useState(null);

	useEffect(() => {
		axios(`/players/${playerId}`)
			.then((res) => {
				if (res.status === 200) {
					setPlayer(res.data);
				}
			})
			.catch((err) => {
				if (err.response) {
					if (err.response.status === 404) {
						history.push("/");
					}
				}
			});
	}, [playerId]);

	return (
		<div style={styles.container}>
			<Row gutter={12}>
				<Col span={5}>
					<PlayersList quizId={quizId} />
				</Col>
				<Col span={14}>
					<Space direction="vertical" align="center" style={styles.fill}>
						<Progress
							type="circle"
							percent={75}
							format={(percent) => `${percent} s`}
						/>
						<Typography.Title level={1} style={styles.text}>
							What is the height of Mt. Everest?
						</Typography.Title>
						<Tag color="geekblue">General</Tag>
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
						<Space>
							<Button key="pass">Pass</Button>
							<Button type="primary" key="submit">
								Submit
							</Button>
						</Space>
					</Space>
				</Col>
				<Col span={5}>
					<PlayerInfo player={player} />
				</Col>
			</Row>
		</div>
	);
};

const styles = {
	container: {
		padding: "1rem",
	},
	text: {
		margin: "1rem 0 0 0",
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
		padding: "1rem",
		fontSize: "2rem",
		marginBottom: "2rem",
	},
};

export default Player;
