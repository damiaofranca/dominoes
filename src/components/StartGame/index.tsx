import { FC, useState } from "react";

import "./styles.scss";
import { IGameContext } from "../../providers/Game/types";

interface IStartGame extends Pick<IGameContext, "onStart"> {}

export const StartGame: FC<IStartGame> = ({ onStart }) => {
	const [name, setName] = useState<string>("");

	const onStartFn = () => {
		if (name.length >= 3) {
			onStart({ name });
		} else {
			alert("O apelido deve ter pelo menos 3 letras");
		}
	};

	return (
		<div className="container-card">
			<h1 className="title">Dominó</h1>
			<h4 className="subtitle">
				Uns dos jogos mais tradicionais dos brasileirinhos
			</h4>
			<div className="container-config">
				<label htmlFor="name" className="label-field">
					*Digite seu nickname
				</label>
				<input
					id="name"
					value={name}
					className="name-field"
					placeholder="Insira seu apelido"
					onChange={({ target }) => setName(target.value)}
				/>

				<div className="container-submit">
					<button onClick={onStartFn} disabled={name.length < 3}>
						Entrar
					</button>
				</div>
			</div>
		</div>
	);
};
