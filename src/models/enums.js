export const genderMapping = {
    Male: 'مرد',
    Female: 'زن',
};
export const maritalStatusMapping = {
    Single: 'مجرد',
    Married: 'متاهل',
};
export const militaryServiceStatusMapping = {
    Done: { value: 'Done', label: 'پایان خدمت' },
    PermanentExemption: { value: 'PermanentExemption', label: 'معافیت دائم' },
    AcademicExemption: { value: 'AcademicExemption', label: 'معافیت تحصیلی' },
    InProgress: { value: 'InProgress', label: 'در حال خدمت' },
    SubjectToService: { value: 'SubjectToService', label: 'مشمول' },
};
export var DegreeLevel;
(function (DegreeLevel) {
    DegreeLevel["Diplopma"] = "Diplopma";
    DegreeLevel["Associate"] = "Associate";
    DegreeLevel["Bachelor"] = "Bachelor";
    DegreeLevel["Master"] = "Master";
    DegreeLevel["Doctorate"] = "Doctorate";
})(DegreeLevel || (DegreeLevel = {}));
export const DegreeLevelDescriptions = {
    [DegreeLevel.Diplopma]: 'دیپلم',
    [DegreeLevel.Associate]: 'کاردانی',
    [DegreeLevel.Bachelor]: 'کارشناسی',
    [DegreeLevel.Master]: 'کارشناسی ارشد',
    [DegreeLevel.Doctorate]: 'دکترا',
};
export var HijriMonths;
(function (HijriMonths) {
    HijriMonths["None"] = "";
    HijriMonths[HijriMonths["Farvardin"] = 1] = "Farvardin";
    HijriMonths[HijriMonths["Ordibehesht"] = 2] = "Ordibehesht";
    HijriMonths[HijriMonths["Khordad"] = 3] = "Khordad";
    HijriMonths[HijriMonths["Tir"] = 4] = "Tir";
    HijriMonths[HijriMonths["Mordad"] = 5] = "Mordad";
    HijriMonths[HijriMonths["Shahrivar"] = 6] = "Shahrivar";
    HijriMonths[HijriMonths["Mehr"] = 7] = "Mehr";
    HijriMonths[HijriMonths["Aban"] = 8] = "Aban";
    HijriMonths[HijriMonths["Azar"] = 9] = "Azar";
    HijriMonths[HijriMonths["Dey"] = 10] = "Dey";
    HijriMonths[HijriMonths["Bahman"] = 11] = "Bahman";
    HijriMonths[HijriMonths["Esfand"] = 12] = "Esfand";
})(HijriMonths || (HijriMonths = {}));
export const hijriMonthOptions = [
    { value: HijriMonths.None, label: 'انتخاب ماه' },
    { value: HijriMonths.Farvardin, label: 'فروردین' },
    { value: HijriMonths.Ordibehesht, label: 'اردیبهشت' },
    { value: HijriMonths.Khordad, label: 'خرداد' },
    { value: HijriMonths.Tir, label: 'تیر' },
    { value: HijriMonths.Mordad, label: 'مرداد' },
    { value: HijriMonths.Shahrivar, label: 'شهریور' },
    { value: HijriMonths.Mehr, label: 'مهر' },
    { value: HijriMonths.Aban, label: 'آبان' },
    { value: HijriMonths.Azar, label: 'آذر' },
    { value: HijriMonths.Dey, label: 'دی' },
    { value: HijriMonths.Bahman, label: 'بهمن' },
    { value: HijriMonths.Esfand, label: 'اسفند' },
];
export var SeniorityLevels;
(function (SeniorityLevels) {
    SeniorityLevels["None"] = "";
    SeniorityLevels["Worker"] = "Worker";
    SeniorityLevels["Employee"] = "Employee";
    SeniorityLevels["Specialist"] = "Specialist";
    SeniorityLevels["SeniorSpecialist"] = "SeniorSpecialist";
    SeniorityLevels["Manager"] = "Manager";
    SeniorityLevels["Director"] = "Director";
    SeniorityLevels["Business_Head_CEO"] = "Business_Head_CEO";
})(SeniorityLevels || (SeniorityLevels = {}));
export const seniorityLevelLabels = {
    [SeniorityLevels.None]: 'انتخاب سطح',
    [SeniorityLevels.Worker]: 'کارگر',
    [SeniorityLevels.Employee]: 'کارمند',
    [SeniorityLevels.Specialist]: 'کارشناس',
    [SeniorityLevels.SeniorSpecialist]: 'کارشناس ارشد',
    [SeniorityLevels.Manager]: 'مدیر',
    [SeniorityLevels.Director]: 'معاونت',
    [SeniorityLevels.Business_Head_CEO]: 'مدیر ارشد',
};
export var SkillLevels;
(function (SkillLevels) {
    SkillLevels["None"] = "";
    SkillLevels["Basic"] = "Basic";
    SkillLevels["Intermediate"] = "Intermediate";
    SkillLevels["Advanced"] = "Advanced";
})(SkillLevels || (SkillLevels = {}));
export const skillLevelLabels = {
    [SkillLevels.None]: 'انتخاب سطح',
    [SkillLevels.Basic]: 'مقدماتی',
    [SkillLevels.Intermediate]: 'متوسط',
    [SkillLevels.Advanced]: 'پیشرفته',
};
export var CareerExperienceLength;
(function (CareerExperienceLength) {
    CareerExperienceLength["None"] = "";
    CareerExperienceLength["WithoutExperience"] = "WithoutExperience";
    CareerExperienceLength["LessThanOneYear"] = "LessThanOneYear";
    CareerExperienceLength["BetweenOneAndThreeYears"] = "BetweenOneAndThreeYears";
    CareerExperienceLength["BetweenThreeAndFiveYears"] = "BetweenThreeAndFiveYears";
    CareerExperienceLength["BetweenFiveAndTenYears"] = "BetweenFiveAndTenYears";
    CareerExperienceLength["MoreThanTenYears"] = "MoreThanTenYears";
})(CareerExperienceLength || (CareerExperienceLength = {}));
export const careerExperienceLengthLabels = {
    [CareerExperienceLength.None]: 'انتخاب سطح',
    [CareerExperienceLength.WithoutExperience]: 'بدون سابقه',
    [CareerExperienceLength.LessThanOneYear]: 'کمتر از یکسال',
    [CareerExperienceLength.BetweenOneAndThreeYears]: 'بین یک تا سه سال',
    [CareerExperienceLength.BetweenThreeAndFiveYears]: 'بین سه تا پنج سال',
    [CareerExperienceLength.BetweenFiveAndTenYears]: 'بین پنج تا ده سال',
    [CareerExperienceLength.MoreThanTenYears]: 'بیش از ده سال',
};
