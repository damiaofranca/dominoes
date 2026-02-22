import { InfoPlayer, Player } from "../../interfacers/actions";

export interface IGameContext {
	isYourTime: boolean;
	room: string | null;
	myPieces: number[][];
	waitPlayers: boolean;
	moves: Array<number[]>;
	selectedPiece: number[];
	infoPlayer: InfoPlayer | null;
	/** Resumo dos outros jogadores (id, name, total de peças) - atualizado em newMove e playerDrewPiece */
	playersSummary: Player[];

	onSignOut: () => void;
	onAskForPiece: () => void;
	onClearPieceSelected: () => void;
	onSetRoom: (room: string) => void;
	onVerifyRoom: (room: string) => void;
	onSelectPiece: (move: number[]) => void;
	onStart: (values: { name: string }) => void;
	onMove: (direction: "top" | "bottom") => void;
}
