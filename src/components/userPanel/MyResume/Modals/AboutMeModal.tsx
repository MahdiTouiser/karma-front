import React from 'react';
import KButton from '../../../shared/Button';
import KModal from '../../../shared/Modal/Modal';
import KTextArea from '../../../shared/TextArea';

const AboutMeModal: React.FC<{ show: boolean; onClose: () => void }> = ({ show, onClose }) => {
    return (
        <KModal show={show} onClose={onClose} containerClass="!w-full !max-w-[40vw] !md:max-w-[70vw] !lg:max-w-[60vw] !pb-2">
            <KModal.Header>
                <h2>ویرایش درباره من</h2>
            </KModal.Header>
            <div className='p-4'>
                <KModal.Body>
                    <KTextArea className="w-full p-2 border border-gray-300 rounded-md rtl">
                        This is the content of the About Me modal.
                    </KTextArea>
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
