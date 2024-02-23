import { FC } from "react";

import "./styles.scss";

interface IMoves {
	pieces: Array<number[]>;
}

export const Moves: FC<IMoves> = ({ pieces }) => {
	const generateNumber = (val: number) => {
		const arr: number[] = [];

		while (arr.length !== val) {
			arr.push(val);
		}

		return arr;
	};

	return (
		<>
			{pieces.map((piece, idx) => (
				<div key={idx} className={`piece-${piece[0]}-${piece[1]}`}>
					<div className={`side-with-${piece ? piece[0] : ""}`}>
						{piece ? (
							generateNumber(piece[0]).map((_, idx) => (
								<div className={`point point-${idx + 1} top`} key={idx}></div>
							))
						) : (
							<></>
						)}
					</div>
					<div className={`side-with-${piece ? piece[1] : ""}`}>
						{piece ? (
							generateNumber(piece[1]).map((_, idx) => (
								<div
									className={`point point-${idx + 1} bottom`}
									key={idx}
								></div>
							))
						) : (
							<></>
						)}
					</div>
				</div>
			))}
		</>
	);
};
