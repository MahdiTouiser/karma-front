import { Avatar } from 'flowbite-react';
import React, { useEffect, useRef, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
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
    const [visibleInputs, setVisibleInputs] = useState<{ [key: string]: boolean }>({});
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { register, handleSubmit, reset, control } = useForm<AboutMeFormData>();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'socialMedias'
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
            socialMedias: data.socialMedias
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

    const addSocialMedia = (type: string) => {
        if (!fields.find((item: any) => item.type === type)) {
            append({ type, link: '' });
        }
    };

    const removeSocialMedia = (index: number) => {
        remove(index);
    };

    const toggleInputVisibility = (type: string) => {
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
            <div className='p-4'>
                <KModal.Body>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='flex justify-between items-center'>
                            <div className='flex items-center'>
                                <Avatar rounded img={imageSrc || ''} size='lg' />
                                <p className='text-sm mr-4'>تصویر پروفایل <br /> فرمت‌های JPG, PNG, SVG, JPEG</p>
                            </div>
                            <div className='text-blue-500 flex ml-3 items-center text-center justify-center'>
                                <button type="button" onClick={handleButtonClick}>
                                    <span className='flex'>
                                        <Upload className='w-7 h-7' />
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
                                    <button type="button" onClick={handleDeleteImage} className='mr-2'>
                                        <span className='flex'>
                                            <Delete className='w-7 h-7' />
                                        </span>
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className='m-5'>
                            <KLabel>عنوان شغلی نمایشی</KLabel>
                            <KTextInput {...register("mainJobTitle")} />
                        </div>
                        <div className='m-5'>
                            <KLabel>آدرس شبکه های اجتماعی شما</KLabel>
                            {fields.map((item, index) => (
                                <div key={item.id} className='mb-2 flex items-center space-x-2'>
                                    <button
                                        type="button"
                                        onClick={() => toggleInputVisibility(item.type)}
                                        className='mr-2'
                                    >
                                        {item.type === "LinkedIn" && <Linkedin className="w-8 h-8" />}
                                        {item.type === "X" && <XIcon className="w-8 h-8" />}
                                        {item.type === "Instagram" && <Instagram className="w-8 h-8" />}
                                    </button>
                                    {visibleInputs[item.type] && (
                                        <div className='relative w-full flex items-center'>
                                            <KTextInput
                                                {...register(`socialMedias.${index}.link` as const)}
                                                className='w-full !text-left'
                                                placeholder={`لینک ${item.type}`}
                                            />
                                            <input
                                                type="hidden"
                                                {...register(`socialMedias.${index}.type` as const)}
                                                value={item.type}
                                            />
                                            <button type="button" onClick={() => removeSocialMedia(index)} className='ml-2'>
                                                <Delete />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                            <div className="flex mt-2 space-x-2">
                                <button type="button" onClick={() => addSocialMedia('LinkedIn')} className="flex items-center">
                                    <Linkedin className="w-8 h-8" />
                                </button>
                                <button type="button" onClick={() => addSocialMedia('X')} className="flex items-center">
                                    <XIcon className="w-8 h-8" />
                                </button>
                                <button type="button" onClick={() => addSocialMedia('Instagram')} className="flex items-center">
                                    <Instagram className="w-8 h-8" />
                                </button>
                            </div>
                        </div>
                        <div className='m-5'>
                            <KLabel>چند جمله راجع به خودتان بنویسید</KLabel>
                            <KTextArea {...register("description")} />
                        </div>
                        <div className='flex justify-end mx-4'>
                            {isPending ? <KSpinner /> : <KButton color="primary" onClick={handleFormSubmit}>
                                ذخیره
                            </KButton>}
                        </div>
                    </form>
                </KModal.Body>
            </div>
        </KModal>
    );
};

export default AboutMeModal;
