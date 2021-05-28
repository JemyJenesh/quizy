import { Drawer } from "antd";
import PlayersScoreboard from "./PlayersScoreboard";

const PlayersScoreDrawer = ({ open, onClose, quizId }) => {
	return (
		<Drawer
			title="Scoreboard"
			placement="bottom"
			onClose={onClose}
			visible={open}
			height="100%"
		>
			<div style={{ maxWidth: 360, margin: "0 auto" }}>
				<PlayersScoreboard quizId={quizId} />
			</div>
		</Drawer>
	);
};

export default PlayersScoreDrawer;
