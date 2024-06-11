import { Avatar } from 'flowbite-react';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Delete from '../../../../assets/icons/Delete';
import Upload from '../../../../assets/icons/Upload';
import useApi from '../../../../hooks/useApi';
import { AboutMeData } from '../../../../models/cvbuilder.models';
import { AboutMeFormData, SocialMedia } from '../../../../models/myresume.model';
import { BaseResponse } from '../../../../models/shared.models';
import KButton from '../../../shared/Button';
import KModal from '../../../shared/Modal/Modal';
import KSpinner from '../../../shared/Spinner';
import KTextArea from '../../../shared/TextArea';
import KTextInput from '../../../shared/TextInput';

const AboutMeModal: React.FC<{ show: boolean; onClose: () => void; aboutMeData: AboutMeData | null; onSubmitSuccess: () => void }> = ({ show, onClose, aboutMeData, onSubmitSuccess }) => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { register, handleSubmit, reset, formState: { errors } } = useForm<AboutMeFormData>();
    const { sendRequest: AddImage, isPending } = useApi<FormData, BaseResponse<null>>();
    const { sendRequest, isPending: editIsPending } = useApi<AboutMeFormData, BaseResponse<null>>();
    const [imageId, setImageId] = useState('');

    useEffect(() => {
        if (imageId) {
            console.log(imageId);
        }
    }, [imageId]);

    useEffect(() => {
        if (aboutMeData) {
            setImageSrc(aboutMeData.imageId ? `/path/to/images/${aboutMeData.imageId}` : null);
            setImageId(aboutMeData.imageId);
            reset({
                mainJobTitle: aboutMeData.mainJobTitle,
                description: aboutMeData.description,
                socialMedias: aboutMeData.socialMedias,
            });
        }
    }, [aboutMeData, reset]);

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
            };
            reader.readAsDataURL(file);
            AddImage(
                { url: "/Files", method: 'post', data: formData },
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
                type: 'LinkedIn',
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
                                {isPending ? (<KSpinner size={10} color='primary' />) : (<Avatar rounded img={imageSrc || ''} size='lg' />)}
                                <p className='text-sm mr-4'>تصویر پروفایل <br /> فرمت‌های JPG, PNG, SVG, JPEG</p>
                            </div>
                            <div className='text-xs flex justify-between'>
                                <KButton onClick={handleButtonClick} size="sm" type="button" className='!p-0'>
                                    <Upload />
                                    بارگذاری تصویر
                                </KButton>
                                <KButton onClick={handleDeleteImage} size="sm" type="button" className='!p-0'>
                                    <Delete />
                                    حذف
                                </KButton>
                                <input ref={fileInputRef} type="file" style={{ display: 'none' }} onChange={handleFileChange} />
                            </div>
                        </div>
                        <div className='flex flex-col gap-5 mt-5'>
                            <KTextInput  {...register('mainJobTitle', { required: 'این فیلد اجباری است' })} />
                            <KTextArea {...register('description', { required: 'این فیلد اجباری است' })} />
                            <KTextInput {...register('socialMedias.0.link', { required: 'این فیلد اجباری است' })} />
                        </div>
                    </form>
                </KModal.Body>
                <KButton color='primary' onClick={handleFormSubmit} >ثبت</KButton>
                <KButton color='secondary' onClick={onClose}>لغو</KButton>
            </div>
        </KModal >
    );
}

export default AboutMeModal;
