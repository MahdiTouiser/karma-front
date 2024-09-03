import { jsx as _jsx } from "react/jsx-runtime";
import KCard from '../../shared/Card';
import JobsCards from '../job-opportunities/JobsCards';
const SavedJobs = () => {
    return (_jsx(KCard, { className: 'flex justify-center', children: _jsx(JobsCards, { setSelectedJob: function (_job) {
                throw new Error('Function not implemented.');
            } }) }));
};
export default SavedJobs;
