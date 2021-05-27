import { useEffect, useState } from "react";
import echo from "utils/echo";

const useQuizRealtime = (quizId) => {
	const [quiz, setQuiz] = useState(null);
	const [question, setQuestion] = useState(null);
	const [hasEnded, setHasEnded] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		echo.channel(`quiz-${quizId}`).listen("QuizEnded", (e) => {
			setHasEnded(true);
		});

		return () => {
			echo.leaveChannel(`quiz-${quizId}`);
		};
	}, [quizId]);

	return { isLoading, quiz, question, hasEnded };
};

export default useQuizRealtime;
