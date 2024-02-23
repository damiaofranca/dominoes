import { useContext } from "react";
import { GameContext } from "../providers/Game";

export const useGame = () => {
	const ctx = useContext(GameContext);

	if (!ctx) {
		throw new Error("GameContext not wrapped.");
	}
	return ctx;
};
