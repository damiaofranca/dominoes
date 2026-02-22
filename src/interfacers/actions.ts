export interface NewMove {
	move: number[];
	players: Player[];
	whoPlayed: string;
	direction: "top" | "bottom";
	boardTiles?: number[][];
}

export interface Player {
	id: string;
	name?: string;
	total: number;
}

export interface InfoPlayer {
	id: string;
	name: string;
	initial: boolean;
}
