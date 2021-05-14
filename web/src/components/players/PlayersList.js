import {
	Badge,
	Button,
	List,
	message,
	Typography,
	Tooltip,
	notification,
	Empty,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { forwardRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { selectUser } from "store/authSlice";
import { axios } from "utils/axios";
import echo from "utils/echo";
import FlipMove from "react-flip-move";

const PlayersList = ({ quizId, turn }) => {
	const params = useParams();
	const history = useHistory();
	const user = useSelector(selectUser);
	const [players, setPlayers] = useState([]);
	const [loading, setLoading] = useState(false);

	const kickPlayer = (id) => {
		axios
			.delete(`/players/${id}`)
			.then((res) => {
				if (res.status === 200) {
					message.success("nice");
				}
			})
			.catch((err) => {
				if (err.response) {
					message.error("ops");
				}
			});
	};

	useEffect(() => {
		setLoading(true);
		axios(`/quizzes/${quizId}/players`)
			.then((res) => {
				if (res.status === 200) {
					setPlayers(res.data.data.sort((a, b) => b.score - a.score));
				}
			})
			.catch((err) => {
				if (err.response) {
					message.error("Oops! Something went wrong.");
				}
			})
			.finally(() => {
				setLoading(false);
			});
	}, [quizId]);

	useEffect(() => {
		echo.channel(`quiz-${quizId}`).listen("PlayerJoined", (e) => {
			message.success(`${e.player.name} has joined the quiz!`);
			setPlayers((prev) => [...prev, e.player]);
		});

		echo.channel(`quiz-${quizId}`).listen("PlayerKicked", (e) => {
			let kickedPlayer = e.player;
			if (params.playerId) {
				let samePlayer =
					kickedPlayer.id.toString() === params.playerId.toString();
				if (samePlayer) {
					setTimeout(() => {
						history.push("/");
					}, 2000);
					message.error(`You has been kicked out of the quiz!`);
				} else {
					message.warning(`${e.player.name} has been kicked out of the quiz!`);
				}
			}
			setPlayers((prev) =>
				prev.filter((player) => player.id !== kickedPlayer.id)
			);
		});

		echo.channel(`quiz-${quizId}`).listen("PlayerAnswered", (e) => {
			if (e.correct === null) {
				notification.warning({
					message: "Time's Up!",
				});
			} else if (e.correct) {
				notification.success({
					message: "Correct Answer!",
				});
			} else {
				notification.error({
					message: "Wrong Answer!",
				});
			}
			setPlayers(e.players.sort((a, b) => b.score - a.score));
		});

		return () => {
			echo.leaveChannel(`quiz-${quizId}`);
		};
	}, [quizId, history, params.playerId]);

	return (
		<List
			size="small"
			loading={loading}
			dataSource={players && players}
			header={
				<Typography.Title level={5} style={{ margin: 0 }}>
					Players
				</Typography.Title>
			}
			bordered
			itemLayout="horizontal"
		>
			<FlipMove>
				{players && players.length > 0 ? (
					players.map(({ id, name, score, order }) => (
						<Wrapper key={id}>
							<List.Item
								style={{ backgroundColor: order === turn ? "#E6F7FF" : "#fff" }}
								actions={[
									user && turn < 1 ? (
										<Tooltip title="Kick" key="kick">
											<Button
												shape="circle"
												danger
												icon={<DeleteOutlined />}
												onClick={() => kickPlayer(id)}
											></Button>
										</Tooltip>
									) : (
										<Badge key="score" count={score} />
									),
								]}
							>
								{name}
							</List.Item>
						</Wrapper>
					))
				) : (
					<Empty />
				)}
			</FlipMove>
		</List>
	);
};

const Wrapper = forwardRef((props, ref) => (
	<div ref={ref}>{props.children}</div>
));

export default PlayersList;
