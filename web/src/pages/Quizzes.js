import { useIndex } from "api";
import {
	AppLayout,
	Header,
	QuizzesCreateModal,
	QuizzesEditModal,
	QuizzesTable,
} from "components";
import { useState } from "react";
import { useQueryClient } from "react-query";

const Quizzes = ({ history }) => {
	const queryClient = useQueryClient();
	const [visible, setVisible] = useState(false);

	const [quiz, setQuiz] = useState(null);
	const openEditModal = (id) => {
		const { data: quizzes } = queryClient.getQueryData("/quizzes");
		const q = quizzes.find((quiz) => quiz.id === id);
		setQuiz(q);
	};

	const { data, isLoading, isFetching, refetch } = useIndex("/quizzes");

	const toggleModal = () => setVisible(!visible);

	const gotoDetailsPage = (id) => history.push(`/quizzes/${id}`);

	return (
		<AppLayout>
			<QuizzesEditModal quiz={quiz} handleClose={() => setQuiz(null)} />
			<QuizzesCreateModal visible={visible} handleClose={toggleModal} />
			<Header
				title="Quizzes"
				handleRefresh={refetch}
				handleCreate={toggleModal}
			/>
			<QuizzesTable
				data={!isLoading && data.data}
				loading={isLoading || isFetching}
				handleEdit={openEditModal}
				handleDetail={gotoDetailsPage}
			/>
		</AppLayout>
	);
};

export default Quizzes;
