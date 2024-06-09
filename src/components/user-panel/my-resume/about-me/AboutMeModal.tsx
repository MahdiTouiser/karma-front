import { Avatar } from 'flowbite-react';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Delete from '../../../../assets/icons/Delete';
import Upload from '../../../../assets/icons/Upload';
import useApi from '../../../../hooks/useApi';
import { AboutMeFormData, SocialMedia } from '../../../../models/myresume.model';
import { BaseResponse } from '../../../../models/shared.models';
import KButton from '../../../shared/Button';
import KLabel from '../../../shared/Label';
import KModal from '../../../shared/Modal/Modal';
import KTextArea from '../../../shared/TextArea';
import KTextInput from '../../../shared/TextInput';

const AboutMeModal: React.FC<{ show: boolean; onClose: () => void }> = ({ show, onClose }) => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { register, handleSubmit, formState: { errors }, getValues } = useForm<AboutMeFormData>();
    const { sendRequest: AddImage, isPending } = useApi<FormData, BaseResponse<null>>();
    const [imageId, setImageId] = useState('');


    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        const formData = new FormData();
        formData.append('File', file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageSrc(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        AddImage(
            { url: "/Files", method: 'post', data: formData },
            (response) => {
                console.log(response);
                toast.success(response.message);
                setImageId(response.value as unknown as string);
                console.log(imageId);
            },
            (error) => {
                toast.error(error?.message);
            }
        );
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
                                <button onClick={handleButtonClick}>
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
                                    <button onClick={handleDeleteImage} className='mr-2'>
                                        <span className='flex'>
                                            <Delete />
                                            <p className='mr-2 text-sm !text-red-500'>حذف تصویر پروفایل</p>
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
                            <KLabel>آدرس پروفایل لینکدین شما</KLabel>
                            <KTextInput {...register("socialMedias.0.link")} className='!text-left' placeholder='www.linkedin.com/in/your-username' />
                        </div>
                        <div className='m-5'>
                            <KLabel>چند جمله راجع به خودتان بنویسید</KLabel>
                            <KTextArea {...register("description")} />
                        </div>
                        <div className='flex justify-end mx-4'>
                            <KButton color="primary" onClick={handleFormSubmit}>
                                ذخیره
                            </KButton>
                        </div>
                    </form>
                </KModal.Body>
            </div>
        </KModal>
    );
};

export default AboutMeModal;
