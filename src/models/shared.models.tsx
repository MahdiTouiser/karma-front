declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ClassicEditor: any;
  }
}

export interface LinkWithIcon {
  path?: string;
  title: string;
}

export interface BaseResponse<T> {
  map(arg0: (country: { id: number; title: string; }) => { value: number; label: string; }): unknown;
  data(data: any): unknown;
  value(value: any): unknown;
  message: string;
  content: T;
  total: number;
}

export interface UserPersonalInfo {
  id: string;
  firstName: string;
  lastName: string;
  nationalCode: string;
  birthDate: string;
  email?: string;
  cityAndState: string | null;
  address?: string;
  weight: number | null;
  height: number | null;
  createdAt?: string;
  updatedAt?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
}

export interface UserGeneralInfo {
  code: number;
  userName: string;
  mobile: string;
  userStatus: string;
  userStatusDisplay: string;
  userType: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
}

export const UserStatuses = {
  AWAITING_COMPLETION: "AwaitingCompletion",
  PENDING: "Pending",
  ACTIVE: "Active",
  INACTIVE: "Inactive",
};

export const UserStatusesPersianMap = new Map([
  [UserStatuses.AWAITING_COMPLETION, "در انتظار تکمیل"],
  [UserStatuses.PENDING, "در انتظار تأیید"],
  [UserStatuses.ACTIVE, "فعال "],
  [UserStatuses.INACTIVE, "غیر فعال"],
]);

export const EventStatuses = {
  HELD: "Held",
  PENDING: "Pending",
  ACTIVE: "Active",
  INACTIVE: "Inactive",
};

export const EventStatusesPersianMap = new Map([
  [EventStatuses.HELD, "برگزار شده"],
  [EventStatuses.PENDING, "لغو شده"],
  [EventStatuses.ACTIVE, "آماده رزرو "],
  [EventStatuses.INACTIVE, "غیر قابل رزرو"],
]);

export interface BasketModel {
  ticketsCount: number;
  taxAmount: number;
  totalAmount: number;
  items: BasketTicketModel[];
  payableAmount: number;
  id: string;
  createdAt: string;
  updatedAt: string;
  skyDiveEventId: string;
}

export interface BasketTicketModel {
  subjectToVAT: boolean;
  flightNumber: number;
  type: string;
  amount: number;
  userCode: number;
  flightDate: string;
  flightLoadId: string;
  ticketTypeId: string;
}

export interface AggregatedTicket {
  flightLoadId: string;
  ticketTypeId: string;
  amount: number;
  flightDate: string;
  type: string;
  flightNumber: number;
  ticketMembers: BasketTicketModel[];
}

export interface ChangingTicketRequest {
  items: RequestTicketItem[];
}

export interface RequestTicketItem {
  flightLoadId: string;
  ticketTypeId: string;
  userCode: number | null;
}
export interface TicketType {
  title: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface SelectPageEvent {
  selected: number;
}

export interface PagingParams {
  pageIndex: number;
  pageSize?: number;
}
export interface UserId {
  id: string;
  code: number;
  fullName: string;
}

export const FlightStatuses = {
  "انجام نشده": 0,
  "معلق شده": 1,
  "کنسل شده": 2,
  "انجام شده": 3,
};
