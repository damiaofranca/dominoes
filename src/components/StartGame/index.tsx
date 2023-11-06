import { FC, useState } from "react";
import "./styles.scss";

interface IStartGame {
	onFinish: (name: string) => void;
}

export const StartGame: FC<IStartGame> = ({ onFinish }) => {
	const [name, setName] = useState<string>("");

	const onStart = () => {
		if (name.length >= 3) {
			onFinish(name);
		} else {
			alert("O apelido deve ter pelo menos 3 letras");
		}
	};

	return (
		<div className="container-card">
			<h1 className="title">Dominó</h1>
			<h4 className="subtitle">
				Uns dos jogos mais tradicionais dos brasileirinho
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
					<button onClick={onStart} disabled={name.length < 3}>
						Entrar
					</button>
				</div>
			</div>
		</div>
	);
};
