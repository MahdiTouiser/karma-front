import React, {
    useEffect,
    useRef,
    useState,
} from 'react';

import { Avatar } from 'flowbite-react';
import {
    useFieldArray,
    useForm,
} from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import Delete from '../../../../assets/icons/Delete';
import Instagram from '../../../../assets/icons/Instagram';
import Linkedin from '../../../../assets/icons/Linkedin';
import Upload from '../../../../assets/icons/Upload';
import XIcon from '../../../../assets/icons/XIcon';
import useApi from '../../../../hooks/useApi';
import { AboutMeData } from '../../../../models/cvbuilder.models';
import { AboutMeFormData } from '../../../../models/myresume.model';
import { BaseResponse } from '../../../../models/shared.models';
import { setProfilePicture } from '../../../../store/profileSlice';
import KButton from '../../../shared/Button';
import KLabel from '../../../shared/Label';
import KModal from '../../../shared/Modal/Modal';
import KSpinner from '../../../shared/Spinner';
import KTextArea from '../../../shared/TextArea';
import KTextInput from '../../../shared/TextInput';

const AboutMeModal: React.FC<{
    show: boolean;
    onClose: () => void;
    aboutMeData: AboutMeData | null;
    onSubmitSuccess: () => void;
    imageSrc: string | null;
}> = ({ show, onClose, aboutMeData, onSubmitSuccess, imageSrc: initialImageSrc }) => {
    const [imageSrc, setImageSrc] = useState<string | null>(initialImageSrc);
    const [visibleInputs, setVisibleInputs] = useState<{ [key: string]: boolean }>({
        LinkedIn: false,
        X: false,
        Instagram: false,
    });
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { register, handleSubmit, reset, control } = useForm<AboutMeFormData>();
    const { fields, append } = useFieldArray({
        control,
        name: 'socialMedias',
    });
    const { sendRequest: AddImage, isPending } = useApi<FormData, BaseResponse<null>>();
    const { sendRequest } = useApi<AboutMeFormData, BaseResponse<null>>();
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

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append('File', file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setImageSrc(reader.result as string);
                dispatch(setProfilePicture(reader.result as string));
            };
            reader.readAsDataURL(file);

            AddImage(
                { url: '/Files', method: 'post', data: formData },
                (response) => {
                    toast.success(response.message);
                    setImageId(response.value as unknown as string);
                },
                (error) => {
                    toast.error(error?.message);
                }
            );
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleDeleteImage = () => {
        setImageSrc(null);
    };

    const onSubmit = (data: AboutMeFormData) => {
        const formattedData = {
            imageid: imageId,
            mainJobTitle: data.mainJobTitle,
            description: data.description,
            socialMedias: data.socialMedias,
        };
        sendRequest(
            {
                url: '/Resumes/AboutMe',
                method: 'put',
                data: formattedData,
            },
            (response) => {
                toast.success(response.message);
                onSubmitSuccess();
                onClose();
            },
            (error) => {
                toast.error(error?.message);
            }
        );
    };

    const handleFormSubmit = () => {
        handleSubmit(onSubmit)();
    };

    const toggleInput = (type: string) => {
        setVisibleInputs((prev) => ({
            ...prev,
            [type]: !prev[type],
        }));
    };

    return (
        <KModal show={show} onClose={onClose} containerClass="!w-full !max-w-[40vw] !md:max-w-[70vw] !lg:max-w-[60vw] !pb-2 overflow-y-auto">
            <KModal.Header>
                <h2>ویرایش درباره من</h2>
            </KModal.Header>
            <div className="p-4">
                <KModal.Body>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                <Avatar rounded img={imageSrc || ''} size="lg" />
                                <p className="text-sm mr-4">
                                    تصویر پروفایل <br /> فرمت‌های JPG, PNG, SVG, JPEG
                                </p>
                            </div>
                            <div className="text-blue-500 flex ml-3 items-center text-center justify-center">
                                <button type="button" onClick={handleButtonClick}>
                                    <span className="flex">
                                        <Upload className="w-7 h-7" />
                                    </span>
                                </button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                                {imageSrc && (
                                    <button type="button" onClick={handleDeleteImage} className="mr-2">
                                        <span className="flex">
                                            <Delete className="w-7 h-7" />
                                        </span>
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="m-5">
                            <KLabel>عنوان شغلی نمایشی</KLabel>
                            <KTextInput {...register('mainJobTitle')} />
                        </div>
                        <div className="m-5">
                            <KLabel>آدرس شبکه های اجتماعی شما</KLabel>
                            <div className="flex flex-col space-y-2">
                                {fields.map((item, index) => (
                                    <div key={item.id} className="flex items-center">
                                        <button type="button" onClick={() => toggleInput(item.type)} className="flex items-center">
                                            {item.type === 'LinkedIn' && <Linkedin size={28} />}
                                            {item.type === 'X' && <XIcon size={34} />}
                                            {item.type === 'Instagram' && <Instagram size={28} />}
                                        </button>
                                        {visibleInputs[item.type] && (
                                            <div className="relative w-full flex items-center mr-2">
                                                <KTextInput
                                                    {...register(`socialMedias.${index}.link` as const)}
                                                    className="w-full !text-left"
                                                    placeholder={`لینک ${item.type}`}
                                                />
                                                <input type="hidden" {...register(`socialMedias.${index}.type` as const)} value={item.type} />
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {!fields.find(field => field.type === 'LinkedIn') && (
                                    <button type="button" onClick={() => append({ type: 'LinkedIn', link: '' })} className="flex items-center">
                                        <Linkedin size={28} />
                                    </button>
                                )}
                                {!fields.find(field => field.type === 'X') && (
                                    <button type="button" onClick={() => append({ type: 'X', link: '' })} className="flex items-center pl-1">
                                        <XIcon size={34} />
                                    </button>
                                )}
                                {!fields.find(field => field.type === 'Instagram') && (
                                    <button type="button" onClick={() => append({ type: 'Instagram', link: '' })} className="flex items-center">
                                        <Instagram size={28} />
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="m-5">
                            <KLabel>چند جمله راجع به خودتان بنویسید</KLabel>
                            <KTextArea {...register('description')} />
                        </div>
                        <div className="flex justify-end mx-4">
                            {isPending ? <KSpinner /> : <KButton color="primary" onClick={handleFormSubmit}>ذخیره تغییرات</KButton>}
                        </div>
                    </form>
                </KModal.Body>
            </div>
        </KModal>
    );
};

export default AboutMeModal;