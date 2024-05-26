export interface InitialInformationFormData {
    firstName: string;
    lastName: string;
    Gender: string;
    maritalStatus: string;
    militaryStatus: string;
    city: string;
    telephone: string;
    birthDate: Date;
}

export interface WorkExperienceFormData {
    jobTitle: string;
    jobcategoryId?: number;
    seniorityLevel: string;
    companyName: string;
    countryId?: number;
    cityId?: number;
    fromYear: number;
    fromMonth: number;
    toYear?: number;
    toMonth?: number;
    currentJob: boolean;
}

export interface EducationalBackgroundFormData {
    degreeLevel: string;
    studyField: string;
    university?: string;
    gpa?: number;
    fromYear: number;
    toYear?: number;
    stillEducating: boolean;
}

export interface Country {
    id: number;
    title: string;
}

export interface City {
    id: number;
    title: string;
}
export interface JobCategories {
    id: number;
    title: string;
}

export interface Majors {
    id: number;
    title: string;
}
export interface Universities {
    id: number;
    title: string;
}
