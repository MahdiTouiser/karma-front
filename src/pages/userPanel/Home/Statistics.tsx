import React, { useEffect, useState } from "react";

const Statistics = () => {
    const [jobCount, setJobCount] = useState(0);
    const [cityCount, setCityCount] = useState(0);

    const targetJobNumber = 4302;
    const targetCityNumber = 500;
    const animationDuration = 1000;

    useEffect(() => {
        const animateCount = (target: number, setCount: React.Dispatch<React.SetStateAction<number>>) => {
            let startTime: number;
            let animationFrameId: number;

            const startAnimation = (timestamp: number) => {
                startTime = timestamp || performance.now();
                const updateCount = (timestamp: number) => {
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

    return (
        <div className="flex flex-col justify-start font-bold">
            <h1 className="text-4xl">{jobCount}  فرصت شغلی</h1>
            <h1 className="text-start text-4xl mt-6"> در {cityCount}  شهر</h1>
        </div>
    );
};

export default Statistics;
