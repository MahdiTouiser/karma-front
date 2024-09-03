import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { faInstagram, faLinkedin, faSquareXTwitter, } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import KCard from '../../shared/Card';
const AboutUser = ({ mainJobTitle, description, socialMedias, imageSrc }) => {
    return (_jsxs(KCard, { className: 'flex flex-col justify-between', children: [_jsxs("div", { className: "flex justify-between mt-5", children: [_jsxs("div", { className: 'flex', children: [_jsx(Avatar, { alt: 'profile-photo', img: imageSrc || '', rounded: true, size: 'lg' }), _jsx("div", { className: 'flex flex-col items-center justify-center mr-5 text-center', children: _jsx("p", { className: 'text-sm', children: _jsx("span", { className: 'font-bold', children: mainJobTitle }) }) })] }), _jsx("div", { className: "flex items-center", children: socialMedias.map((socialMedia, index) => socialMedia.link ? (_jsxs(Link, { to: socialMedia.link, target: "_blank", className: "ml-2", children: [socialMedia.type === "LinkedIn" && _jsx(FontAwesomeIcon, { icon: faLinkedin, className: "w-8 h-8" }), socialMedia.type === "X" && _jsx(FontAwesomeIcon, { icon: faSquareXTwitter, className: "w-8 h-8" }), socialMedia.type === "Instagram" && _jsx(FontAwesomeIcon, { icon: faInstagram, className: "w-8 h-8" })] }, index)) : null) })] }), _jsx("div", { children: _jsx("p", { className: 'mt-10 text-justify text-gray-600 rtl', children: description }) })] }));
};
export default AboutUser;
