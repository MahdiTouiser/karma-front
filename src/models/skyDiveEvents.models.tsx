export interface SkyDiveEventStatus {
  title: string;
  reservable: boolean;
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface SkyDiveEvent {
  code: string;
  title: string;
  location: string;
  image: string;
  startDate: string;
  endDate: string;
  capacity: number;
  subjecToVAT: boolean;
  isActive: boolean;
  voidable: boolean;
  termsAndConditions: string;
  statusTitle: string;
  statusId?: string;
  days: SkyDiveInlineEventDay[];
  id: string;
  createdAt: string;
  updatedAt: string;
  duration: string;
  reservable: boolean;
}

export interface SkyDiveInlineEventDay {
  date: string;
  id: string;
}

export interface SkyDiveEventDay {
  date: string;
  emptyCapacity: number;
  flightQty: number;
  userTicketQty: number;
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface FlightOfDayInfo {
  date: string;
  dateDisplay: string;
  flights: SkyDiveFlight[];
  qty: number;
}

export interface SkyDiveFlight {
  flightNumber: number;
  flightId: string;
  tickets: Ticket[];
}

// export interface AdminFlightModel {
//   flightNumber: number;
//   flightId: string;
//   tickets: Ticket[];
// }

export interface Ticket {
  ticketType: string;
  amount: number;
  qty: number;
  allowedToReserve: boolean;
  ticketTypeId: string;
}
export interface NewEvent {
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  voidable: boolean;
  image: string | null;
  statusId: string;
  subjecToVAT: boolean;
}

export interface AdminEventModalProps {
  eventStatusData?: SkyDiveEventStatus[];
  lastCode: string;
  showModal: boolean;
  onCloseModal: (submitted: boolean) => void;
  eventData?: SkyDiveEvent;
}

export interface SkyDiveEventTicketType {
  title: string;
  capacity: number;
  id: string;
}
export interface TicketFee {
  typeId: string;
  amount: number;
  tpye?: string;
}

export interface NewTicketFeeList {
  items: TicketFee[];
}

export interface AddFlightRequest {
  flightQty: number;
  voidableQty: number;
  ticketTypes: TicketTypeInFlightRequest[];
}

export interface TicketTypeInFlightRequest {
  qty: number;
  typeId: string;
}

export interface AdminFlightOfDay {
  date: string;
  flights: AdminFlightModel[];
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminFlightModel {
  flightNumber: number;
  capacity: number;
  voidableQty: number;
  id: string;
  status: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface EditTicketRequest {
  id: string;
  ticketTypeId: string;
  reservable: boolean;
}

export interface AdminTicketModel {
  ticketNumber: string;
  ticketType: string;
  reservable: boolean;
  status: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  ticketTypeId: string;
}

export interface AddTermAndConditionsRequest {
  conditionsAndTerms: string;
}

export interface flightStatusData {
  status: string;
}

export interface flightNameData {
  name: string;
}
