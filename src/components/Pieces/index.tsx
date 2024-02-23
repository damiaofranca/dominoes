import { FC } from "react";

import "./styles.scss";

interface IPieces {
	pieces: string[];
	onSelectPiece: (move: number[]) => void;
}

export const Pieces: FC<IPieces> = ({ pieces, onSelectPiece }) => {
	const generateNumber = (val: number) => {
		const arr: number[] = [];

		while (arr.length !== val) {
			arr.push(val);
		}

		return arr;
	};
	const onSelectPieceFn = (piece: string) => {
		onSelectPiece([Number(piece[6]), Number(piece[8])]);
	};

	return (
		<>
			{pieces.map((piece) => (
				<div
					key={piece}
					className={piece}
					onClick={() => onSelectPieceFn(piece)}
				>
					<div className={`side-with-${piece ? piece.split("-")[1] : ""}`}>
						{piece ? (
							generateNumber(Number(piece.split("-")[1])).map((_, idx) => (
								<div className={`point point-${idx + 1}`} key={idx}></div>
							))
						) : (
							<></>
						)}
					</div>
					<div className={`side-with-${piece ? piece.split("-")[2] : ""}`}>
						{piece ? (
							generateNumber(Number(piece.split("-")[2])).map((_, idx) => (
								<div className={`point point-${idx + 1}`} key={idx}></div>
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
