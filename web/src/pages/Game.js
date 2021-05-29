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
					<Col span={6}>
						<PlayersList quizId={id} turn={data && data.data.turn} />
					</Col>
					<Col span={18}>
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
