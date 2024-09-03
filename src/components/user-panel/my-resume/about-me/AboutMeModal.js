import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState, } from 'react';
import { Avatar } from 'flowbite-react';
import { useFieldArray, useForm, } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { faInstagram, faLinkedin, faSquareInstagram, faSquareXTwitter, } from '@fortawesome/free-brands-svg-icons';
import { faTrashAlt, faUpload, } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useApi from '../../../../hooks/useApi';
import { setProfilePicture } from '../../../../store/profileSlice';
import KButton from '../../../shared/Button';
import KLabel from '../../../shared/Label';
import KModal from '../../../shared/Modal/Modal';
import KSpinner from '../../../shared/Spinner';
import KTextArea from '../../../shared/TextArea';
import KTextInput from '../../../shared/TextInput';
const AboutMeModal = ({ show, onClose, aboutMeData, onSubmitSuccess, imageSrc: initialImageSrc }) => {
    const [imageSrc, setImageSrc] = useState(initialImageSrc);
    const [visibleInputs, setVisibleInputs] = useState({
        LinkedIn: false,
        X: false,
        Instagram: false,
    });
    const fileInputRef = useRef(null);
    const { register, handleSubmit, reset, control } = useForm();
    const { fields, append } = useFieldArray({
        control,
        name: 'socialMedias',
    });
    const { sendRequest: AddImage, isPending } = useApi();
    const { sendRequest } = useApi();
    const [imageId, setImageId] = useState('');
    const dispatch = useDispatch();
    useEffect(() => {
        if (aboutMeData) {
            setImageSrc(initialImageSrc);
            setImageId(aboutMeData.imageId);
            reset({
                mainJobTitle: aboutMeData.mainJobTitle,
                description: aboutMeData.description,
                socialMedias: aboutMeData.socialMedias,
            });
        }
    }, [aboutMeData, initialImageSrc, reset]);
    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append('File', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageSrc(reader.result);
                dispatch(setProfilePicture(reader.result));
            };
            reader.readAsDataURL(file);
            AddImage({ url: '/Files', method: 'post', data: formData }, (response) => {
                toast.success(response.message);
                setImageId(response.value);
            }, (error) => {
                toast.error(error?.message);
            });
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };
    const handleDeleteImage = () => {
        setImageSrc(null);
    };
    const onSubmit = (data) => {
        const formattedData = {
            imageid: imageId,
            mainJobTitle: data.mainJobTitle,
            description: data.description,
            socialMedias: data.socialMedias,
        };
        sendRequest({
            url: '/Resumes/AboutMe',
            method: 'put',
            data: formattedData,
        }, (response) => {
            toast.success(response.message);
            onSubmitSuccess();
            onClose();
        }, (error) => {
            toast.error(error?.message);
        });
    };
    const handleFormSubmit = () => {
        handleSubmit(onSubmit)();
    };
    const toggleInput = (type) => {
        setVisibleInputs((prev) => ({
            ...prev,
            [type]: !prev[type],
        }));
    };
    return (_jsxs(KModal, { show: show, onClose: onClose, containerClass: "!max-w-[90vw] max-w-md !pb-2 overflow-y-auto", children: [_jsx(KModal.Header, { children: _jsx("h2", { className: "text-center", children: "\u0648\u06CC\u0631\u0627\u06CC\u0634 \u062F\u0631\u0628\u0627\u0631\u0647 \u0645\u0646" }) }), _jsx("div", { className: "p-4", children: _jsx(KModal.Body, { children: _jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "flex flex-col space-y-4", children: [_jsxs("div", { className: "flex flex-col items-center justify-between md:flex-row", children: [_jsxs("div", { className: "flex items-center mb-4 md:mb-0", children: [_jsx(Avatar, { rounded: true, img: imageSrc || '', size: "lg" }), _jsxs("p", { className: "mr-4 text-sm", children: ["\u062A\u0635\u0648\u06CC\u0631 \u067E\u0631\u0648\u0641\u0627\u06CC\u0644 ", _jsx("br", {}), " \u0641\u0631\u0645\u062A\u200C\u0647\u0627\u06CC JPG, PNG, SVG, JPEG"] })] }), _jsxs("div", { className: "flex items-center justify-center ml-3 text-center text-blue-500", children: [_jsx("button", { type: "button", onClick: handleButtonClick, children: _jsx("span", { className: "flex", children: _jsx(FontAwesomeIcon, { icon: faUpload, className: "h-5 w5" }) }) }), _jsx("input", { type: "file", ref: fileInputRef, style: { display: 'none' }, accept: "image/*", onChange: handleFileChange }), imageSrc && (_jsx("button", { type: "button", onClick: handleDeleteImage, className: "mr-2", children: _jsx("span", { className: "flex", children: _jsx(FontAwesomeIcon, { icon: faTrashAlt, color: 'red', className: "w-5 h-5" }) }) }))] })] }), _jsxs("div", { className: "m-5", children: [_jsx(KLabel, { children: "\u0639\u0646\u0648\u0627\u0646 \u0634\u063A\u0644\u06CC \u0646\u0645\u0627\u06CC\u0634\u06CC" }), _jsx(KTextInput, { ...register('mainJobTitle') })] }), _jsxs("div", { className: "m-5", children: [_jsx(KLabel, { children: "\u0622\u062F\u0631\u0633 \u0634\u0628\u06A9\u0647 \u0647\u0627\u06CC \u0627\u062C\u062A\u0645\u0627\u0639\u06CC \u0634\u0645\u0627" }), _jsxs("div", { className: "flex flex-col space-y-2", children: [fields.map((item, index) => (_jsxs("div", { className: "flex items-center", children: [_jsxs("button", { type: "button", onClick: () => toggleInput(item.type), className: "flex items-center", children: [item.type === 'LinkedIn' &&
                                                                _jsx(FontAwesomeIcon, { icon: faLinkedin, className: "w-8 h-8", style: { color: '#0077b5' } }), item.type === 'X' && _jsx(FontAwesomeIcon, { icon: faSquareXTwitter, className: "w-8 h-8" }), item.type === 'Instagram' &&
                                                                _jsx(FontAwesomeIcon, { icon: faSquareInstagram, className: "w-8 h-8", style: { color: '#C13584' } })] }), visibleInputs[item.type] && (_jsxs("div", { className: "relative flex items-center w-full mr-2", children: [_jsx(KTextInput, { ...register(`socialMedias.${index}.link`), className: "w-full !text-left", placeholder: `لینک ${item.type}` }), _jsx("input", { type: "hidden", ...register(`socialMedias.${index}.type`), value: item.type })] }))] }, item.id))), !fields.find(field => field.type === 'LinkedIn') && (_jsx("button", { type: "button", onClick: () => append({ type: 'LinkedIn', link: '' }), className: "flex items-center", children: _jsx(FontAwesomeIcon, { icon: faLinkedin, size: "lg", className: "w-8 h-8" }) })), !fields.find(field => field.type === 'X') && (_jsx("button", { type: "button", onClick: () => append({ type: 'X', link: '' }), className: "flex items-center", children: _jsx(FontAwesomeIcon, { icon: faSquareXTwitter, size: "lg", className: "w-8 h-8" }) })), !fields.find(field => field.type === 'Instagram') && (_jsx("button", { type: "button", onClick: () => append({ type: 'Instagram', link: '' }), className: "flex items-center", children: _jsx(FontAwesomeIcon, { icon: faInstagram, size: "lg", className: "w-8 h-8" }) }))] })] }), _jsxs("div", { className: "m-5", children: [_jsx(KLabel, { children: "\u0686\u0646\u062F \u062C\u0645\u0644\u0647 \u0631\u0627\u062C\u0639 \u0628\u0647 \u062E\u0648\u062F\u062A\u0627\u0646 \u0628\u0646\u0648\u06CC\u0633\u06CC\u062F" }), _jsx(KTextArea, { ...register('description') })] }), _jsx("div", { className: "flex justify-end mx-4", children: isPending ? (_jsx(KSpinner, {})) : (_jsx(KButton, { color: "primary", onClick: handleFormSubmit, className: "w-full md:w-auto", children: "\u0630\u062E\u06CC\u0631\u0647 \u062A\u063A\u06CC\u06CC\u0631\u0627\u062A" })) })] }) }) })] }));
};
export default AboutMeModal;
