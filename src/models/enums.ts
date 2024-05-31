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
