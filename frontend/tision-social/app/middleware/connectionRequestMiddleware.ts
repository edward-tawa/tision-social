import { Middleware } from "@reduxjs/toolkit";

//Action types
export const WS_CONNECT = "websocket/connect";
export const WS_DISCONNECT = "websocket/disconnect";
export const WS_SEND = "websocket/send";
export const WS_RECEIVE = "websocket/receive";


//Action creators
export const connectWebsocket = (url: string) => ({ type: WS_CONNECT, payload: url });
export const disconnectWebsocket = (data: any) => ({ type: WS_DISCONNECT })
export const sendWebsocket = (connectionRequest: any) => ({ type: WS_SEND, payload: connectionRequest });


export const connectionRequestMiddleware: Middleware = store => {
    let socket: WebSocket | null = null;
    return next => (action: any) => {
        switch (action.type) {
            case WS_CONNECT: {
                if (socket !== null) {
                    socket.close();
                }
                socket = new WebSocket(action.payload);

                socket.onopen = () => {
                    console.log("web socket connected succefully");
                };

                socket.onmessage = (event) => {
                    const data = JSON.parse(event.data);
                    store.dispatch({ type: "websocket/connectionRequest", payload: data });
                };

                socket.onclose = () => {
                    console.log("Websocket disconnected");
                };

                socket.onerror = (err) => {
                    console.error("websocket error", err);
                }
            }

            case WS_DISCONNECT: {
                if (socket !== null) {
                    socket.close();
                    socket = null;
                };
                break;
            }

            case WS_SEND: {
                if (socket?.readyState === WebSocket.OPEN) {
                    socket.send(JSON.stringify(action.payload));
                } else {
                    console.warn("Websocket is not open. Message not sent");
                }

                break;
            }

            default:
                break;

        }

        return next(action);
    }
}

