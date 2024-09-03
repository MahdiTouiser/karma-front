import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import Footer from './Footer';
import JobSearch from './JobSearch';
import Statistics from './Statistics';
const Home = () => {
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: 'flex flex-col px-48 justify-center h-screen', children: [_jsx("div", { children: _jsx(Statistics, {}) }), _jsx("div", { children: _jsx(JobSearch, {}) })] }), _jsx("div", { children: _jsx(Footer, {}) })] }));
};
export default Home;
