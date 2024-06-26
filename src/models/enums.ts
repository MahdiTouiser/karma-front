export interface GenderMapping {
  Male: string
  Female: string
}

export interface MaritalStatusMapping {
  Single: string
  Married: string
}

export const genderMapping: GenderMapping = {
  Male: 'مرد',
  Female: 'زن',
}

export const maritalStatusMapping: MaritalStatusMapping = {
  Single: 'مجرد',
  Married: 'متاهل',
}

export interface MilitaryServiceStatusMapping {
  Done: { value: string; label: string }
  PermanentExemption: { value: string; label: string }
  AcademicExemption: { value: string; label: string }
  InProgress: { value: string; label: string }
  SubjectToService: { value: string; label: string }
}

export const militaryServiceStatusMapping: MilitaryServiceStatusMapping = {
  Done: { value: 'Done', label: 'پایان خدمت' },
  PermanentExemption: { value: 'PermanentExemption', label: 'معافیت دائم' },
  AcademicExemption: { value: 'AcademicExemption', label: 'معافیت تحصیلی' },
  InProgress: { value: 'InProgress', label: 'در حال خدمت' },
  SubjectToService: { value: 'SubjectToService', label: 'مشمول' },
}

export enum DegreeLevel {
  Diplopma = 'Diplopma',
  Associate = 'Associate',
  Bachelor = 'Bachelor',
  Master = 'Master',
  Doctorate = 'Doctorate',
}

export const DegreeLevelDescriptions: { [key in DegreeLevel]: string } = {
  [DegreeLevel.Diplopma]: 'دیپلم',
  [DegreeLevel.Associate]: 'کاردانی',
  [DegreeLevel.Bachelor]: 'کارشناسی',
  [DegreeLevel.Master]: 'کارشناسی ارشد',
  [DegreeLevel.Doctorate]: 'دکترا',
}

export enum HijriMonths {
  None = '',
  Farvardin = 1,
  Ordibehesht,
  Khordad,
  Tir,
  Mordad,
  Shahrivar,
  Mehr,
  Aban,
  Azar,
  Dey,
  Bahman,
  Esfand,
}

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
]

export enum SeniorityLevels {
  None = '',
  Worker = 'Worker',
  Employee = 'Employee',
  Specialist = 'Specialist',
  SeniorSpecialist = 'SeniorSpecialist',
  Manager = 'Manager',
  Director = 'Director',
  Business_Head_CEO = 'Business_Head_CEO',
}

export const seniorityLevelLabels = {
  [SeniorityLevels.None]: 'انتخاب سطح',
  [SeniorityLevels.Worker]: 'کارگر',
  [SeniorityLevels.Employee]: 'کارمند',
  [SeniorityLevels.Specialist]: 'کارشناس',
  [SeniorityLevels.SeniorSpecialist]: 'کارشناس ارشد',
  [SeniorityLevels.Manager]: 'مدیر',
  [SeniorityLevels.Director]: 'معاونت',
  [SeniorityLevels.Business_Head_CEO]: 'مدیر ارشد',
}

export enum SkillLevels {
  None = '',
  Basic = 'Basic',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced',
}

export const skillLevelLabels = {
  [SkillLevels.None]: 'انتخاب سطح',
  [SkillLevels.Basic]: 'مقدماتی',
  [SkillLevels.Intermediate]: 'متوسط',
  [SkillLevels.Advanced]: 'پیشرفته',
}
export enum CareerExperienceLength {
  None = '',
  WithoutExperience = 'WithoutExperience',
  LessThanOneYear = 'LessThanOneYear',
  BetweenOneAndThreeYears = 'BetweenOneAndThreeYears',
  BetweenThreeAndFiveYears = 'BetweenThreeAndFiveYears',
  BetweenFiveAndTenYears = 'BetweenFiveAndTenYears',
  MoreThanTenYears = 'MoreThanTenYears',
}

export const careerExperienceLengthLabels = {
  [CareerExperienceLength.None]: 'انتخاب سطح',
  [CareerExperienceLength.WithoutExperience]: 'بدون سابقه',
  [CareerExperienceLength.LessThanOneYear]: 'کمتر از یکسال',
  [CareerExperienceLength.BetweenOneAndThreeYears]: 'بین یک تا سه سال',
  [CareerExperienceLength.BetweenThreeAndFiveYears]: 'بین سه تا پنج سال',
  [CareerExperienceLength.BetweenFiveAndTenYears]: 'بین پنج تا ده سال',
  [CareerExperienceLength.MoreThanTenYears]: 'بیش از ده سال',
}
