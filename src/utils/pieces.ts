export const checkIfHavePiece = (
	myPieces: Array<number[]>,
	totalPieces: Array<number[]>,
) => {
	if (totalPieces.length > 0) {
		const isAvailable = myPieces.findIndex(
			(e) =>
				e[0] === totalPieces[0][0] ||
				e[1] === totalPieces[0][0] ||
				e[0] === totalPieces[totalPieces.length - 1][1] ||
				e[1] === totalPieces[totalPieces.length - 1][1],
		);

		return isAvailable !== -1;
	}

	return false;
};
