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
