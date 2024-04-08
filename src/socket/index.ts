import { io } from "socket.io-client";

const URL = "https://dominoes-api.onrender.com";

export const socket = io(URL);
