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

import {
    faInstagram,
    faLinkedin,
    faSquareXTwitter,
} from '@fortawesome/free-brands-svg-icons';
import {
    faTrashAlt,
    faUpload,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

    return (
        <KModal show={show} onClose={onClose} containerClass="!max-w-[90vw] max-w-md !pb-2 overflow-y-auto">
            <KModal.Header>
                <h2 className="text-center">ویرایش درباره من</h2>
            </KModal.Header>
            <div className="p-4">
                <KModal.Body>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
                        <div className="flex flex-col items-center justify-between md:flex-row">
                            <div className="flex items-center mb-4 md:mb-0">
                                <Avatar rounded img={imageSrc || ''} size="lg" />
                                <p className="mr-4 text-sm">
                                    تصویر پروفایل <br /> فرمت‌های JPG, PNG, SVG, JPEG
                                </p>
                            </div>
                            <div className="flex items-center justify-center ml-3 text-center text-blue-500">
                                <button type="button" onClick={handleButtonClick}>
                                    <span className="flex">
                                        <FontAwesomeIcon icon={faUpload} className="h-5 w5" />
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
                                            <FontAwesomeIcon icon={faTrashAlt} color='red' className="w-5 h-5" />
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
                                        <FontAwesomeIcon
                                            icon={item.type === 'LinkedIn' ? faLinkedin : item.type === 'X' ? faSquareXTwitter : faInstagram}
                                            className="w-8 h-8"
                                            style={{ color: item.type === 'LinkedIn' ? '#0077b5' : item.type === 'X' ? 'black' : '#C13584' }}
                                        />
                                        <div className="relative flex items-center w-full mr-2">
                                            <KTextInput
                                                {...register(`socialMedias.${index}.link` as const)}
                                                className="w-full !text-left"
                                                placeholder={`لینک ${item.type}`}
                                            />
                                            <input type="hidden" {...register(`socialMedias.${index}.type` as const)} value={item.type} />
                                        </div>
                                    </div>
                                ))}
                                {!fields.find(field => field.type === 'LinkedIn') && (
                                    <button type="button" onClick={() => append({ type: 'LinkedIn', link: '' })} className="flex items-center">
                                        <FontAwesomeIcon icon={faLinkedin} size="lg" className="w-8 h-8" />
                                    </button>
                                )}
                                {!fields.find(field => field.type === 'X') && (
                                    <button type="button" onClick={() => append({ type: 'X', link: '' })} className="flex items-center">
                                        <FontAwesomeIcon icon={faSquareXTwitter} size="lg" className="w-8 h-8" />
                                    </button>
                                )}
                                {!fields.find(field => field.type === 'Instagram') && (
                                    <button type="button" onClick={() => append({ type: 'Instagram', link: '' })} className="flex items-center">
                                        <FontAwesomeIcon icon={faInstagram} size="lg" className="w-8 h-8" />
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="m-5">
                            <KLabel>چند جمله راجع به خودتان بنویسید</KLabel>
                            <KTextArea {...register('description')} />
                        </div>
                        <div className="flex justify-end mx-4">
                            {isPending ? (
                                <KSpinner />
                            ) : (
                                <KButton
                                    color="primary"
                                    onClick={handleFormSubmit}
                                    className="w-full md:w-auto"
                                >
                                    ذخیره تغییرات
                                </KButton>
                            )}
                        </div>
                    </form>
                </KModal.Body>
            </div>
        </KModal>
    );
};

export default AboutMeModal;