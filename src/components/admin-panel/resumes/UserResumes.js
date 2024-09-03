import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState, } from 'react';
import { useParams } from 'react-router-dom';
import useApi from '../../../hooks/useApi';
import KSpinner from '../../shared/Spinner';
import AboutUser from '../components/AboutUser';
import UserCareerBackground from '../components/UserCareerRecords';
import UserEducationalHistory from '../components/UserEducationalHistory';
import UserLanguages from '../components/UserLanguage';
import UserSamples from '../components/UserSamples';
import UserSoftwareSkills from '../components/UserSoftwareSkills';
const UserResumes = () => {
    const { id } = useParams();
    const { sendRequest } = useApi();
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        const checkUserExistence = async () => {
            sendRequest({
                url: `/Resumes/UserResume/${id}`,
            }, (response) => {
                console.log(response);
                setUserData(response);
            }, (error) => {
                console.error("Error:", error);
            });
        };
        if (id) {
            checkUserExistence();
        }
    }, [id, sendRequest]);
    if (!userData) {
        return (_jsx("div", { className: "flex items-center justify-center min-h-screen", children: _jsx(KSpinner, { color: 'blue', size: 20 }) }));
    }
    return (_jsxs("div", { className: 'py-16', children: [_jsx("h1", { className: 'text-2xl md:text-3xl font-extrabold text-center mb-8', children: "\u0646\u0645\u0627\u06CC \u06A9\u0644\u06CC \u0631\u0632\u0648\u0645\u0647 \u06A9\u0627\u0631\u0628\u0631" }), _jsxs("div", { className: 'flex flex-col md:flex-row', children: [_jsxs("div", { className: 'flex flex-col w-full md:w-3/5 px-4 md:px-8', children: [_jsx("div", { children: _jsx(AboutUser, { mainJobTitle: userData.mainJobTitle, description: userData.description || '', socialMedias: userData.socialMedias, imageSrc: userData.imageSrc || null }) }), _jsx("div", { className: 'mt-6', children: _jsx(UserEducationalHistory, { educationalData: userData.educationalRecords }) }), _jsx("div", { className: 'mt-6', children: _jsx(UserCareerBackground, { careerRecords: userData.careerRecords }) }), _jsx("div", { className: 'mt-6', children: _jsx(UserLanguages, { languages: userData.languages }) }), _jsx("div", { className: 'mt-6', children: _jsx(UserSoftwareSkills, { softwareSkills: userData.softwareSkills }) })] }), _jsx("div", { className: 'flex flex-col w-full md:w-2/5 px-4 md:px-8 mt-6 md:mt-0', children: _jsx("div", { children: _jsx(UserSamples, { workSamples: userData.workSamples }) }) })] })] }));
};
export default UserResumes;
