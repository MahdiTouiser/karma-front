export interface SocialMedia {
    type: string;
    link: string;
}

export interface AboutMeFormData {
    imageid: string;
    mainJobTitle: string;
    description: string;
    socialMedias: SocialMedia[];
}
export interface BasicInfoData {
    firstName: string;
    lastName: string;
    city: string;
    telephone: string;
    birthDate: string;
    maritalStatus: string;
    militaryServiceStatus: string;
    gender: string;
}

export interface InfoType {
    label: string;
    value: string;
}