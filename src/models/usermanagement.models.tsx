export interface UserListItem {
  username: string | null
  phone: string | null
  email: string | null
  firstName: string
  lastName: string
  statusDisplay: string
  status: string
  userType: string
  code: number
  nationalCode: string | null
  birthDate: string
  id: string
  createdAt: string
  updatedAt: string
}

export interface UserDatail {
  username: string;
  firstName: string;
  lastName: string;
  userTypeDisplay: string;
  userTypeId: string;
  nationalCode: string;
  birthDate: string;
  cityAndState: string;
  address: string;
  userCode: number;
  email: string;
  phone: string;
  height: number;
  weight: number;
  userStatus: string;
  userStatusDisplay: string;
  emergencyContact: string;
  emergencyPhone: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  password?: string;
  documentsConfirmed:boolean
}


export interface CheckUserInfoRequest{
  id: string;
  isConfirmed: boolean;
  message: string;
}

export interface userType {
  isDefault: boolean;
  title: string;
  allowedTicketTypes: AllowedTicketType[];
  id: string;
  createdAt: string;
  updatedAt: string;
}
export interface ticketType {
  id: string;
  title: string;
}

interface AllowedTicketType {
  title: string
  id: string
  createdAt: string
  updatedAt: string
}


export interface UserRequest {
  firstName: string
  lastName: string
  nationalCode: string
  phone: string
  birthDate: string
  username: string
  email: string | null,
  cityAndState: string | null,
  address: string
  height: number
  weight: number
  emergencyContact: string
  emergencyPhone: string
  password: string,
  userTypeId: string
}

export interface AssignTicketTypes {
  userTypeId: string;
  ticketTypes: string[];
}