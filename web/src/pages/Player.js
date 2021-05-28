import { useEffect, useRef, useState } from "react";
import {
	SmileOutlined,
	CheckCircleOutlined,
	SyncOutlined,
	CloseCircleOutlined,
} from "@ant-design/icons";
import { Row, Col, Button, Tag, Typography, Result, message } from "antd";
import {
	PlayerHeader,
	PlayerInfo,
	PlayersScoreDrawer,
	If,
	PlayersScoreboard,
} from "components";
import { useParams } from "react-router";
import { axios } from "utils/axios";
import echo from "utils/echo";

const COUNTDOWN = 20;
const PASS_COUNTDOWN = 10;
const returnIndexToAlphabhet = (index) => ["A", "B", "C", "D"][index];

const Player = ({ history }) => {
	const timer = useRef();
	const { quizId, playerId } = useParams();
	const [ended, setEnded] = useState(false);
	const [player, setPlayer] = useState(null);
	const [quiz, setQuiz] = useState(null);
	const [question, setQuestion] = useState(null);

	const [answer, setAnswer] = useState(null);
	const [isTurn, setIsTurn] = useState(false);
	const [time, setTime] = useState(0);
	const [submitting, setSubmitting] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const toggleDrawer = () => setIsOpen(!isOpen);
	const [showAnswer, setShowAnswer] = useState(false);
	const [selectedOption, setSelectedOption] = useState(null);
	const [endMessage, setEndMessage] = useState("");

	const submit = () => {
		setSubmitting(true);
		clearInterval(timer.current);
		setTime(0);
		axios
			.post("/answer", {
				option_id: answer,
				player_id: playerId,
			})
			.catch((err) => {
				if (err.response) {
					message.error("Something went wrong!");
				}
			})
			.finally(() => {
				setSubmitting(false);
			});
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
			setShowAnswer(false);
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
			setEndMessage(e.message);
		});

		echo.channel(`quiz-${quizId}`).listen("PlayerAnswered", (e) => {
			setTime(0);
			clearInterval(timer.current);
			setShowAnswer(true);
			setPlayer(e.players.find((p) => p.id.toString() === playerId.toString()));
			setSelectedOption(e.option);
		});

		return () => {
			echo.leaveChannel(`quiz-${quizId}`);
		};
	}, [quizId]);

	useEffect(() => {
		if (quiz && player) setIsTurn(quiz.turn === player.order);
	}, [quiz, player]);

	return (
		<div style={{ minHeight: "100vh" }}>
			<PlayersScoreDrawer
				open={isOpen}
				onClose={toggleDrawer}
				quizId={quizId}
			/>
			<PlayerHeader
				hasEnded={ended}
				quiz={quiz}
				question={question}
				time={time}
			/>
			<PlayerInfo player={player} toggleDrawer={toggleDrawer} />
			<If when={ended}>
				<Result icon={<SmileOutlined />} title={endMessage} />
			</If>
			<div className="container">
				<If when={!ended}>
					<If when={!question}>
						<Result title="Please wait for other players" />
					</If>
					<If when={question}>
						<Row gutter={[24, 24]}>
							<Col xs={0} lg={6}>
								<PlayersScoreboard title="Scoreboard" quizId={quizId} />
							</Col>
							<Col xs={24} lg={18}>
								<Row justify="space-between" gutter={[24, 24]}>
									<Col xs={24}>
										<Typography.Title level={3} className="title text-center">
											{question?.text}
										</Typography.Title>
									</Col>
									{question?.options.map((option, idx) => (
										<Col key={option.id} xs={24} md={12}>
											<Tag
												className="tag"
												icon={
													showAnswer && option.is_correct ? (
														<CheckCircleOutlined />
													) : showAnswer &&
													  selectedOption?.toString() ===
															option.id.toString() ? (
														<CloseCircleOutlined />
													) : (
														answer === option.id &&
														submitting && <SyncOutlined spin />
													)
												}
												color={
													showAnswer && option.is_correct
														? "success"
														: showAnswer &&
														  selectedOption?.toString() ===
																option.id.toString()
														? "error"
														: answer === option.id
														? "processing"
														: "default"
												}
												onClick={() =>
													isTurn &&
													time > 0 &&
													setAnswer(answer === option.id ? null : option.id)
												}
											>
												{returnIndexToAlphabhet(idx)}. {option.text}
											</Tag>
										</Col>
									))}
									<If when={isTurn}>
										<Col flex="0">
											<Button
												size="large"
												disabled={time < 1}
												onClick={handlePass}
											>
												Pass
											</Button>
										</Col>
										<Col flex="0">
											<Button
												size="large"
												type="primary"
												disabled={time < 1}
												size="large"
												onClick={handleSubmit}
											>
												Submit
											</Button>
										</Col>
									</If>
								</Row>
							</Col>
						</Row>
					</If>
				</If>
			</div>
		</div>
	);
};

export default Player;
