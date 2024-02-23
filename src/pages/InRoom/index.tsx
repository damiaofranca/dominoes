import { FC } from "react";

import { StartGame } from "../../components";
import { useGame } from "../../hooks/useGame";
import { Ready } from "../../components/Ready";
import { useParams } from "react-router-dom";

export const InRoom: FC = () => {
	const { room } = useParams();
	const { infoPlayer, waitPlayers, onVerifyRoom, onStart } = useGame();

	if (room) {
		onVerifyRoom(room);
	}

	if (infoPlayer && room) {
		return <Ready />;
	}

	return (
		<>
			{waitPlayers ? (
				<div>Aguardando jogadores... </div>
			) : (
				<StartGame onStart={onStart} />
			)}
		</>
	);
};
