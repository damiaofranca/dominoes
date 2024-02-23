import { FC, useState, useEffect } from "react";
import "./styles.scss";

import { socket } from "../../socket/index";
import { useNavigate } from "react-router-dom";
import { useGame } from "../../hooks/useGame";

interface IInitial {}

export const Initial: FC<IInitial> = () => {
	const { onSetRoom } = useGame();
	const navigate = useNavigate();
	const [room, setRoom] = useState<string>("");
	const [maxPlayers, setMaxPlayers] = useState<number>(2);

	const onChangeName = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
		setRoom(target.value);
	};

	const onSelectQuantity = ({
		target,
	}: React.ChangeEvent<HTMLSelectElement>) => {
		setMaxPlayers(Number(target.value));
	};

	const onConnect = () => {
		if (typeof maxPlayers === "number" && room.length >= 3) {
			socket.emit("create", { maxPlayers, room });
		}
	};

	useEffect(() => {
		const enter = socket.on("created", (roomCb: string) => {
			onSetRoom(roomCb);
			navigate(`room/${roomCb}`);
		});

		return () => {
			enter.off("created");
		};
	});

	return (
		<div className="container-card">
			<h1 className="title">Dominó</h1>
			<h4 className="subtitle">
				Uns dos jogos mais tradicionais dos brasileirinhos
			</h4>
			<div className="container-config">
				<label htmlFor="maxPlayer" className="label-field">
					*Digite o nome da sala
				</label>
				<input
					type="text"
					value={room}
					onChange={onChangeName}
					placeholder="Ex:Jogo do bill"
				/>
			</div>

			<div className="container-config">
				<label htmlFor="maxPlayer" className="label-field">
					*Selecione a quantidade de jogadores
				</label>
				<select
					id="maxPlayer"
					value={maxPlayers}
					onChange={onSelectQuantity}
					placeholder="Quantidade maxima de jogadores"
				>
					<option value="2">2 jogadores</option>
					<option value="3">3 jogadores</option>
					<option value="4">4 jogadores</option>
				</select>
				<div className="container-submit">
					<button onClick={onConnect}>Gerar link</button>
				</div>
			</div>
		</div>
	);
};
