/* eslint-disable react-hooks/exhaustive-deps */
import { toast } from "react-toastify";
import { FC, useState, useEffect, ReactNode, createContext } from "react";

import { socket } from "../../socket";
import { IGameContext } from "./types";
import { InfoPlayer, NewMove, Player } from "../../interfacers/actions";
import { checkIfHavePiece } from "../../utils";

interface IGame {
	children: ReactNode;
}

export const GameContext = createContext<IGameContext>({} as IGameContext);

export const GameProvider: FC<IGame> = ({ children }) => {
	const [moves, setMoves] = useState<Array<number[]>>([]);

	const [isYourTime, setIsYourTime] = useState<boolean>(false);
	const [waitPlayers, setWaitPlayers] = useState<boolean>(false);
	const [selectedPiece, setSelectedPiece] = useState<number[]>([]);

	const [infoPlayer, setInfoPlayer] = useState<InfoPlayer | null>(() => {
		const _info = localStorage.getItem("info");
		if (_info) {
			return JSON.parse(_info) as InfoPlayer;
		}
		return null;
	});

	const [myPieces, setMyPieces] = useState<Array<number[]>>(() => {
		const _pieces = localStorage.getItem("pieces");
		if (_pieces) {
			return JSON.parse(_pieces) as Array<number[]>;
		}
		return [];
	});

	const [roomSaved, setRoomSaved] = useState<string | null>(() =>
		localStorage.getItem("room"),
	);

	const [playersSummary, setPlayersSummary] = useState<Player[]>([]);

	const onStart = ({ name }: { name: string }) => {
		if (roomSaved) {
			socket.emit("enter", { name, room: roomSaved }, (remaining: number) => {
				if (remaining !== 0) {
					if (!waitPlayers) {
						setWaitPlayers(true);
					}
				} else {
					if (waitPlayers) {
						setWaitPlayers(false);
					}
				}
			});
		}
	};

	const onSetRoom = (room: string) => {
		localStorage.setItem("room", room);
		setRoomSaved(room);
	};

	const onSelectPiece = (move: number[]) => {
		if (isYourTime) {
			setSelectedPiece(move);
		}
	};

	const onClearPieceSelected = () => {
		setSelectedPiece([]);
	};

	const onMove = (direction: "top" | "bottom") => {
		if (selectedPiece.length === 2 && isYourTime && roomSaved && infoPlayer) {
			socket.emit("makeMove", {
				direction,
				roomID: roomSaved,
				id: infoPlayer.id,
				move: selectedPiece,
			});
			setSelectedPiece([]);
			setIsYourTime(false);
		}
	};

	const onAskForPiece = () => {
		if (infoPlayer && myPieces.length && roomSaved) {
			if (!checkIfHavePiece(myPieces, moves)) {
				socket.emit(
					"askForPiece",
					{ roomID: roomSaved, id: infoPlayer.id },
					(value: number[] | string) => {
						if (Array.isArray(value)) {
							setMyPieces((pieces) => {
								const newArr = [...pieces];
								newArr.push(value);
								return newArr;
							});
						} else {
							toast.info(value, {
								autoClose: 800,
							});
						}
					},
				);
			} else {
				toast.info("Você têm peças que podem ser jogadas.");
			}
		}
	};

	const onVerifyRoom = (room: string) => {
		socket.emit(
			"verifyRoom",
			{ room, user: infoPlayer?.id },
			(isValid: boolean) => {
				if (isValid) {
					onSetRoom(room);
				} else {
					toast.error(
						"Sala não está disponível (cheia, inexistente ou já iniciada).",
					);
					window.location.href = "/";
				}
			},
		);
	};

	const onSignOut = () => {
		if (roomSaved && infoPlayer) {
			socket.emit("disconnect-user", {
				roomID: roomSaved,
				playerID: infoPlayer.id,
			});
		}
	};

	useEffect(() => {
		const ready = socket.on("gameCancelled", (message: string) => {
			toast.info(message);
			setTimeout(() => {
				localStorage.clear();
				window.location.href = "/";
			}, 800);
		});

		return () => {
			ready.off("gameCancelled");
		};
	});

	useEffect(() => {
		const ready = socket.on("winner", (message: string) => {
			toast.success(message);
			setTimeout(() => {
				localStorage.clear();
				window.location.reload();
			}, 800);
		});

		return () => {
			ready.off("winner");
		};
	});

	useEffect(() => {
		const ready = socket.on("ready", ({ pieces, players, ...rest }) => {
			setInfoPlayer(() => {
				localStorage.setItem("info", JSON.stringify(rest));

				return rest;
			});
			setMyPieces(() => {
				localStorage.setItem("pieces", JSON.stringify(pieces));

				return pieces;
			});
			if (players?.length) {
				setPlayersSummary(players);
			}
		});

		return () => {
			ready.off("ready");
		};
	}, []);

	const updateHandListener = (move: number[]) => {
		if (myPieces.length) {
			setMyPieces((prevMyPieces) => {
				return prevMyPieces.filter(
					(e) =>
						!(e[0] === move[0] && e[1] === move[1]) &&
						!(e[0] === move[1] && e[1] === move[0]),
				);
			});
		}
	};

	useEffect(() => {
		const dontExist = socket.on("DontExist", () => {
			toast.error("Sala não existe ou foi encerrada.");
			localStorage.clear();
			setInfoPlayer(null);
			setRoomSaved(null);
			window.location.href = "/";
		});

		return () => {
			dontExist.off("DontExist");
		};
	}, []);

	useEffect(() => {
		const playerNotFound = socket.on("playerNotFound", (message?: string) => {
			setIsYourTime(true);
			toast.error(message ?? "Sala não encontrada. Tente novamente.", {
				autoClose: 2000,
			});
		});

		return () => {
			playerNotFound.off("playerNotFound");
		};
	}, []);

	useEffect(() => {
		const updateHand = socket.on("updateHand", (hand: number[][]) => {
			setMyPieces(hand);
			localStorage.setItem("pieces", JSON.stringify(hand));
		});

		return () => {
			updateHand.off("updateHand");
		};
	}, []);

	useEffect(() => {
		const playerDrewPiece = socket.on(
			"playerDrewPiece",
			({
				players,
				passedTurn,
				playerID,
			}: {
				players: Player[];
				passedTurn?: boolean;
				playerID: string;
			}) => {
				setPlayersSummary(players);
				if (passedTurn && playerID !== infoPlayer?.id) {
					toast.info("Um jogador passou a vez.", { autoClose: 800 });
				}
			},
		);

		return () => {
			playerDrewPiece.off("playerDrewPiece");
		};
	}, [infoPlayer?.id]);
	useEffect(() => {
		const full = socket.on("full", () => {
			toast.error("Sala cheia ou jogo já iniciado. Redirecionando...", {
				position: "top-right",
				autoClose: 2500,
			});
			localStorage.removeItem("room");
			setRoomSaved(null);
			setInfoPlayer(null);
			setMyPieces([]);
			setTimeout(() => {
				window.location.href = "/";
			}, 800);
		});

		return () => {
			full.off("full");
		};
	}, []);

	useEffect(() => {
		const nextPlayer = socket.on("nextPlayer", () => {
			setIsYourTime(true);
			toast.info("Sua vez!", { autoClose: 600 });
		});
		return () => {
			nextPlayer.off("nextPlayer");
		};
	}, []);

	useEffect(() => {
		const invalidMove = socket.on("invalidMove", () => {
			setIsYourTime(true);
			toast.error("Movimento inválido. Tente novamente.", { autoClose: 1200 });
		});
		return () => {
			invalidMove.off("invalidMove");
		};
	}, []);

	useEffect(() => {
		const handleNewMove = (values: NewMove) => {
			if (values.whoPlayed === infoPlayer?.id) {
				updateHandListener(values.move);
			}

			if (values.players?.length) {
				setPlayersSummary(values.players);
			}

			if (Array.isArray(values.boardTiles)) {
				setMoves(values.boardTiles);
				return;
			}

			setMoves((prevMoves) => {
				const inverseVal = [...values.move].reverse();
				if (prevMoves.length > 0) {
					const isTopDirection = values.direction === "top";

					if (isTopDirection) {
						return [
							values.move[1] === prevMoves[0][0] ? values.move : inverseVal,
							...prevMoves,
						];
					} else {
						return [
							...prevMoves,
							values.move[0] === prevMoves[prevMoves.length - 1][1]
								? values.move
								: inverseVal,
						];
					}
				}

				return [...prevMoves, values.move];
			});
		};

		const newMoveListener = socket.on("newMove", handleNewMove);

		return () => {
			newMoveListener.off("newMove");
		};
	}, [infoPlayer]);

	useEffect(() => {
		setIsYourTime(infoPlayer ? infoPlayer.initial : false);
	}, [infoPlayer?.initial]);

	return (
		<GameContext.Provider
			value={{
				moves,
				myPieces,
				isYourTime,
				infoPlayer,
				waitPlayers,
				selectedPiece,
				room: roomSaved,
				playersSummary,

				onMove,
				onStart,
				onSetRoom,
				onSignOut,
				onVerifyRoom,
				onSelectPiece,
				onAskForPiece,
				onClearPieceSelected,
			}}
		>
			{children}
		</GameContext.Provider>
	);
};
