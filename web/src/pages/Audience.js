import {
	Affix,
	Badge,
	Button,
	Col,
	Divider,
	message,
	Progress,
	Result,
	Row,
	Spin,
	Tag,
	Typography,
} from "antd";
import {
	SmileFilled,
	CloseCircleOutlined,
	CheckCircleOutlined,
	UnorderedListOutlined,
} from "@ant-design/icons";
import { config } from "common";
import { If, PlayersScoreboard, PlayersScoreDrawer } from "components";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import echo from "utils/echo";
import { axios } from "utils/axios";
import { useQuery } from "react-query";

const returnIndexToAlphabhet = (index) => ["A", "B", "C", "D"][index];

const Audience = () => {
	const { quizId } = useParams();
	const { data, isLoading } = useQuery(["audience", quizId], async () => {
		const { data } = await axios(`/games/${quizId}/audience`);
		return data;
	});

	const [players, setPlayers] = useState(null);
	const [question, setQuestion] = useState(null);
	const [quiz, setQuiz] = useState(null);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

	const timer = useRef();
	const [time, setTime] = useState(0);

	const [showAnswer, setShowAnswer] = useState(false);
	const [choosenOption, setChoosenOption] = useState(null);
	const [hasEnded, setHasEnded] = useState(false);

	useEffect(() => {
		if (data) {
			const { players, quiz, question } = data;
			setPlayers(players);
			setQuestion(question);
			setQuiz(quiz);
			setHasEnded(!quiz.pin && !question);
		}
	}, [data]);

	useEffect(() => {
		if (quizId) {
			echo.channel(`quiz-${quizId}`).listen("QuestionChanged", (e) => {
				setShowAnswer(false);
				setQuestion(e.question);
				setQuiz(e.quiz);
				clearInterval(timer.current);
				const tempTime = config.COUNTDOWN;
				setTime(tempTime);
				let cd = tempTime;
				timer.current = setInterval(() => {
					if (cd < 1) {
						clearInterval(timer.current);
					} else {
						cd--;
						setTime((prev) => prev - 1);
					}
				}, 1000);
			});

			echo.channel(`quiz-${quizId}`).listen("QuestionPassed", (e) => {
				setShowAnswer(false);
				setQuiz(e.quiz);
				clearInterval(timer.current);
				const tempTime = config.PASS_COUNTDOWN;
				setTime(tempTime);
				let cd = tempTime;
				timer.current = setInterval(() => {
					if (cd < 1) {
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
				setHasEnded(true);
				setIsDrawerOpen(true);
			});

			echo.channel(`quiz-${quizId}`).listen("PlayerJoined", (e) => {
				message.success(`${e.player.name} has joined the quiz!`);
				setPlayers((prev) => [...prev, e.player]);
			});

			echo.channel(`quiz-${quizId}`).listen("PlayerKicked", (e) => {
				let kickedPlayer = e.player;
				message.warning(
					`${kickedPlayer.name} has been kicked out of the quiz!`
				);
				setPlayers((prev) =>
					prev.filter((player) => player.id !== kickedPlayer.id)
				);
			});

			echo.channel(`quiz-${quizId}`).listen("PlayerAnswered", (e) => {
				setTime(0);
				setShowAnswer(true);
				clearInterval(timer.current);

				setPlayers(e.players.sort((a, b) => b.score - a.score));
				setChoosenOption(e.option);

				if (e.correct === null) {
					message.warning("Time's Up!");
				}
			});

			return () => {
				echo.leaveChannel(`quiz-${quizId}`);
			};
		}
	}, [quizId]);

	if (isLoading)
		return (
			<Spin spinning size="large">
				<div className="mvh-100" />
			</Spin>
		);

	return (
		<div className="mvh-100">
			<PlayersScoreDrawer open={isDrawerOpen} onClose={toggleDrawer}>
				<PlayersScoreboard
					players={players}
					currentPlayerId={null}
					size="large"
				/>
			</PlayersScoreDrawer>
			<If when={!hasEnded && !question}>
				<WaitingHeader toggleDrawer={toggleDrawer} />
			</If>
			<If when={!hasEnded && !!question}>
				<RunningHeader toggleDrawer={toggleDrawer} quiz={quiz} time={time} />
			</If>
			<If when={hasEnded}>
				<EndingHeader toggleDrawer={toggleDrawer} />
			</If>
			<Divider style={styles.m0} />
			<If when={!hasEnded && !question}>
				<Result title={quiz?.pin} icon={null} />
				<Result
					title="The quiz will start soon!"
					icon={<Spin spinning size="large" />}
				/>
			</If>
			<If when={!hasEnded && !!question}>
				<div className="container">
					<Row>
						<Col xs={24}>
							<Typography.Title
								className="text-center"
								style={{ margin: "1.5rem 0", fontSize: "4rem" }}
							>
								{question?.text}
							</Typography.Title>
						</Col>
					</Row>
					<div className="container-sm">
						<Row gutter={[24, 24]}>
							{question?.options.map((option, idx) => {
								const color =
									showAnswer && option.is_correct
										? "success"
										: showAnswer &&
										  choosenOption?.toString() === option.id.toString()
										? "error"
										: "default";
								const icon =
									showAnswer && option.is_correct ? (
										<CheckCircleOutlined />
									) : showAnswer &&
									  choosenOption?.toString() === option.id.toString() ? (
										<CloseCircleOutlined />
									) : null;

								return (
									<Col key={option.id} xs={24} md={12}>
										<Tag className="tag-lg" icon={icon} color={color}>
											{returnIndexToAlphabhet(idx)}. {option.text}
										</Tag>
									</Col>
								);
							})}
						</Row>
					</div>
				</div>
			</If>
			<If when={hasEnded}>
				<QuizResult />
			</If>
			<Affix style={{ position: "absolute", bottom: 16, right: 16 }}>
				<Button
					type="primary"
					disabled={!question || time > 0}
					onClick={() => setShowAnswer(true)}
				>
					Show Answer
				</Button>
			</Affix>
		</div>
	);
};

const RunningHeader = ({ quiz, time, toggleDrawer }) => (
	<div className="container">
		<Row gutter={24}>
			<Col flex={0}>
				<Button
					shape="circle"
					icon={
						<UnorderedListOutlined
							style={{ color: "#2db7f5" }}
							onClick={toggleDrawer}
						/>
					}
				/>
			</Col>
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
const WaitingHeader = ({ toggleDrawer }) => (
	<div className="container">
		<Row gutter={24}>
			<Col flex={0}>
				<Button
					shape="circle"
					icon={
						<UnorderedListOutlined
							style={{ color: "#2db7f5" }}
							onClick={toggleDrawer}
						/>
					}
				/>
			</Col>
			<Col flex={1}>
				<Progress percent={100} status="active" size="small" showInfo={false} />
				<Typography.Title level={5} className="text-center" style={styles.m0}>
					Waiting for players...
				</Typography.Title>
			</Col>
		</Row>
	</div>
);
const EndingHeader = ({ toggleDrawer }) => (
	<div className="container">
		<Row gutter={24}>
			<Col flex={0}>
				<Button
					shape="circle"
					icon={
						<UnorderedListOutlined
							style={{ color: "#2db7f5" }}
							onClick={toggleDrawer}
						/>
					}
				/>
			</Col>
			<Col flex={1}>
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
const QuizResult = () => {
	return (
		<div className="container">
			<Result
				title="Thank you all for Participating!"
				icon={<SmileFilled style={{ color: "#ffd63f" }} />}
			/>
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
};

export default Audience;
