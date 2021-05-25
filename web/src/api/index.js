// questions
import useCreateQuestion from "./questions/useCreateQuestion";
import useDeleteQuestion from "./questions/useDeleteQuestion";
import useQuestions from "./questions/useQuestions";
import useUpdateQuestion from "./questions/useUpdateQuestion";
// quizzes
import useQuizzes from "./quizzes/useQuizzes";
import useUpdateQuiz from "./quizzes/useUpdateQuiz";
import useCreateQuiz from "./quizzes/useCreateQuiz";
import useDeleteQuiz from "./quizzes/useDeleteQuiz";
import useQuiz from "./quizzes/useQuiz";
import useCreateQuizQuestions from "./quizzes/useCreateQuizQuestions";
import useGame from "./games/useGame";
import useCreateGame from "./games/useCreateGame";
import useDeleteGame from "./games/useDeleteGame";
import useIndex from "./useIndex";
import useShow from "./useShow";
import useDelete from "./useDelete";
import useCreate from "./useCreate";
import useUpdate from "./useUpdate";

export {
	// questions
	useQuestions,
	useCreateQuestion,
	useUpdateQuestion,
	useDeleteQuestion,
	// quizzes
	useQuiz,
	useQuizzes,
	useCreateQuiz,
	useUpdateQuiz,
	useDeleteQuiz,
	useCreateQuizQuestions,
	// games
	useGame,
	useCreateGame,
	useDeleteGame,
	// api
	useIndex,
	useShow,
	useDelete,
	useCreate,
	useUpdate,
};
