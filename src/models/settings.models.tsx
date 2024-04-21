import { UserStatuses } from "./shared.models";

export interface GeneralSettings {
  termsAndConditionsUrl: string;
  registrationTermsAndConditionsUrl: string;
  fileSizeLimitation: number;
  jumpDuration: number;
  userStatusInfo: UserStatusInfo[];
  medicalDocumentsValidityDuration: number;
  attorneyDocumentsValidityDuration: number;
  vat: number;
  id: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserStatusInfo {
  status: (typeof UserStatuses)[keyof typeof UserStatuses];
  description: string;
}

export interface AssignTicketTypes {
  userTypeId: string;
  ticketTypes: string[];
}

export interface UnAssignTicketTypes {
  userTypeId: string;
  ticketTypeId: string;
}
