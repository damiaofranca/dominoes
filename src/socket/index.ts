import { io } from "socket.io-client";

// const URL = "https://dominoes-api.onrender.com";
const URL = "http://localhost:5001";

export const socket = io(URL);
