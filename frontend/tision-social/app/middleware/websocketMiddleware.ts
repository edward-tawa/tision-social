import { Middleware } from "@reduxjs/toolkit";

// Action types
const WS_CONNECT = "websocket/connect";
const WS_DISCONNECT = "websocket/disconnect";
const WS_SEND = "websocket/send";

// Action creators
export const connectWebSocket = (url: string) => ({ type: WS_CONNECT, payload: url });
export const disconnectWebSocket = () => ({ type: WS_DISCONNECT });
export const sendWebSocketMessage = (message: any) => ({ type: WS_SEND, payload: message });

export const websocketMiddleware: Middleware = store => {
    let socket: WebSocket | null = null;

    return next => (action: any) => {
        switch (action.type) {
            case WS_CONNECT: {
                if (socket !== null) {
                    socket.close();
                }

                socket = new WebSocket(action.payload);

                socket.onopen = () => {
                    console.log("WebSocket connected");
                };

                socket.onmessage = (event) => {
                    const data = JSON.parse(event.data);
                    store.dispatch({ type: "websocket/message", payload: data });
                };

                socket.onclose = () => {
                    console.log("WebSocket disconnected");
                };

                socket.onerror = (err) => {
                    console.error("WebSocket error:", err);
                };
                break;
            }

            case WS_DISCONNECT: {
                if (socket !== null) {
                    socket.close();
                    socket = null;
                }
                break;
            }

            case WS_SEND: {
                if (socket?.readyState === WebSocket.OPEN) {
                    socket.send(JSON.stringify(action.payload));
                } else {
                    console.warn("WebSocket is not open. Message not sent.");
                }
                break;
            }

            default:
                break;
        }

        return next(action);
    };
};
