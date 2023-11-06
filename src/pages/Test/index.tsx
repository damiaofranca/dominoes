import { Pieces } from "../../components";

export function Test() {
	return (
		<div style={{ display: "flex", flexWrap: "wrap" }}>
			<Pieces
				pieces={[
					[6, 6],
					[6, 5],
					[6, 4],
					[6, 3],
					[6, 2],
					[6, 1],
					[6, 0],
					[5, 5],
					[5, 4],
					[5, 3],
					[5, 2],
					[5, 1],
					[5, 0],
					[4, 4],
					[4, 3],
					[4, 2],
					[4, 1],
					[4, 0],
					[3, 3],
					[3, 2],
					[3, 1],
					[3, 0],
					[2, 2],
					[2, 1],
					[2, 0],
					[1, 1],
					[1, 0],
					[0, 0],
				]}
			/>
		</div>
	);
}
