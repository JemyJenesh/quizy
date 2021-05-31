// import { useEffect, useRef, useState } from "react";
// import {
// 	SmileOutlined,
// 	CheckCircleOutlined,
// 	SyncOutlined,
// 	CloseCircleOutlined,
// } from "@ant-design/icons";
// import { Row, Col, Button, Tag, Typography, Result, message, Grid } from "antd";
// import {
// 	PlayerHeader,
// 	PlayerInfo,
// 	PlayersScoreDrawer,
// 	If,
// 	PlayersScoreboard,
// } from "components";
// import { useParams } from "react-router";
// import { axios } from "utils/axios";
// import echo from "utils/echo";

// const { useBreakpoint } = Grid;

// const COUNTDOWN = 20;
// const PASS_COUNTDOWN = 10;
// const PLAYER_STATE = {
// 	IDLE: 0,
// 	SUBMITTING: 1,
// 	PASSING: 2,
// };
// const QUIZ_STATE = {
// 	WAITING: 0,
// 	RUNNING: 1,
// 	ENDED: 2,
// };

// const Player = ({ history }) => {
// 	const timer = useRef();
// 	const { quizId, playerId } = useParams();
// 	const screens = useBreakpoint();
// 	const isSmall = screens.xs || screens.sm || screens.md;
// 	const isLarge = screens.lg || screens.xl || screens.xxl;
// 	const [ended, setEnded] = useState(false);
// 	const [player, setPlayer] = useState(null);
// 	const [quiz, setQuiz] = useState(null);
// 	const [question, setQuestion] = useState(null);

// 	const [answer, setAnswer] = useState(null);
// 	const [isTurn, setIsTurn] = useState(false);
// 	const [time, setTime] = useState(0);
// 	const [submitting, setSubmitting] = useState(false);
// 	const [isPassing, setIsPassing] = useState(false);
// 	const [isOpen, setIsOpen] = useState(false);
// 	const toggleDrawer = () => setIsOpen(!isOpen);
// 	const [showAnswer, setShowAnswer] = useState(false);
// 	const [selectedOption, setSelectedOption] = useState(null);
// 	const [endMessage, setEndMessage] = useState("");

// 	const submit = () => {
// 		setSubmitting(true);
// 		clearInterval(timer.current);
// 		setTime(0);
// 		axios
// 			.post("/answer", {
// 				option_id: answer,
// 				player_id: playerId,
// 			})
// 			.catch((err) => {
// 				if (err.response) {
// 					message.error("Something went wrong!");
// 				}
// 			})
// 			.finally(() => {
// 				setSubmitting(false);
// 			});
// 	};

// 	const handleSubmit = () => {
// 		if (answer === null) {
// 			message.warning("Please selected one option!");
// 			return;
// 		}
// 		submit();
// 	};

// 	const handlePass = () => {
// 		setIsPassing(true);
// 		clearInterval(timer.current);
// 		setTime(0);
// 		axios
// 			.post("/pass", {
// 				player_id: player.id,
// 			})
// 			.catch((err) => {
// 				if (err.response) {
// 					message.error("Something went wrong!");
// 				}
// 			})
// 			.finally(() => setIsPassing(false));
// 	};

// 	useEffect(() => {
// 		axios(`/players/${playerId}`)
// 			.then((res) => {
// 				if (res.status === 200) {
// 					setPlayer(res.data.player);
// 					setQuiz(res.data.quiz);
// 					console.log(quiz);
// 					setQuestion(res.data.question);
// 				}
// 			})
// 			.catch((err) => {
// 				if (err.response) {
// 					if (err.response.status === 404) {
// 						history.push("/");
// 					}
// 				}
// 			});
// 	}, [playerId]);

