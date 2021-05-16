import { message } from "antd";
import {
	useCreateGame,
	useCreateQuiz,
	useDeleteQuiz,
	useQuizzes,
	useUpdateQuiz,
} from "api";
import {
	AppLayout,
	Header,
	QuizzesCreateModal,
	QuizzesEditModal,
	QuizzesHeader,
	QuizzesTable,
} from "components";
import { useState } from "react";
import { useQueryClient } from "react-query";

const Quizzes = ({ history }) => {
	const queryClient = useQueryClient();
	const [visible, setVisible] = useState(false);

	const [quiz, setQuiz] = useState(null);
	const openEditModal = (id) => {
		const { data: quizzes } = queryClient.getQueryData("quizzes");
		const q = quizzes.find((quiz) => quiz.id === id);
		setQuiz(q);
	};

	const { data, isLoading, isFetching, refetch } = useQuizzes();
	const { mutate } = useCreateQuiz();
	const { mutate: deleteQuiz } = useDeleteQuiz();
	const { mutate: updateQuiz } = useUpdateQuiz();

	const toggleModal = () => setVisible(!visible);

	const handleCreate = (value, afterCreate) => {
		mutate(value, {
			onError: (err) => {
				message.error(err.response.data.errors.name[0]);
			},
			onSuccess: (data) => {
				message.success(`${data.data.name} has been created!`);
				afterCreate();
			},
		});
	};

	const handleEdit = (data, afterUpdate) => {
		updateQuiz(data, {
			onError: (err) => {
				message.error(err.response.data.errors.name[0]);
			},
			onSuccess: (data) => {
				message.success(`${data.data.name} has been updated!`);
				afterUpdate();
			},
		});
	};

	const handleDelete = (id) => {
		deleteQuiz(id, {
			onError: (err) => {
				message.error(err.response.data.message);
			},
			onSuccess: (data) => {
				message.success(`${data.data.name} has been deleted!`);
			},
		});
	};

	const gotoDetailsPage = (id) => history.push(`/quizzes/${id}`);

	const { mutate: mutateGame } = useCreateGame();
	const hostQuiz = (id) => {
		mutateGame(
			{ quiz_id: id },
			{ onSuccess: () => history.push(`/quizzes/${id}/game`) }
		);
	};

	return (
		<AppLayout>
			{quiz && (
				<QuizzesEditModal
					quiz={quiz}
					handleClose={() => setQuiz(null)}
					handleEdit={handleEdit}
				/>
			)}
			<QuizzesCreateModal
				visible={visible}
				handleClose={toggleModal}
				handleCreate={handleCreate}
			/>
			<Header
				title="Quizzes"
				handleRefresh={refetch}
				handleCreate={toggleModal}
			/>
			<QuizzesTable
				data={!isLoading && data.data}
				loading={isLoading || isFetching}
				handleDelete={handleDelete}
				handleEdit={openEditModal}
				handleDetail={gotoDetailsPage}
				handleHosting={hostQuiz}
			/>
		</AppLayout>
	);
};

export default Quizzes;
