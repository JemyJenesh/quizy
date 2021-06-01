import { useEffect, useState, useRef } from "react";
import {
	Button,
	List,
	Popconfirm,
	Row,
	Col,
	Tag,
	Space,
	Select,
	message,
} from "antd";
import { useDelete } from "api";
import { Header, PageLoader, PlayerHeader, PlayersList } from "components";
import { useParams } from "react-router";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { axios } from "utils/axios";
import echo from "utils/echo";
import { useQuery } from "react-query";
import { config } from "common";

const { Option } = Select;

const Game = ({ history }) => {
	const { id } = useParams();
	const timer = useRef();
	const [time, setTime] = useState(0);

	const [category, setCategory] = useState(null);
	const [loading, setLoading] = useState(false);

	const { data, isLoading, refetch } = useQuery(["game", id], async () => {
		const { data } = await axios(`/games/${id}/host`);
		return data;
	});
	const { mutate, isLoading: isEnding } = useDelete("/games");

	const endQuiz = () => {
		mutate(id, { onSuccess: () => history.goBack() });
	};

	const nextQuestion = () => {
		setLoading(true);
		axios
			.put(`/games/${id}`, {
				category_id: category.id,
			})
			.then((res) => {
				if (res.status === 200) refetch();
			})
			.finally(() => setLoading(false));
	};

	useEffect(() => {
		if (category) {
			setCategory((prev) =>
				data.data.categories.find(({ id }) => id === prev.id)
			);
		}
	}, [data, category]);

	useEffect(() => {
		if (id) {
			echo.channel(`quiz-${id}`).listen("QuestionChanged", (e) => {
				setTime(config.COUNTDOWN);
				let cd = config.COUNTDOWN;
				timer.current = setInterval(() => {
					if (cd < 1) {
						clearInterval(timer.current);
					} else {
						cd--;
						setTime((prev) => prev - 1);
					}
				}, 1000);
			});
			echo.channel(`quiz-${id}`).listen("QuestionPassed", (e) => {
				message.info("Question is passed!");
				refetch();
				setTime(config.PASS_COUNTDOWN);
				let cd = config.PASS_COUNTDOWN;
				clearInterval(timer.current);
				timer.current = setInterval(() => {
					if (cd < 1) {
						clearInterval(timer.current);
					} else {
						cd--;
						setTime((prev) => prev - 1);
					}
				}, 1000);
			});

			echo.channel(`quiz-${id}`).listen("QuestionPassingEnd", (e) => {
				setTime(0);
				clearInterval(timer.current);
				message.info("The question is now passed to Audience!");
			});

			echo.channel(`quiz-${id}`).listen("PlayerAnswered", (e) => {
				setTime(0);
				clearInterval(timer.current);
			});

			return () => {
				echo.leaveChannel(`quiz-${id}`);
			};
		}
	}, [id]);

	if (isLoading) return <PageLoader />;

	return (
		<div>
			<Header
				showIcon={false}
				title={data.data.name}
				subTitle={data.data.pin}
				extra={[
					<Popconfirm
						key="end"
						title="Are you sure you want to end the quiz?"
						okText="Yes"
						placement="topRight"
						onConfirm={endQuiz}
					>
						<Button loading={isEnding} type="dashed">
							End Quiz
						</Button>
					</Popconfirm>,
				]}
			/>
			<div style={{ padding: "2rem" }}>
				<Row gutter={24}>
					<Col xs={24} lg={6}>
						<PlayersList quizId={id} turn={data && data.data.turn} />
					</Col>
					<Col xs={24} lg={18}>
						<Space align="center" style={{ marginBottom: "1rem" }}>
							<label>Category</label>
							<Select
								style={{ width: 200 }}
								onChange={(id) => {
									setCategory(
										data.data.categories.find((cat) => cat.id === id)
									);
								}}
							>
								{data &&
									data.data.categories.map(
										(
											{ id, name, questions_count, remaining_questions_count },
											i
										) => (
											<Option
												selected={true}
												key={id}
												value={id}
												disabled={remaining_questions_count < 1}
											>
												{name} ({questions_count - remaining_questions_count} /{" "}
												{questions_count})
											</Option>
										)
									)}
							</Select>
							<Button
								type="primary"
								disabled={
									!category ||
									category.remaining_questions_count < 1 ||
									loading ||
									time > 0
								}
								onClick={nextQuestion}
							>
								Next question
							</Button>
						</Space>
						<Row>
							<Col span={24}>
								<PlayerHeader
									hasEnded={false}
									time={time}
									question={data.data.question}
									quiz={data.data}
								/>
							</Col>
						</Row>
						<Row gutter={8}>
							{data &&
								Object.keys(data.data.quizQuestions).map((category) => (
									<Col span={12} key={category}>
										<List
											style={{ marginBottom: "1rem" }}
											size="small"
											header={<div>{category.toUpperCase()}</div>}
											bordered
											dataSource={data.data.quizQuestions[category]}
											renderItem={({ text, options, is_selected }) => (
												<List.Item>
													<Space direction="vertical">
														<Space size={4}>
															<Checkbox checked={is_selected} /> {text}
														</Space>
														<div>
															{options.map(({ id, text, is_correct }) => (
																<Tag
																	key={id}
																	color={is_correct ? "green" : "default"}
																>
																	{text}
																</Tag>
															))}
														</div>
													</Space>
												</List.Item>
											)}
										/>
									</Col>
								))}
						</Row>
					</Col>
				</Row>
			</div>
		</div>
	);
};

