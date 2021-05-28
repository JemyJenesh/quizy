import { useEffect, useState } from "react";
import echo from "utils/echo";
import { axios } from "utils/axios";
import { message } from "antd";

const useQuizRealtime = (quizId, playerOrder = null, onEventStart) => {
	const [quiz, setQuiz] = useState(null);
	const [question, setQuestion] = useState(null);
	const [hasEnded, setHasEnded] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const timer = useRef();

	const isTurn = playerOrder && playerOrder === quiz.turn;
	const [time, setTime] = useState(0);

	const [isChanging, setIsChanging] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isPassing, setIsPassing] = useState(false);

	const changeQuestion = async ({ category_id }, cb) => {
		setIsChanging(true);
		try {
			const { status } = await axios.put(`/games/${id}`, {
				category_id,
			});
			if (status === 200) {
				cb();
			}
		} catch (err) {
			message.error("Couldn't change question");
		} finally {
			setIsChanging(true);
		}
	};

	const submitAnswer = async ({ option_id, player_id }, cb) => {
		setIsSubmitting(true);
		clearInterval(timer.current);
		setTime(0);
		try {
			await axios.post("/answer", {
				option_id,
				player_id,
			});
		} catch (err) {
			if (err.response) {
				message.error("Something went wrong!");
			}
		} finally {
			setIsSubmitting(false);
			cb();
		}
	};

	const passQuestion = async ({ player_id }, cb) => {
		setIsPassing(true);
		clearInterval(timer.current);
		setTime(0);
		try {
			await axios.post("/pass", {
				player_id,
			});
		} catch (err) {
			if (err.response) {
				message.error("Something went wrong!");
			}
		} finally {
			setIsPassing(false);
			cb();
		}
	};

	useEffect(() => {
		if (quizId) {
			setIsLoading(true);
			axios(`/quizzes/${quizId}`)
				.then((res) => {
					if (res.status === 200) {
						console.log(res);
					}
				})
				.catch((err) => {
					if (err.response) {
						message.error("Couldn't fetch quiz!");
					}
				})
				.finally(() => {
					setIsLoading(false);
				});
			echo.channel(`quiz-${quizId}`).listen("QuestionChanged", (e) => {
				onEventStart();
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
				onEventStart();
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

			echo.channel(`quiz-${quizId}`).listen("PlayerAnswered", (e) => {
				setTime(0);
				clearInterval(timer.current);
			});

			echo.channel(`quiz-${quizId}`).listen("QuizEnded", (e) => {
				setHasEnded(true);
			});

			return () => {
				echo.leaveChannel(`quiz-${quizId}`);
			};
		}
	}, [quizId]);

	return {
		isLoading,
		quiz,
		question,
		hasEnded,
		changeQuestion,
		isChanging,
		submitAnswer,
		isSubmitting,
		passQuestion,
		isPassing,
		time,
	};
};

export default useQuizRealtime;
