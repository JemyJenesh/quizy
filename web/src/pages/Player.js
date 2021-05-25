import { useEffect, useRef, useState } from "react";
import { SmileOutlined } from "@ant-design/icons";
import {
	Row,
	Col,
	Button,
	Progress,
	Tag,
	Typography,
	Space,
	Result,
	message,
} from "antd";
import { PlayerInfo, PlayersList } from "components";
import { useParams } from "react-router";
import { axios } from "utils/axios";
import echo from "utils/echo";

const { CheckableTag } = Tag;

const COUNTDOWN = 20;
const PASS_COUNTDOWN = 10;

const Player = ({ history }) => {
	const timer = useRef();
	const { quizId, playerId } = useParams();
	const [ended, setEnded] = useState(false);
	const [player, setPlayer] = useState(null);
	const [quiz, setQuiz] = useState(null);
	const [question, setQuestion] = useState(null);

	const [answer, setAnswer] = useState(null);
	const [answered, setAnswered] = useState(false);
	const [isTurn, setIsTurn] = useState(false);
	const [time, setTime] = useState(0);

	const submit = () => {
		clearInterval(timer.current);
		setTime(0);
		axios
			.post("/answers", {
				option_id: answer,
				player_id: playerId,
			})
			.catch((err) => {
				if (err.response) {
					message.error("Something went wrong!");
				}
			});
		setAnswered(true);
	};

	const handleSubmit = () => {
		if (answer === null) {
			message.warning("Please selected one option!");
			return;
		}
		submit();
	};

	const handlePass = () => {
		clearInterval(timer.current);
		setTime(0);
		axios
			.post("/pass", {
				player_id: player.id,
			})
			.catch((err) => {
				if (err.response) {
					message.error("Something went wrong!");
				}
			});
		setAnswered(true);
	};

	useEffect(() => {
		axios(`/players/${playerId}`)
			.then((res) => {
				if (res.status === 200) {
					setPlayer(res.data.player);
					setQuiz(res.data.quiz);
					console.log(quiz);
					setQuestion(res.data.question);
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

	useEffect(() => {
		echo.channel(`quiz-${quizId}`).listen("QuestionChanged", (e) => {
			setAnswered(false);
			setAnswer(null);
			setQuestion(e.question);
			setQuiz(e.quiz);
			setTime(COUNTDOWN);
			let cd = COUNTDOWN;
			timer.current = setInterval(() => {
				if (cd < 1) {
					if (isTurn) submit();
					clearInterval(timer.current);
				} else {
					cd--;
					setTime((prev) => prev - 1);
				}
			}, 1000);
		});
		echo.channel(`quiz-${quizId}`).listen("QuestionPassed", (e) => {
			console.log(e);
			setAnswered(false);
			setAnswer(null);
			setQuiz(e.quiz);
			setTime(PASS_COUNTDOWN);
			let cd = PASS_COUNTDOWN;
			clearInterval(timer.current);
			timer.current = setInterval(() => {
				if (cd < 1) {
					if (isTurn) submit();
					clearInterval(timer.current);
				} else {
					cd--;
					setTime((prev) => prev - 1);
				}
			}, 1000);
		});

		echo.channel(`quiz-${quizId}`).listen("QuestionPassingEnd", (e) => {
			setTime(0);
			clearInterval(timer.current);
			message.info("The question is now passed to Audience!");
		});

		echo.channel(`quiz-${quizId}`).listen("QuizEnded", (e) => {
			setEnded(true);
		});

		echo.channel(`quiz-${quizId}`).listen("PlayerAnswered", (e) => {
			setTime(0);
			clearInterval(timer.current);
		});

		return () => {
			echo.leaveChannel(`quiz-${quizId}`);
		};
	}, [quizId]);

	useEffect(() => {
		if (quiz && player) setIsTurn(quiz.turn === player.order);
	}, [quiz, player]);

	return (
		<div style={styles.container}>
			<Row gutter={12}>
				<Col xs={{ span: 24, order: 3 }} md={{ span: 5, order: 1 }}>
					<PlayersList quizId={quizId} turn={quiz && quiz.turn} />
				</Col>
				<Col xs={{ span: 24, order: 2 }} md={14}>
					{ended ? (
						<Result
							icon={<SmileOutlined />}
							title="Thanks for participating in the quiz!"
						/>
					) : question && question ? (
						<Space direction="vertical" align="center" style={styles.fill}>
							<Progress
								type="circle"
								width={100}
								percent={
									100 -
									(((quiz.is_passed ? PASS_COUNTDOWN : COUNTDOWN) - time) /
										(quiz.is_passed ? PASS_COUNTDOWN : COUNTDOWN)) *
										100
								}
								format={(percent) => `${time} s`}
							/>
							<Typography.Title level={1} style={styles.text}>
								{question.text}
							</Typography.Title>
							<Tag color="geekblue">{question.category}</Tag>
							<Row style={styles.optionsContainer} gutter={12}>
								{question.options.map(({ id, text }) => (
									<Col key={id} span={12}>
										{isTurn ? (
											<CheckableTag
												key={id}
												style={styles.option}
												checked={answer === id}
												onChange={(checked) =>
													!answered &&
													time > 0 &&
													setAnswer(checked ? id : null)
												}
											>
												{text}
											</CheckableTag>
										) : (
											<Tag
												style={styles.option}
												color={answer === id ? "geekblue" : "default"}
											>
												{text}
											</Tag>
										)}
									</Col>
								))}
							</Row>
							{quiz.turn === player.order && (
								<Space>
									<Button
										key="pass"
										size="large"
										disabled={time < 1 || answered}
										onClick={handlePass}
									>
										Pass
									</Button>
									<Button
										type="primary"
										key="submit"
										disabled={time < 1 || answered}
										size="large"
										onClick={handleSubmit}
									>
										Submit
									</Button>
								</Space>
							)}
						</Space>
					) : (
						<Typography.Title level={1} style={styles.text}>
							Waiting...
						</Typography.Title>
					)}
				</Col>
				<Col xs={{ span: 24, order: 1 }} md={{ span: 5, order: 3 }}>
					<PlayerInfo player={player} turn={quiz && quiz.turn} />
				</Col>
			</Row>
		</div>
	);
};

const styles = {
	container: {
		padding: "1rem",
		minHeight: "100vh",
	},
	text: {
		margin: "1rem 0 0 0",
		textAlign: "center",
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
		textAlign: "center",
		border: "1px solid lightgray",
	},
};

export default Player;