// 	useEffect(() => {
// 		if (quizId) {
// 			echo.channel(`quiz-${quizId}`).listen("QuestionChanged", (e) => {
// 				setShowAnswer(false);
// 				setAnswer(null);
// 				setQuestion(e.question);
// 				setQuiz(e.quiz);
// 				setTime(COUNTDOWN);
// 				let cd = COUNTDOWN;
// 				timer.current = setInterval(() => {
// 					if (cd < 1) {
// 						if (isTurn) submit();
// 						clearInterval(timer.current);
// 					} else {
// 						cd--;
// 						setTime((prev) => prev - 1);
// 					}
// 				}, 1000);
// 			});
// 			echo.channel(`quiz-${quizId}`).listen("QuestionPassed", (e) => {
// 				setAnswer(null);
// 				setQuiz(e.quiz);
// 				setTime(PASS_COUNTDOWN);
// 				let cd = PASS_COUNTDOWN;
// 				clearInterval(timer.current);
// 				timer.current = setInterval(() => {
// 					if (cd < 1) {
// 						if (isTurn) submit();
// 						clearInterval(timer.current);
// 					} else {
// 						cd--;
// 						setTime((prev) => prev - 1);
// 					}
// 				}, 1000);
// 			});

// 			echo.channel(`quiz-${quizId}`).listen("QuestionPassingEnd", (e) => {
// 				setTime(0);
// 				clearInterval(timer.current);
// 				message.info("The question is now passed to Audience!");
// 			});

// 			echo.channel(`quiz-${quizId}`).listen("QuizEnded", (e) => {
// 				setEnded(true);
// 				setEndMessage(e.message);
// 			});

// 			echo.channel(`quiz-${quizId}`).listen("PlayerAnswered", (e) => {
// 				setTime(0);
// 				clearInterval(timer.current);
// 				setShowAnswer(true);
// 				setPlayer(
// 					e.players.find((p) => p.id.toString() === playerId.toString())
// 				);
// 				setSelectedOption(e.option);
// 			});

// 			return () => {
// 				echo.leaveChannel(`quiz-${quizId}`);
// 			};
// 		}
// 	}, [quizId]);

// 	useEffect(() => {
// 		if (quiz && player)
// 			setIsTurn(quiz.turn.toString() === player.order.toString());
// 	}, [quiz, player]);

// 	return (
// 		<div style={{ minHeight: "100vh" }}>
// 			<If when={isSmall}>
// 				<PlayersScoreDrawer
// 					open={isOpen}
// 					onClose={toggleDrawer}
// 					quizId={quizId}
// 				/>
// 			</If>
// 			<PlayerHeader
// 				hasEnded={ended}
// 				quiz={quiz}
// 				question={question}
// 				time={time}
// 			/>
// 			<PlayerInfo player={player} toggleDrawer={toggleDrawer} />
// 			<If when={ended}>
// 				<Result icon={<SmileOutlined />} title={endMessage} />
// 			</If>
// 			<div className="container-sm">
// 				<If when={!ended}>
// 					<If when={!question}>
// 						<Result title="Please wait for other players" />
// 					</If>
// 					<If when={question}>
// 						<Row gutter={[24, 24]}>
// 							<Col xs={0} lg={6}>
// 								<If when={isLarge}>
// 									<PlayersScoreboard title="Scoreboard" quizId={quizId} />
// 								</If>
// 							</Col>
// 							<Col xs={24} lg={18}>
// 								<Row justify="space-between" gutter={[24, 24]}>
// 									<Col xs={24}>
// 										<Typography.Title level={3} className="title text-center">
// 											{question?.text}
// 										</Typography.Title>
// 									</Col>
// 									{question?.options.map((option, idx) => (
// 										<Col key={option.id} xs={24} md={12}>
// 											<Tag
// 												className="tag"
// icon={
// 	showAnswer && option.is_correct ? (
// 		<CheckCircleOutlined />
// 	) : showAnswer &&
// 	  selectedOption?.toString() ===
// 			option.id.toString() ? (
// 		<CloseCircleOutlined />
// 	) : (
// 		answer === option.id &&
// 		submitting && <SyncOutlined spin />
// 	)
// }
// color={
// 	showAnswer && option.is_correct
// 		? "success"
// 		: showAnswer &&
// 		  selectedOption?.toString() ===
// 				option.id.toString()
// 		? "error"
// 		: answer === option.id
// 		? "processing"
// 		: "default"
// }
// 												onClick={() =>
// 													isTurn &&
// 													time > 0 &&
// 													setAnswer(answer === option.id ? null : option.id)
// 												}
// 											>
// 												{returnIndexToAlphabhet(idx)}. {option.text}
// 											</Tag>
// 										</Col>
// 									))}
// 									<If when={isTurn}>
// 										<Col flex="0">
// 											<Button
// 												size="large"
// 												disabled={time < 1}
// 												onClick={handlePass}
// 												loading={isPassing}
// 											>
// 												Pass
// 											</Button>
// 										</Col>
// 										<Col flex="0">
// 											<Button
// 												size="large"
// 												type="primary"
// 												disabled={time < 1}
// 												size="large"
// 												onClick={handleSubmit}
// 											>
// 												Submit
// 											</Button>
// 										</Col>
// 									</If>
// 								</Row>
// 							</Col>
// 						</Row>
// 					</If>
// 				</If>
// 			</div>
// 		</div>
// 	);
// };

