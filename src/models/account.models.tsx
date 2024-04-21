import { UserPersonalInfo } from "./shared.models";

export interface CityDto {
  id: string;
  province: string;
  state: string;
  city: string;
}

export class City {
  constructor(
    public id: string,
    public state: string,
    public provice: string,
    public city: string
  ) {}

  get locationString() {
    return `${this.state} - ${this.provice} - ${this.city}`;
  }
}

export interface DocumentItem {
  fileId: string;
  expirationDate?: string;
  status?: string;
  statusDisplay?: string;
  updatedAt?: string,
  createdAt?: string,
  id?:string
}

export interface DocumentItemRow extends DocumentItem{
  title: string;
  isPending: boolean
}

export interface DocumentItemModel extends DocumentItem{
  withDate?: boolean,
  validationMessage?: string;
  required?:boolean
}

export interface DocumentsUplodModel {
  medicalDocument?: DocumentItem;
  logBookDocument?: DocumentItem;
  attorneyDocument?: DocumentItem;
  nationalCardDocument?: DocumentItem;
}

export interface PersonalInfoEditRequest extends Omit<UserPersonalInfo, "id">,DocumentsUplodModel {

}

export interface DocumentsList {
  medicalDocuments: DocumentItem[] | null;
  logBookDocuments: DocumentItem[] | null;
  attorneyDocuments: DocumentItem[] | null;
  nationalCardDocuments: DocumentItem[] | null;
  id: string;
  createdAt: string;
  updatedAt: string;
}

export const DocumentTitleMap = {
  medicalDocument : 'مدارک پزشکی',
  logBookDocument: "لاگ بوک",
  attorneyDocument: 'وکالت‌نامه محضری',
  nationalCardDocument: 'کارت ملی'
}

export const DocumentStatus = {
  NOT_LOADED: 'NotLoaded',
  PENDING: 'Pending',
  EXPIRED: 'Expired',
  CONFIRMED: 'Confirmed',
};


export interface PersonalInfoEditableFormData {
  email: string;
  cityAndState: string | null;
  address: string;
  height: number | null;
  weight: number | null;
  emergencyContact: string;
  emergencyPhone: string;
}