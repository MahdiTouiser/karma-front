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
    jobcategoryId: number;
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
    degreeLevel?: string | null;
    majorId: number;
    universityId: number;
    fromYear: number;
    toYear: number;
    gpa?: number;
    stillEducating: boolean;
}

export interface EducationalRecord {
    id: string;
    degreeLevel: string;
    fromYear: number;
    toYear: number;
    gpa: number;
    stillEducating: boolean;
    major: {
        id: number;
        title: string;
    };
    university: {
        id: number;
        title: string;
    };
}
export interface CareerRecord {
    id: string,
    jobTitle: string,
    jobCategory: {
        id: number,
        title: string
    },
    seniorityLevel: string,
    companyName: string,
    country: {
        id: number,
        title: string
    },
    city: {
        id: number,
        title: string
    },
    fromMonth: number,
    fromYear: number,
    toMonth: number | null,
    toYear: number,
    currentJob: boolean

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