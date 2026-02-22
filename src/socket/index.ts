// simple WebSocket wrapper mimicking a subset of socket.io API

// const URL = "ws://dominoes-api.onrender.com";
const URL = "ws://localhost:5001";

class WSClient {
	ws: WebSocket;
	listeners: Map<string, Set<Function>> = new Map();

	constructor(url: string) {
		this.ws = new WebSocket(url);
		this.ws.addEventListener("message", (ev) => {
			let msg;
			try {
				msg = JSON.parse(ev.data.toString());
			} catch (e) {
				return;
			}
			const { event, data } = msg;
			const set = this.listeners.get(event);
			if (set) {
				set.forEach((fn) => fn(data));
			}
		});
	}

	emit(event: string, data?: any, cb?: (res: any) => void) {
		if (cb) {
			const resultEvent = event + "Result";
			const errorEvent = event + "Error";
			const handler = (d: any) => {
				cb(d);
				this.off(resultEvent, handler);
				this.off(errorEvent, handler);
			};
			this.on(resultEvent, handler);
			this.on(errorEvent, handler);
		}
		const sendPayload = () => {
			this.ws.send(JSON.stringify({ event, data }));
		};
		if (this.ws.readyState === WebSocket.OPEN) {
			sendPayload();
		} else {
			this.ws.addEventListener("open", sendPayload, { once: true });
		}
	}

	on(event: string, handler: Function) {
		if (!this.listeners.has(event)) {
			this.listeners.set(event, new Set());
		}
		this.listeners.get(event)!.add(handler);
		return this;
	}

	off(event: string, handler?: Function) {
		if (!handler) {
			this.listeners.delete(event);
		} else {
			const set = this.listeners.get(event);
			if (set) set.delete(handler);
		}
		return this;
	}
}

export const socket = new WSClient(URL);
