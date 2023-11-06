import { FC, useEffect, useState } from "react";
import { StartGame } from "../../components";
import { socket } from "../../socket";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Ready } from "../../components/Ready";

export const InRoom: FC = () => {
	const { id } = useParams();
	const [waitPlayers, setWaitPlayers] = useState<boolean>(false);
	const [isReady, setIsReady] = useState<boolean>(false);
	const [startWith, setStartWith] = useState<{
		id: string;
		name: string;
		pieces: number[][];
		whoStarts: string[];
	} | null>(null);

	const onStart = (name: string) => {
		socket.emit("enterRoom", { name, roomID: id });
	};

	useEffect(() => {
		const strtGame = socket.on("ready", (player) => {
			setIsReady(true);
			setStartWith(player);
		});

		return () => {
			strtGame.off("ready");
		};
	});

	useEffect(() => {
		const enteredRoom = socket.on("enteredRoom", ({ name }) => {
			setWaitPlayers(true);
			toast(`Jogador ${name} entrou na partida.`, {
				position: "top-right",
				autoClose: 1800,
			});
		});

		return () => {
			enteredRoom.off("enteredRoom");
		};
	});

	if (isReady && startWith) {
		console.log(startWith);
		return <Ready initialInfo={startWith} />;
	}

	return (
		<>
			{waitPlayers ? (
				<div>Aguardando jogadores... </div>
			) : (
				<StartGame onFinish={onStart} />
			)}
		</>
	);
};
