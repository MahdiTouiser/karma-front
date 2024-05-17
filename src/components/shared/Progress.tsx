import { Progress } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ProgressBar = () => {
    const [visible, setVisible] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setVisible(true);
        const timer = setTimeout(() => {
            setVisible(false);
        }, 2000); // Duration for the progress bar to stay visible (in milliseconds)

        return () => clearTimeout(timer);
    }, [location]);

    if (!visible) return null;

    return (
        <div className="fixed top-0 left-0 right-0 z-50">
            <Progress progress={100} color="black" size="xs" />
        </div>
    );
};

export default ProgressBar;
