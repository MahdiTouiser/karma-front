import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import JobsCards from './JobsCards';
import JobsDescription from './JobsDescription';
const JobOpportunities = () => {
    const [selectedJob, setSelectedJob] = useState(null);
    return (_jsxs("div", { className: 'flex w-full p-40', children: [_jsx("div", { className: 'w-1/3 ml-4', children: _jsx(JobsCards, { setSelectedJob: setSelectedJob }) }), selectedJob && (_jsx("div", { className: 'w-2/3', children: _jsx(JobsDescription, { jobData: selectedJob }) }))] }));
};
export default JobOpportunities;
