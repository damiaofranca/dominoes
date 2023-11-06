import { FC, useState, useEffect } from "react";
import "./styles.css";

import { socket } from "../../socket/index";
import { useNavigate } from "react-router-dom";

interface IInitial {}

export const Initial: FC<IInitial> = () => {
	const navigate = useNavigate();
	const [maxPlayers, setMaxPlayers] = useState<number>(2);

	const onConnect = () => {
		if (typeof maxPlayers === "number") {
			socket.emit("createRoom", maxPlayers);
		}
		return null;
	};

	useEffect(() => {
		const enterRoom = socket.on(
			"roomCreated",
			({ roomID }: { roomID: string }) => {
				navigate(`room/${roomID}`);
			},
		);

		return () => {
			enterRoom.off("roomCreated");
		};
	});

	return (
		<div className="container-card">
			<h1 className="title">Dominó</h1>
			<h4 className="subtitle">
				Uns dos jogos mais tradicionais dos brasileirinho
			</h4>
			<div className="container-config">
				<label htmlFor="maxPlayer" className="label-field">
					*Selecione a quantidade de jogadores
				</label>
				<select
					id="maxPlayer"
					value={maxPlayers}
					placeholder="Quantidade maxima de jogadores"
					onChange={({ target }) => setMaxPlayers(Number(target.value))}
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
