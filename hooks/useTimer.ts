import { useEffect, useRef, useState } from "react";

interface UseTimerProps {
  duration: number;
  quiz: any;
  onComplete: () => void;
}

export const useTimer = ({ duration, quiz, onComplete }: UseTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<number>(duration / 1000);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const stopTimer = () => {
    setTimeLeft(0);
    onComplete();
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const startTimer = (time: number) => {
    let currentTime = time;
    timerRef.current = setInterval(() => {
      currentTime = currentTime - 1;
      setTimeLeft(oldProp => oldProp - 1);
      if (currentTime <= 0) {
        stopTimer();
      }
    }, 1000);
  };

  const resetTimer = () => {
    setTimeLeft(duration / 1000);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const restartTimer = () => {
    resetTimer();
    startTimer(duration / 1000);
  };

  useEffect(() => {
    if (quiz) {
      startTimer(duration / 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [quiz, duration]);

  return {
    timeLeft,
    stopTimer,
    resetTimer,
    restartTimer,
  };
};
