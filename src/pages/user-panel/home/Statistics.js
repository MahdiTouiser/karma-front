import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
const Statistics = () => {
    const [jobCount, setJobCount] = useState(0);
    const [cityCount, setCityCount] = useState(0);
    const targetJobNumber = 4302;
    const targetCityNumber = 500;
    const animationDuration = 1000;
    useEffect(() => {
        const animateCount = (target, setCount) => {
            let startTime;
            let animationFrameId;
            const startAnimation = (timestamp) => {
                startTime = timestamp || performance.now();
                const updateCount = (timestamp) => {
                    const elapsedTime = timestamp - startTime;
                    const progress = Math.min(elapsedTime / animationDuration, 1);
                    const nextCount = Math.floor(progress * target);
                    setCount(nextCount);
                    if (progress < 1) {
                        animationFrameId = requestAnimationFrame(updateCount);
                    }
                };
                animationFrameId = requestAnimationFrame(updateCount);
            };
            startAnimation(0);
            return () => {
                cancelAnimationFrame(animationFrameId);
            };
        };
        animateCount(targetJobNumber, setJobCount);
        animateCount(targetCityNumber, setCityCount);
    }, []);
    return (_jsxs("div", { className: "flex flex-col justify-start font-bold text-start", children: [_jsxs("h1", { className: "text-4xl", children: [_jsx("span", { style: { color: '#1abc9c' }, children: jobCount }), "  \u0641\u0631\u0635\u062A \u0634\u063A\u0644\u06CC"] }), _jsxs("h1", { className: "text-4xl mt-6", children: ["\u062F\u0631 ", _jsx("span", { style: { color: '#1abc9c' }, children: cityCount }), "  \u0634\u0647\u0631"] })] }));
};
export default Statistics;