// export default Player;

import {
	Badge,
	Button,
	Col,
	Divider,
	message,
	Progress,
	Result,
	Row,
	Space,
	Spin,
	Tag,
	Typography,
} from "antd";
import {
	TrophyFilled,
	SmileFilled,
	SyncOutlined,
	CloseCircleOutlined,
	CheckCircleOutlined,
} from "@ant-design/icons";
import { useShow } from "api";
import { config } from "common";
import {
	If,
	PlayerInfo,
	PlayersScoreboard,
	PlayersScoreDrawer,
} from "components";
import { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router";
import echo from "utils/echo";
import { axios } from "utils/axios";

const QUIZ_STATUS = {
	WAITING: 0,
	RUNNING: 1,
	ENDED: 2,
};
const PLAYER_STATE = {
	IDLE: 0,
	SUBMITTING: 1,
	PASSING: 2,
};
const returnIndexToAlphabhet = (index) => ["A", "B", "C", "D"][index];

const Player = ({ history }) => {
	const { playerId, quizId } = useParams();
	const { data, status } = useShow("/players", playerId);

	const [player, setPlayer] = useState(null);
	const [players, setPlayers] = useState(null);
	const [question, setQuestion] = useState(null);
	const [quiz, setQuiz] = useState(null);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [isWinner, setIsWinner] = useState(null);
	const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

	const timer = useRef();
	const [time, setTime] = useState(0);
	const [isMyTurn, setIsMyTurn] = useState(false);

	const [showAnswer, setShowAnswer] = useState(false);
	const [quizStatus, setQuizStatus] = useState(QUIZ_STATUS.WAITING);
	const [playerStatus, setPlayerStatus] = useState(PLAYER_STATE.IDLE);
	const [selectedOption, setSelectedOption] = useState(null);
	const [choosenOption, setChoosenOption] = useState(null);

	const submit = async () => {
		clearInterval(timer.current);
		setTime(0);
		if (isMyTurn) {
			setPlayerStatus(PLAYER_STATE.SUBMITTING);
			try {
				await axios.post("/answer", {
					option_id: selectedOption,
					quiz_id: quizId,
				});
			} catch (err) {
				if (err.response) {
					message.error("Something went wrong!");
				}
			} finally {
				setPlayerStatus(PLAYER_STATE.IDLE);
			}
		}
	};

	const handleSubmit = () => {
		if (selectedOption === null) {
			message.warning("Please selected one option!");
			return;
		}
		submit();
	};

	const handlePass = async () => {
		setPlayerStatus(PLAYER_STATE.PASSING);
		clearInterval(timer.current);
		setTime(0);
		try {
			await axios.post("/pass", {
				player_id: player.id,
			});
		} catch (err) {
			if (err.response) {
				message.error("Something went wrong!");
			}
		} finally {
			setPlayerStatus(PLAYER_STATE.IDLE);
		}
	};

	useEffect(() => {
		if (status === "error") history.push("/");
	}, [status]);

	useEffect(() => {
		if (data) {
			const { player, players, quiz, question } = data;
			setPlayer(player);
			setPlayers(players);
			setQuestion(question);
			setQuiz(quiz);
			if (question) {
				setQuizStatus(QUIZ_STATUS.RUNNING);
			}
		}
	}, [data]);

	useEffect(() => {
		if (player) {
			echo.channel(`quiz-${player.quiz_id}`).listen("QuestionChanged", (e) => {
				clearInterval(timer.current);
				setIsMyTurn(e.quiz.turn === player.order);
				setQuizStatus(QUIZ_STATUS.RUNNING);
				setShowAnswer(false);
				setSelectedOption(null);
				setQuestion(e.question);
				setQuiz(e.quiz);
				setTime(config.COUNTDOWN);
				let cd = config.COUNTDOWN;
				timer.current = setInterval(() => {
					if (cd < 1) {
						submit();
						clearInterval(timer.current);
					} else {
						cd--;
						setTime((prev) => prev - 1);
					}
				}, 1000);
			});

			echo.channel(`quiz-${player.quiz_id}`).listen("QuestionPassed", (e) => {
				clearInterval(timer.current);
				message.info(e.quiz.turn === player.order);
				setIsMyTurn(e.quiz.turn === player.order);
				setQuizStatus(QUIZ_STATUS.RUNNING);
				setShowAnswer(false);
				setSelectedOption(null);
				setQuiz(e.quiz);
				setTime(config.PASS_COUNTDOWN);
				let cd = config.PASS_COUNTDOWN;
				timer.current = setInterval(() => {
					if (cd < 1) {
						submit();
						clearInterval(timer.current);
					} else {
						cd--;
						setTime((prev) => prev - 1);
					}
				}, 1000);
			});

			echo
				.channel(`quiz-${player.quiz_id}`)
				.listen("QuestionPassingEnd", (e) => {
					setTime(0);
					clearInterval(timer.current);
					message.info("The question is now passed to Audience!");
				});

			echo.channel(`quiz-${player.quiz_id}`).listen("QuizEnded", (e) => {
				setQuizStatus(QUIZ_STATUS.ENDED);
				setIsWinner(e.winner_player_id === player.id);
			});

			echo.channel(`quiz-${player.quiz_id}`).listen("PlayerJoined", (e) => {
				message.success(`${e.player.name} has joined the quiz!`);
				setPlayers((prev) => [...prev, e.player]);
			});

			echo.channel(`quiz-${player.quiz_id}`).listen("PlayerKicked", (e) => {
				let kickedPlayer = e.player;
				let samePlayer = kickedPlayer.id.toString() === player.id.toString();
				if (samePlayer) {
					setTimeout(() => {
						history.push("/");
					}, 2000);
					message.error(`You has been kicked out of the quiz!`);
				} else {
					message.warning(`${e.player.name} has been kicked out of the quiz!`);
				}
				setPlayers((prev) =>
					prev.filter((player) => player.id !== kickedPlayer.id)
				);
			});

			echo.channel(`quiz-${player.quiz_id}`).listen("PlayerAnswered", (e) => {
				setTime(0);
				setShowAnswer(true);
				clearInterval(timer.current);
				setPlayer(
					e.players.find((p) => p.id.toString() === playerId.toString())
				);
				setPlayers(e.players.sort((a, b) => b.score - a.score));
				setChoosenOption(e.option);

				if (e.correct === null) {
					message.warning("Time's Up!");
				}
			});

			return () => {
				echo.leaveChannel(`quiz-${player.quiz_id}`);
			};
		}
	}, [player, history, playerId]);

	if (status === "loading")
		return (
			<Spin spinning size="large">
				<div className="mvh-100" />
			</Spin>
		);

	return (
		<div className="mvh-100">
			<PlayersScoreDrawer open={isDrawerOpen} onClose={toggleDrawer}>
				<PlayersScoreboard players={players} currentPlayerId={playerId} />
			</PlayersScoreDrawer>
			{/* <If when={quizStatus === QUIZ_STATUS.WAITING}>
				<WaitingHeader />
			</If>
			<If when={quizStatus === QUIZ_STATUS.RUNNING}>
				<RunningHeader quiz={quiz} time={time} />
			</If>
			<If when={quizStatus === QUIZ_STATUS.ENDED}>
				<EndingHeader />
			</If> */}
			<Divider style={styles.m0} />
			<PlayerInfo player={player} toggleDrawer={toggleDrawer} />
			<If when={quizStatus === QUIZ_STATUS.WAITING}>
				<Result
					title="The quiz will start soon!"
					icon={<Spin spinning size="large" />}
				/>
			</If>
			<If when={quizStatus === QUIZ_STATUS.RUNNING}>
				{/* running */}
				<div className="container-sm">
					<Row gutter={[24, 24]}>
						<Col xs={24}>
							<Typography.Title level={3} className="text-center">
								{question?.text}
							</Typography.Title>
						</Col>
						{question?.options.map((option, idx) => {
							const color =
								showAnswer && option.is_correct
									? "success"
									: showAnswer &&
									  choosenOption?.toString() === option.id.toString()
									? "error"
									: selectedOption === option.id
									? "processing"
									: "default";
							const icon =
								showAnswer && option.is_correct ? (
									<CheckCircleOutlined />
								) : showAnswer &&
								  choosenOption?.toString() === option.id.toString() ? (
									<CloseCircleOutlined />
								) : (
									selectedOption === option.id &&
									playerStatus === PLAYER_STATE.SUBMITTING && (
										<SyncOutlined spin />
									)
								);
							const handleClick = () =>
								isMyTurn &&
								time > 0 &&
								setSelectedOption(
									selectedOption === option.id ? null : option.id
								);

							return (
								<Col key={option.id} xs={24} md={12}>
									<Tag
										className="tag"
										icon={icon}
										color={color}
										onClick={handleClick}
									>
										{returnIndexToAlphabhet(idx)}. {option.text}
									</Tag>
								</Col>
							);
						})}
					</Row>
					<If when={isMyTurn}>
						<div style={styles.btnContainer}>
							<Button
								size="large"
								disabled={time < 1}
								onClick={handlePass}
								loading={playerStatus === PLAYER_STATE.PASSING}
							>
								Pass
							</Button>
							<Button
								size="large"
								type="primary"
								disabled={time < 1}
								size="large"
								onClick={handleSubmit}
							>
								Submit
							</Button>
						</div>
					</If>
				</div>

				{/* running */}
			</If>
			<If when={quizStatus === QUIZ_STATUS.ENDED}>
				<QuizResult isWinner={isWinner} />
			</If>
		</div>
	);
};

const RunningHeader = ({ quiz, time }) => (
	<div className="container-sm">
		<Row>
			<Col flex={1}>
				<Progress
					percent={
						100 -
						(((quiz?.is_passed ? config.PASS_COUNTDOWN : config.COUNTDOWN) -
							time) /
							(quiz?.is_passed ? config.PASS_COUNTDOWN : config.COUNTDOWN)) *
							100
					}
					showInfo={false}
					size="small"
				/>
			</Col>
			<Col flex={0}>
				<div style={styles.timeBadgeContainer}>
					<Badge
						style={styles.timeBadge}
						count={time}
						showZero
						overflowCount={999}
					/>
					s
				</div>
			</Col>
		</Row>
	</div>
);
const WaitingHeader = () => (
	<div className="container-sm">
		<Row>
			<Col xs={24}>
				<Progress percent={100} status="active" size="small" showInfo={false} />
				<Typography.Title level={5} className="text-center" style={styles.m0}>
					Waiting for players...
				</Typography.Title>
			</Col>
		</Row>
	</div>
);
const EndingHeader = () => (
	<div className="container-sm">
		<Row>
			<Col xs={24}>
				<Progress
					percent={100}
					status="success"
					size="small"
					showInfo={false}
				/>
				<Typography.Title level={5} className="text-center" style={styles.m0}>
					Quiz ended!
				</Typography.Title>
			</Col>
		</Row>
	</div>
);
const QuizResult = ({ isWinner }) => {
	const title = isWinner
		? "Congratulation! You won the quiz."
		: "Thanks for Participating!";
	const icon = isWinner ? (
		<TrophyFilled style={{ color: "gold" }} />
	) : (
		<SmileFilled style={{ color: "#ffd63f" }} />
	);
	return (
		<div className="container-sm">
			<Result title={title} icon={icon} />
		</div>
	);
};

const styles = {
	m0: {
		margin: 0,
	},
	timeBadgeContainer: {
		width: "3rem",
		textAlign: "end",
		display: "flex",
		alignItems: "flex-end",
		justifyContent: "flex-end",
	},
	timeBadge: {
		backgroundColor: "#fff",
		color: "#000",
		fontSize: "1rem",
		height: "1.5rem",
		lineHeight: "1.5rem",
		padding: 0,
	},
	btnContainer: {
		marginTop: 24,
		display: "flex",
		justifyContent: "space-between",
	},
};

export default Player;
