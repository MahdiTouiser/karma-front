export interface UserTicket {
  ticketNumber: string;
  date: string;
  flightNumber: string;
  eventLocation: string;
  ticketType: string;
  skyDiveEventId: string;
  termsAndConditionUrl: string;
  voidable: boolean;
  id: string;
  createdAt: string;
  updatedAt: string;
  ticketStatus: string;
  ticketStatusDisplay: string
}

export const TicketStatuses = {
  HELD: 'Held',
  CANCELLED: 'Cancelled',
  RESERVED: 'Reserved' 
}

export const TicketStatusesPersianMap = new Map([
  [TicketStatuses.RESERVED, 'رزرو شده'],
  [TicketStatuses.HELD, 'برگزار شده'],
  [TicketStatuses.CANCELLED, 'کنسل شده'],
])
