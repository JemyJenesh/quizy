import { message } from "antd";
import { useEffect, useState } from "react";
import { axios } from "utils/axios";
import echo from "utils/echo";

const usePlayersRealtime = (quizId, playerId = null) => {
	const [players, setPlayers] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isKicking, setIsKicking] = useState(false);

	const kickPlayer = async (id) => {
		setIsKicking(true);
		try {
			const { status } = await axios.delete(`/players/${id}`);
			if (status === 200) {
				message.success("Player removed!");
			}
		} catch (err) {
			if (err.response) {
				message.error("Couldn't remove player!");
			}
		} finally {
			setIsKicking(false);
		}
	};

	useEffect(() => {}, []);

	useEffect(() => {
		if (quizId) {
			setIsLoading(true);
			(async () => {
				setIsLoading(true);
				try {
					const { data, status } = await axios(`/quizzes/${quizId}/players`);
					if (status === 200) {
						setPlayers(data.data.sort((a, b) => b.score - a.score));
					}
				} catch (err) {
					if (err.response) {
						message.error("Oops! Something went wrong.");
					}
				} finally {
					setIsLoading(false);
				}
			})();

			echo.channel(`quiz-${quizId}`).listen("PlayerJoined", (e) => {
				message.success(`${e.player.name} has joined the quiz!`);
				setPlayers((prev) => [...prev, e.player]);
			});

			echo.channel(`quiz-${quizId}`).listen("PlayerKicked", (e) => {
				let kickedPlayer = e.player;
				let samePlayer =
					playerId && kickedPlayer.id.toString() === playerId.toString();
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

			return () => {
				echo.leaveChannel(`quiz-${quizId}`);
			};
		}
	}, [quizId, playerId]);

	return { players, isLoading, kickPlayer, isKicking };
};

export default usePlayersRealtime;
