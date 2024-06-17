import { useEffect, useRef, useState } from "react";
interface TimerProps {
  durationSeconds: number;
  onEnd(): void;
}

const Timer: React.FC<TimerProps> = ({ durationSeconds, onEnd }) => {
  const [timer, setTimer] = useState("");
  const intervalRef: any = useRef(null);

  function getTimeRemaining(e: Date): {
    total: number;
    minutes: number;
    seconds: number;
  } {
    const total = e.getTime() - Date.now();
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    return {
      total,
      minutes,
      seconds,
    };
  }

  const formatTimer = (e: Date) => {
    const { total, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      // update the timer
      // check if less than 10 then we need to
      // add '0' at the beginning of the variable
      setTimer(
        (minutes > 9 ? minutes : "0" + minutes) +
        ":" +
        (seconds > 9 ? seconds : "0" + seconds)
      );
    } else {
      clearInterval(intervalRef.current);
      onEnd();
    }
  };

  const startTimer = (e: Date) => {
    const interval = setInterval(() => {
      formatTimer(e);
    }, 1000);
    return interval;
  };

  function getDeadTime(): Date {
    const deadline: Date = new Date();

    deadline.setSeconds(deadline.getSeconds() + durationSeconds);
    return deadline;
  }

  useEffect(() => {
    intervalRef.current = startTimer(getDeadTime());
    return () => clearInterval(intervalRef.current);
  }, []);

  return <div>{timer}</div>;
};

export default Timer;
