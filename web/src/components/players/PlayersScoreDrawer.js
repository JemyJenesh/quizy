import { Drawer } from "antd";

const PlayersScoreDrawer = ({ open, onClose, children }) => {
	return (
		<Drawer
			title="Scoreboard"
			placement="bottom"
			onClose={onClose}
			visible={open}
			height="100%"
		>
			<div style={{ maxWidth: 400, margin: "0 auto" }}>{children}</div>
		</Drawer>
	);
};

export default PlayersScoreDrawer;
