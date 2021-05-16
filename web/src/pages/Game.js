import { useEffect, useState } from "react";
import { Button, List, Popconfirm, Row, Col, Tag, Space, Select } from "antd";
import { useDeleteGame, useGame } from "api";
import { AppLayout, Header, PageLoader, PlayersList } from "components";
import { useParams } from "react-router";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { axios } from "utils/axios";

const { Option } = Select;

const Game = ({ history }) => {
	const { id } = useParams();

	const [category, setCategory] = useState(null);
	const [loading, setLoading] = useState(false);

	const { data, isLoading, refetch } = useGame(id);
	const { mutate } = useDeleteGame();

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

	if (isLoading)
		return (
			<AppLayout>
				<PageLoader />
			</AppLayout>
		);

	return (
		<AppLayout>
			<Header
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
						<Button type="dashed">End Quiz</Button>
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
									console.log(
										data.data.categories.find((cat) => cat.id === id)
									);
									setCategory(
										data.data.categories.find((cat) => cat.id === id)
									);
								}}
							>
								{data &&
									data.data.categories.map(
										({
											id,
											name,
											questions_count,
											remaining_questions_count,
										}) => (
											<Option
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
									!category || category.remaining_questions_count < 1 || loading
								}
								onClick={nextQuestion}
							>
								Next question
							</Button>
						</Space>
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
		</AppLayout>
	);
};

export default Game;
