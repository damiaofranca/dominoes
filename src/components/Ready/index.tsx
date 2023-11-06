import { FC, useEffect, useMemo, useState } from "react";
import "./styles.scss";
import { Pieces } from "..";
import { totalPieces } from "../../utils";
import { socket } from "../../socket";

interface IReady {
	initialInfo: {
		id: string;
		name: string;
		pieces: number[][];
		whoStarts: string[];
	};
}

export const Ready: FC<IReady> = ({ initialInfo }) => {
	const [moves, setMoves] = useState<{ side: string; moves: number[][] }[]>([]);
	const piecesElements = useMemo(() => {
		if (initialInfo.pieces.length) {
			return initialInfo.pieces.map((val) => {
				const piece = Object.entries(totalPieces).find((a) => {
					return a[1][0] === val[0] && a[1][1] === val[1];
				});
				if (piece) {
					return piece[0];
				}
			});
		}
		return [];
	}, [initialInfo.pieces]);

	useEffect(() => {
		const updateGameStateEvent = socket.on(
			"updateGameState",
			({ moves }: { moves: { side: string; moves: number[][] }[] }) => {
				setMoves(() => moves);
				console.log(moves);
			},
		);
		return () => {
			updateGameStateEvent.off("updateGameState");
		};
	}, []);

	return (
		<div className="wrapper">
			ready
			<div className="my-pieces">
				<div className="count-pieces">
					<Pieces pieces={piecesElements} />
				</div>
			</div>
		</div>
	);
};
