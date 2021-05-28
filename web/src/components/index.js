// shared
import AppLayout from "./shared/AppLayout";
import AppLoader from "./shared/AppLoader";
import PageLoader from "./shared/PageLoader";
import AuthRoute from "./shared/AuthRoute";
import GuestRoute from "./shared/GuestRoute";
import Header from "./shared/Header";
// categories
import CategoriesCreateModal from "./categories/CategoriesCreateModal";
import CategoriesEditModal from "./categories/CategoriesEditModal";
import CategoriesTable from "./categories/CategoriesTable";
// questions
import QuestionsCreateModal from "./questions/QuestionsCreateModal";
import QuestionsEditModal from "./questions/QuestionsEditModal";
import QuestionsTable from "./questions/QuestionsTable";
// quizzes
import QuizzesTable from "./quizzes/QuizzesTable";
import QuizzesCreateModal from "./quizzes/QuizzesCreateModal";
import QuizzesEditModal from "./quizzes/QuizzesEditModal";
import QuizQuestionsTable from "./quizzes/QuizQuestionsTable";
// players
import PlayersList from "./players/PlayersList";
import PlayerInfo from "./players/PlayerInfo";
import GuestLayout from "./shared/GuestLayout";
import PlayersScoreDrawer from "./players/PlayersScoreDrawer";
import If from "./shared/If";
import PlayersScoreboard from "./players/PlayersScoreboard";
import PlayerHeader from "./players/PlayerHeader";
export {
	// shared
	If,
	AppLayout,
	GuestLayout,
	AuthRoute,
	GuestRoute,
	AppLoader,
	PageLoader,
	Header,
	// categories
	CategoriesTable,
	CategoriesCreateModal,
	CategoriesEditModal,
	// questions
	QuestionsTable,
	QuestionsCreateModal,
	QuestionsEditModal,
	// quizzes
	QuizzesTable,
	QuizzesCreateModal,
	QuizzesEditModal,
	QuizQuestionsTable,
	// players
	PlayersList,
	PlayerInfo,
	PlayersScoreDrawer,
	PlayersScoreboard,
	PlayerHeader,
};
