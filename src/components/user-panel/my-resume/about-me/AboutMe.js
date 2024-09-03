import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState, } from 'react';
import { Avatar } from 'flowbite-react';
import { useDispatch } from 'react-redux';
import { faLinkedin, faSquareInstagram, faSquareXTwitter, } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Edit from '../../../../assets/icons/Edit';
import useApi from '../../../../hooks/useApi';
import { setProfilePicture } from '../../../../store/profileSlice';
import KCard from '../../../shared/Card';
import KSpinner from '../../../shared/Spinner';
import AboutMeModal from './AboutMeModal';
const AboutMe = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [aboutMeData, setAboutMeData] = useState(null);
    const [imageSrc, setImageSrc] = useState(null);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const { sendRequest: fetch, isPending } = useApi();
    const { sendRequest: fetchImage, isPending: imageIsPending } = useApi();
    const dispatch = useDispatch();
    const fetchAboutMeData = () => {
        fetch({
            url: '/Resumes/AboutMe',
        }, (response) => {
            setAboutMeData(response);
            if (response.imageId) {
                fetchUploadedImage(response.imageId);
            }
        });
    };
    const fetchUploadedImage = (id) => {
        fetchImage({
            url: `/Files/Image/${id}`,
            responseType: 'blob'
        }, (response) => {
            const imageURL = URL.createObjectURL(response);
            setImageSrc(imageURL);
            dispatch(setProfilePicture(imageURL));
        });
    };
    useEffect(() => {
        fetchAboutMeData();
    }, []);
    return (_jsxs(KCard, { className: 'flex flex-col justify-between', children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h1", { className: 'text-xl font-bold', children: "\u062F\u0631\u0628\u0627\u0631\u0647 \u0645\u0646" }), _jsxs("button", { onClick: () => {
                            fetchAboutMeData();
                            openModal();
                        }, className: "flex items-center text-sm text-blue-500", children: [_jsx(Edit, { strokeColor: '#3b82f6' }), "\u0648\u06CC\u0631\u0627\u06CC\u0634"] })] }), isPending ? (_jsx("span", { className: 'flex items-center justify-center', children: _jsx(KSpinner, { color: 'primary', size: 20 }) })) : (aboutMeData && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex justify-between mt-5", children: [_jsxs("div", { className: 'flex', children: [imageIsPending ? _jsx(KSpinner, { size: 10 }) :
                                        _jsx(Avatar, { alt: 'profile-photo', img: imageSrc || '', rounded: true, size: 'lg' }), _jsx("div", { className: 'flex flex-col items-center justify-center mr-5 text-center', children: _jsxs("p", { className: 'text-sm', children: [_jsx("span", { className: 'font-bold' }), " ", _jsx("br", {}), " ", aboutMeData.mainJobTitle] }) })] }), _jsx("div", { className: "flex items-center", children: aboutMeData.socialMedias.map((socialMedia, index) => socialMedia.link ? (_jsxs("a", { href: socialMedia.link, target: "_blank", rel: "noopener noreferrer", className: "ml-2", children: [socialMedia.type === "LinkedIn" && (_jsx(FontAwesomeIcon, { icon: faLinkedin, className: "w-10 h-10", style: { color: '#0077b5' } })), socialMedia.type === "X" && (_jsx(FontAwesomeIcon, { icon: faSquareXTwitter, className: "w-10 h-10" })), socialMedia.type === "Instagram" && (_jsx(FontAwesomeIcon, { icon: faSquareInstagram, className: "w-10 h-10", style: { color: '#C13584' } }))] }, index)) : null) })] }), _jsx("div", { children: _jsx("p", { className: 'mt-10 text-justify text-gray-600 rtl', children: aboutMeData.description }) })] }))), _jsx(AboutMeModal, { show: isModalOpen, onClose: closeModal, aboutMeData: aboutMeData, onSubmitSuccess: fetchAboutMeData, imageSrc: imageSrc })] }));
};
export default AboutMe;
