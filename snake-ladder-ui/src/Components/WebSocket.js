// import SockJS from "sockjs-client";
// import { over } from "stompjs";
// import baseURL from "../config";

// let stompClient = null;

// export const initializeWebSocketConnection = () => {
//   if (!stompClient) {
//     const socket = new SockJS(`${baseURL}/SnakeLadder`); // Server connection
//     stompClient = over(socket);

//     stompClient.connect({}, onConnected, onError);
//   }
// };

// const onConnected = () => {
//   console.log("WebSocket connected successfully!");
//   alert("WebSocket connected successfully!");
// };

// const onError = (err) => {
//   console.log("WebSocket connection error:", err);
//   alert("WebSocket connection error: " + err);
// };
// WebSocket.js
import SockJS from "sockjs-client";
import { over } from "stompjs";
import baseURL from "../config";

let stompClient = null;

// WebSocket.js
export const initializeWebSocketConnection = () => {
  if (stompClient) {
    return Promise.resolve(stompClient);
  }

  const socket = new SockJS(`${baseURL}/SnakeLadder`);
  stompClient = over(socket);

  return new Promise((resolve, reject) => {
    stompClient.connect({}, () => {
      console.log("WebSocket connected successfully!");
      alert("WebSocket connected successfully!");
      resolve(stompClient);
    }, (err) => {
      console.log("WebSocket connection error:", err);
      alert("WebSocket connection error: " + err);
      reject(err);
    });
  });
};

