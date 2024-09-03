import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
const Timer = ({ durationSeconds, onEnd }) => {
    const [timer, setTimer] = useState("");
    const intervalRef = useRef(null);
    function getTimeRemaining(e) {
        const total = e.getTime() - Date.now();
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        return {
            total,
            minutes,
            seconds,
        };
    }
    const formatTimer = (e) => {
        const { total, minutes, seconds } = getTimeRemaining(e);
        if (total >= 0) {
            // update the timer
            // check if less than 10 then we need to
            // add '0' at the beginning of the variable
            setTimer((minutes > 9 ? minutes : "0" + minutes) +
                ":" +
                (seconds > 9 ? seconds : "0" + seconds));
        }
        else {
            clearInterval(intervalRef.current);
            onEnd();
        }
    };
    const startTimer = (e) => {
        const interval = setInterval(() => {
            formatTimer(e);
        }, 1000);
        return interval;
    };
    function getDeadTime() {
        const deadline = new Date();
        deadline.setSeconds(deadline.getSeconds() + durationSeconds);
        return deadline;
    }
    useEffect(() => {
        intervalRef.current = startTimer(getDeadTime());
        return () => clearInterval(intervalRef.current);
    }, []);
    return _jsx("div", { children: timer });
};
export default Timer;
