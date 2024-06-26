import React from "react";
import { GenderMapping, MaritalStatusMapping, MilitaryServiceStatusMapping, genderMapping, maritalStatusMapping, militaryServiceStatusMapping } from "../../../models/enums";
import { Resume } from "../../../models/shared.models";
import KCard from "../../shared/Card";



interface Props {
    resumes: Resume[];
    onCardClick: (resume: Resume) => void;
}

const FoundedResumes: React.FC<Props> = ({ resumes, onCardClick }) => {
    const cardStyles = {
        cursor: 'pointer',
        transition: 'transform 0.2s',
    };

    const cardHoverStyles = {
        transform: 'scale(1.01)',
    };

    const handleCardClick = (resume: Resume) => {
        onCardClick(resume);
    };

    return (
        <KCard>
            {resumes.length === 0 ? (
                <div>رزومه ای مطابق با جستجو شما وجود ندارد</div>
            ) : (
                resumes.map((resume) => (
                    <KCard
                        key={resume.id}
                        style={cardStyles}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = cardHoverStyles.transform)}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
                        onClick={() => handleCardClick(resume)}
                    >
                        <p>نام و نام خانوادگی : {resume.firstName} {resume.lastName}</p>
                        <p className="mt-2">جنسیت : {genderMapping[resume.gender as keyof GenderMapping] || resume.gender}</p>
                        <p className="mt-2">وضعیت تاهل : {maritalStatusMapping[resume.maritalStatus as keyof MaritalStatusMapping] || resume.maritalStatus}</p>
                        <p className="mt-2">وضعیت نظام وظیفه : {militaryServiceStatusMapping[resume.militaryServiceStatus as keyof MilitaryServiceStatusMapping]?.label || resume.militaryServiceStatus}</p>
                        <p className="mt-2">شهر محل سکونت : {resume.city}</p>
                        <p className="mt-2">تاریخ تولد : {resume.birthDate}</p>
                        <p className="mt-2">شماره موبایل : {resume.telephone}</p>
                    </KCard>
                ))
            )}
        </KCard>
    );
}

export default FoundedResumes;