export default Game;

// import { Button, Col, Popconfirm, Row, Tag } from "antd";
// import { Header, PageLoader, PlayersScoreboard } from "components";
// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router";
// import {
// 	endGame,
// 	fetchInitailState,
// 	selectCurrentPlayer,
// } from "store/gameSlice";
// import Icon from "@ant-design/icons";

// const ShareSvg = () => (
// 	<svg
// 		xmlns="http://www.w3.org/2000/svg"
// 		width="16px"
// 		height="16px"
// 		fill="currentColor"
// 		class="bi bi-reply"
// 		viewBox="0 0 16 16"
// 		style={{
// 			transform: "rotateY(180deg)",
// 		}}
// 	>
// 		<path d="M6.598 5.013a.144.144 0 0 1 .202.134V6.3a.5.5 0 0 0 .5.5c.667 0 2.013.005 3.3.822.984.624 1.99 1.76 2.595 3.876-1.02-.983-2.185-1.516-3.205-1.799a8.74 8.74 0 0 0-1.921-.306 7.404 7.404 0 0 0-.798.008h-.013l-.005.001h-.001L7.3 9.9l-.05-.498a.5.5 0 0 0-.45.498v1.153c0 .108-.11.176-.202.134L2.614 8.254a.503.503 0 0 0-.042-.028.147.147 0 0 1 0-.252.499.499 0 0 0 .042-.028l3.984-2.933zM7.8 10.386c.068 0 .143.003.223.006.434.02 1.034.086 1.7.271 1.326.368 2.896 1.202 3.94 3.08a.5.5 0 0 0 .933-.305c-.464-3.71-1.886-5.662-3.46-6.66-1.245-.79-2.527-.942-3.336-.971v-.66a1.144 1.144 0 0 0-1.767-.96l-3.994 2.94a1.147 1.147 0 0 0 0 1.946l3.994 2.94a1.144 1.144 0 0 0 1.767-.96v-.667z" />
// 	</svg>
// );

// const ShareIcon = (props) => <Icon component={ShareSvg} {...props} />;

// const Game = ({ history }) => {
// 	const dispatch = useDispatch();
// 	const { id: quizId } = useParams();

// 	const { isLoading, quiz, players, isEnding } = useSelector(
// 		(state) => state.game
// 	);
// 	const currentPlayer = useSelector(selectCurrentPlayer);

// 	const handleEndGame = () => {
// 		dispatch(endGame(quizId));
// 		history.goBack();
// 	};

// 	React.useEffect(() => {
// 		dispatch(fetchInitailState(quizId));
// 	}, []);

// 	if (isLoading) return <PageLoader />;

// 	return (
// 		<div>
// 			<Header
// 				showIcon={false}
// 				title={quiz.name}
// 				tag={<Tag color="blue">{quiz.pin}</Tag>}
// 				extra={[
// 					<Popconfirm
// 						key="end"
// 						title="Are you sure you want to end the quiz?"
// 						okText="Yes"
// 						placement="topRight"
// 						onConfirm={handleEndGame}
// 					>
// 						<Button loading={isEnding}>End Quiz</Button>
// 					</Popconfirm>,
// 					<a
// 						target="_blank"
// 						rel="noopener noreferrer"
// 						s
// 						href={`/quizzes/${quizId}/audience`}
// 					>
// 						<Button type="primary">
// 							Open audience screen <ShareIcon />
// 						</Button>
// 					</a>,
// 				]}
// 			/>
// 			<div style={{ padding: "0.75rem 1.5rem" }}>
// 				<Row>
// 					<Col xs={{ span: 24, order: 2 }} lg={{ span: 4, order: 1 }}>
// 						<PlayersScoreboard
// 							players={players}
// 							currentPlayerId={currentPlayer?.id}
// 						/>
// 					</Col>
// 					<Col xs={{ span: 24, order: 1 }} lg={{ span: 4, order: 3 }}>
// 						<Space align="center" style={{ marginBottom: "1rem" }}>
// 							<label>Category</label>
// 							<Select
// 								style={{ width: 200 }}
// 								onChange={(id) => {
// 									setCategory(
// 										data.data.categories.find((cat) => cat.id === id)
// 									);
// 								}}
// 							>
// 								{data &&
// 									data.data.categories.map(
// 										(
// 											{ id, name, questions_count, remaining_questions_count },
// 											i
// 										) => (
// 											<Option
// 												selected={true}
// 												key={id}
// 												value={id}
// 												disabled={remaining_questions_count < 1}
// 											>
// 												{name} ({questions_count - remaining_questions_count} /{" "}
// 												{questions_count})
// 											</Option>
// 										)
// 									)}
// 							</Select>
// 							<Button
// 								type="primary"
// 								disabled={
// 									!category ||
// 									category.remaining_questions_count < 1 ||
// 									loading ||
// 									time > 0
// 								}
// 								onClick={nextQuestion}
// 							>
// 								Next question
// 							</Button>
// 						</Space>
// 					</Col>
// 				</Row>
// 			</div>
// 		</div>
// 	);
// };

// export default Game;
