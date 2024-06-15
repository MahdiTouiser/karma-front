import { Avatar } from 'flowbite-react';
import React, { useEffect, useRef, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Delete from '../../../../assets/icons/Delete';
import Instagram from '../../../../assets/icons/Instagram';
import Linkedin from '../../../../assets/icons/Linkedin';
import Twitter from '../../../../assets/icons/Twitter';
import Upload from '../../../../assets/icons/Upload';
import useApi from '../../../../hooks/useApi';
import { AboutMeData } from '../../../../models/cvbuilder.models';
import { AboutMeFormData, SocialMedia } from '../../../../models/myresume.model';
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
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { register, handleSubmit, reset, control } = useForm<AboutMeFormData>();
    const { fields } = useFieldArray({
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
            socialMedias: data.socialMedias.map((socialMedia: SocialMedia) => ({
                type: socialMedia.type,
                link: socialMedia.link
            }))
        };
        console.log(formattedData);
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

    return (
        <KModal show={show} onClose={onClose} containerClass="!w-full !max-w-[40vw] !md:max-w-[70vw] !lg:max-w-[60vw] !pb-2">
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
                                        <Upload />
                                        <p className='mr-2 text-sm'>اپلود تصویر پروفایل</p>
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
                                            <Delete />
                                            <p className='text-sm !text-red-500'>حذف تصویر پروفایل</p>
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
                                <div key={item.id} className='mb-2'>
                                    <div className='flex flex-col items-center'>
                                        <div className='relative w-full'>
                                            <span className='absolute left-3 top-1/2 transform -translate-y-1/2'>
                                                <Linkedin />
                                            </span>
                                            <KTextInput
                                                {...register(`socialMedias.${index}.link` as const)}
                                                className='pl-10 w-full !text-left'
                                                placeholder='لینکدین'
                                            />
                                        </div>
                                        <div className='relative w-full mt-2'>
                                            <span className='absolute left-3 top-1/2 transform -translate-y-1/2'>
                                                <Twitter />
                                            </span>
                                            <KTextInput
                                                {...register(`socialMedias.${index}.type` as const)}
                                                className='pl-10 w-full !text-left'
                                                placeholder='توییتر'
                                            />
                                        </div>
                                        <div className='relative w-full mt-2'>
                                            <span className='absolute left-3 top-1/2 transform -translate-y-1/2'>
                                                <Instagram />
                                            </span>
                                            <KTextInput
                                                {...register(`socialMedias.${index}.type` as const)}
                                                className='pl-10 w-full !text-left'
                                                placeholder='اینستاگرام'
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
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
