export enum MilitaryServiceStatus {
  Done = 'Done',
  PermanentExemption = 'PermanentExemption',
  AcademicExemption = 'AcademicExemption',
  InProgress = 'InProgress',
  SubjectToService = 'SubjectToService',
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

export const hijriMonthLabels = {
  [HijriMonths.None]: 'انتخاب ماه',
  [HijriMonths.Farvardin]: 'فروردین',
  [HijriMonths.Ordibehesht]: 'اردیبهشت',
  [HijriMonths.Khordad]: 'خرداد',
  [HijriMonths.Tir]: 'تیر',
  [HijriMonths.Mordad]: 'مرداد',
  [HijriMonths.Shahrivar]: 'شهریور',
  [HijriMonths.Mehr]: 'مهر',
  [HijriMonths.Aban]: 'آبان',
  [HijriMonths.Azar]: 'آذر',
  [HijriMonths.Dey]: 'دی',
  [HijriMonths.Bahman]: 'بهمن',
  [HijriMonths.Esfand]: 'اسفند',
}

export enum SeniorityLevels {
  None = '',
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced',
  Specialist = 'Specialist',
  Manager = 'Manager',
}

export const seniorityLevelLabels = {
  [SeniorityLevels.None]: 'انتخاب سطح',
  [SeniorityLevels.Beginner]: 'مبتدی',
  [SeniorityLevels.Intermediate]: 'متوسط',
  [SeniorityLevels.Advanced]: 'پیشرفته',
  [SeniorityLevels.Specialist]: 'کارشناس',
  [SeniorityLevels.Manager]: 'مدیر',
}
