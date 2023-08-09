import React, { useEffect } from "react";
import { useWindowSize } from "react-use";
import confetti from "canvas-confetti";

const FireWorks = () => {
  const { width, height } = useWindowSize();

  useEffect(() => {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 100 * (timeLeft / duration);

      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
      );
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
      );
    }, 250);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      <canvas id="confetti" width={width} height={height} />
    </>
  );
};

export default FireWorks;










// join player
// export const subscribeToJoinPlayer = () => {
//   if (isSocketConnected) {
//     stompClient.subscribe("/joinPlayer/public");
//   }
// };

// export const sendJoinPlayerData = (data) => {
//   if (isSocketConnected) {
//     stompClient.send("/app/joinPlayer", {}, JSON.stringify(data));
//     console.log("heiiiiiiiiiiiii")
//   }
// };
// // start game
// export const subscribeToStartGame = () => {
//   if (isSocketConnected) {
//     stompClient.subscribe("/startGame/public");
//   }
// };
// export const sendStartGameData = (data) => {
//   if (isSocketConnected) {
//     stompClient.send("/app/startGame", {}, JSON.stringify(data));
//   }
// };
// // move player
// export const subscribeToMovePlayer = (onMovePlayer) => {
//   if (isSocketConnected) {
//     stompClient.subscribe("/movePlayer/public", onMovePlayer);
//   }
// };

// export const sendMovePlayerData = (data) => {
//   if (isSocketConnected) {
//     stompClient.send("/app/movePlayer", {}, JSON.stringify(data));
//   }
// };