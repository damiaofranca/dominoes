export interface NewMove {
	move: number[];
	players: Player[];
	whoPlayed: string;
	direction: "top" | "bottom";
}

export interface Player {
	id: string;
	total: number;
}

export interface InfoPlayer {
	id: string;
	name: string;
	initial: boolean;
}
