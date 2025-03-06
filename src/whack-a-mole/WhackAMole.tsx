import { useRef, useState } from 'react';

type Hole = {
  hasMole?: boolean;
};

const INITIAL_HOLES: Hole[] = new Array(9).fill({ hasMole: false });

export function WhackAMole() {
  const $spawnMoleTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const [holes, setHoles] = useState<Hole[]>(INITIAL_HOLES);
  const [game, setGame] = useState({
    score: 0,
    timeLeft: 60,
    finished: false,
  });

  function spwanMole() {
    if (game.finished) return;

    const randomHoleIndex = Math.floor(Math.random() * 9);
    if (holes[randomHoleIndex].hasMole) return;

    const newHoles = [...holes];
    newHoles[randomHoleIndex] = { hasMole: true };
    setHoles(newHoles);

    setTimeout(() => {
      if (game.finished) return;

      newHoles[randomHoleIndex] = { hasMole: false };
      setHoles(newHoles);
    }, Math.random() * 1000 + 1000);
  }

  function handleHoleClick(index: number) {
    if (!game.finished && holes[index].hasMole) {
      const newHoles = [...holes];
      newHoles[index] = { hasMole: false };
      setHoles(newHoles);
      setGame(prev => ({ ...prev, score: prev.score + 1 }));
    }
  }

  function handleRestartGameClick() {
    setHoles(INITIAL_HOLES);
    setGame({ score: 0, timeLeft: 60, finished: false });
  }

  function handleStartGameClick() {
    setHoles(INITIAL_HOLES);
    setGame({ score: 0, timeLeft: 60, finished: false });
    $spawnMoleTimer.current = setInterval(() => {
      spwanMole();
    }, 2000);
  }

  function handleOnGameEnd() {
    setGame(prev => ({ ...prev, finished: true }));
    if ($spawnMoleTimer.current) clearInterval($spawnMoleTimer.current);
  }
}
