/* eslint-disable no-mixed-spaces-and-tabs */
import { FC, useMemo } from "react";

import "./styles.scss";
import { Moves, Pieces } from "..";
import { useGame } from "../../hooks/useGame";
import CloseIcon from "../../assets/icons/CloseIcon";
import BasketIcon from "../../assets/icons/BasketIcon";
import ArrowUpIcon from "../../assets/icons/ArrowUpIcon";
import ArrowDownIcon from "../../assets/icons/ArrowDownIcon";
import DisconnectIcon from "../../assets/icons/Disconnect";

interface IReady {}

export const Ready: FC<IReady> = () => {
	const {
		moves,
		myPieces,
		isYourTime,
		selectedPiece,

		onMove,
		onSignOut,
		onSelectPiece,
		onAskForPiece,
		onClearPieceSelected,
	} = useGame();

	const onAskForPieceFn = () => {
		if (isYourTime) {
			onAskForPiece();
		}
	};

	const onClear = () => {
		if (selectedPiece.length === 2) {
			onClearPieceSelected();
		}
	};

	const onMoveToBottom = () => {
		if (selectedPiece.length === 2) {
			onMove("bottom");
		}
	};

	const onMoveToTop = () => {
		if (selectedPiece.length === 2) {
			onMove("top");
		}
	};

	const onSignOutFn = () => {
		onSignOut();
	};

	const piecesElements = useMemo(() => {
		return myPieces
			? myPieces.map((val) => {
					return `piece-${val[0]}-${val[1]}`;
			  })
			: [];
	}, [myPieces]);

	const MovesMemo = useMemo(() => {
		return <Moves pieces={moves} key={moves.length} />;
	}, [moves]);
	return (
		<div className="wrapper">
			<div className="my-pieces">
				<div className="count-pieces">
					<Pieces pieces={piecesElements} onSelectPiece={onSelectPiece} />
				</div>
			</div>
			<div className="moves-container">
				<div className="moves">{MovesMemo}</div>
			</div>

			<div className="actions-container">
				<p className="actions-title">Ações</p>
				<div className="actions">
					<button
						title="Inserir acima"
						onClick={onMoveToTop}
						className={"action-btn"}
						disabled={selectedPiece.length < 2}
					>
						<ArrowUpIcon />
					</button>

					<button
						title="Inserir em baixo"
						onClick={onMoveToBottom}
						className={"action-btn"}
						disabled={selectedPiece.length < 2}
					>
						<ArrowDownIcon />
					</button>

					<button
						onClick={onClear}
						title="Cancelar ação"
						className={"action-btn"}
						disabled={selectedPiece.length < 2}
					>
						<CloseIcon />
					</button>
					<button
						title="Pedir peça"
						className={"action-btn"}
						onClick={onAskForPieceFn}
						disabled={!isYourTime}
					>
						<BasketIcon />
					</button>
					<button
						title="Disconectar"
						onClick={onSignOutFn}
						className={"action-btn"}
					>
						<DisconnectIcon />
					</button>
				</div>
			</div>
		</div>
	);
};
