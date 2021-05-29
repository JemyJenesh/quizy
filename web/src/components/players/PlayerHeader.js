import { Row, Col, Progress, Typography, Divider, Badge } from "antd";
import { config } from "common";
import { If } from "components";

const PlayerHeader = ({ hasEnded, question, quiz, time }) => {
	return (
		<div>
			<div className="container">
				<Row>
					<If when={hasEnded}>
						<Col xs={24}>
							<Progress
								percent={100}
								status="success"
								size="small"
								showInfo={false}
							/>
							<Typography.Title
								level={5}
								className="text-center"
								style={{ margin: 0 }}
							>
								Quiz ended!
							</Typography.Title>
						</Col>
					</If>
					<If when={!hasEnded}>
						<If when={question}>
							<Col flex={1}>
								<Progress
									percent={
										100 -
										(((quiz?.is_passed
											? config.PASS_COUNTDOWN
											: config.COUNTDOWN) -
											time) /
											(quiz?.is_passed
												? config.PASS_COUNTDOWN
												: config.COUNTDOWN)) *
											100
									}
									showInfo={false}
									size="small"
								/>
							</Col>
							<Col flex={0}>
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
										count={time}
										showZero
										overflowCount={999}
									/>
									s
								</div>
							</Col>
						</If>
						<If when={!question}>
							<Col xs={24}>
								<Progress
									percent={100}
									status="active"
									size="small"
									showInfo={false}
								/>
								<Typography.Title
									level={5}
									className="text-center"
									style={{ margin: 0 }}
								>
									Waiting for players
								</Typography.Title>
							</Col>
						</If>
					</If>
				</Row>
			</div>
			<Divider style={{ margin: 0 }} />
		</div>
	);
};

export default PlayerHeader;
