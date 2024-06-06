import { Avatar } from 'flowbite-react';
import React, { useRef, useState } from 'react';
import Delete from '../../../../assets/icons/Delete';
import Upload from '../../../../assets/icons/Upload';
import KButton from '../../../shared/Button';
import KModal from '../../../shared/Modal/Modal';

const AboutMeModal: React.FC<{ show: boolean; onClose: () => void }> = ({ show, onClose }) => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
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
    };

    const handleDeleteImage = () => {
        setImageSrc(null);
    };

    return (
        <KModal show={show} onClose={onClose} containerClass="!w-full !max-w-[40vw] !md:max-w-[70vw] !lg:max-w-[60vw] !pb-2">
            <KModal.Header>
                <h2>ویرایش درباره من</h2>
            </KModal.Header>
            <div className='p-4'>
                <KModal.Body>
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
                </KModal.Body>
            </div>
            <div className='flex justify-end mx-4'>
                <KButton color="primary">
                    ذخیره
                </KButton>
            </div>
        </KModal>
    );
};

export default AboutMeModal;
