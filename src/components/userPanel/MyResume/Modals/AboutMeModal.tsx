import React from 'react';
import KModal from '../../../shared/Modal/Modal';

const AboutMeModal: React.FC<{ show: boolean; onClose: () => void }> = ({ show, onClose }) => {
    return (
        <KModal show={show} onClose={onClose}>
            <KModal.Header>
                <h2>ویرایش درباره من</h2>
            </KModal.Header>
            <KModal.Body>
                <p>This is the content of the About Me modal.</p>
            </KModal.Body>
        </KModal>
    );
};

export default AboutMeModal;
