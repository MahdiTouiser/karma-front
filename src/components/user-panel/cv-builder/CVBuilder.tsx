import { Link } from 'react-router-dom';

import {
    faArrowRight,
    faFileAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CVBuilder = () => {
    return (
        <div className="m-4 overflow-hidden shadow-2xl bg-gradient-to-br from-cyan-500 to-blue-400 rounded-3xl sm:m-6 md:m-8 lg:m-10">
            <div className="container px-6 py-16 mx-auto sm:px-8 md:px-12 lg:px-16 sm:py-20 md:py-24 lg:py-32">
                <div className="flex flex-col items-center justify-between space-y-12 md:flex-row md:space-y-0 md:space-x-12 lg:space-x-20">
                    <div className="max-w-2xl text-center text-white md:text-right">
                        <h2 className="mb-6 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
                            ساخت رزومه استاندارد و حرفه‌ای
                        </h2>
                        <p className="mb-10 text-xl opacity-90 sm:text-2xl md:text-3xl">
                            با رزومه ساز کارما
                        </p>
                        <Link
                            to="/cv-builder/create"
                            className="inline-flex items-center px-8 py-4 text-lg font-semibold transition-all duration-300 ease-in-out bg-white rounded-full sm:text-xl text-cyan-600 hover:bg-cyan-50 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                        >
                            ساخت رزومه
                            <FontAwesomeIcon icon={faArrowRight} className="mr-3" />
                        </Link>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 transform scale-150 bg-white rounded-full opacity-20 blur-3xl"></div>
                        <FontAwesomeIcon
                            icon={faFileAlt}
                            className="relative text-white text-8xl sm:text-9xl md:text-11xl lg:text-13xl xl:text-15xl 2xl:text-17xl"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CVBuilder;