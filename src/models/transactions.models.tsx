export interface UserTransaction {
  date: string
  ticketNumber: string
  eventName: string
  paymentInformation: ''
  amount: number
  type: string
  invoiceNumber: number
  id: string
  createdAt: string
  updatedAt: string
}

export interface ZarinPalPayment {
  createdAt: string
  id: string
  items: flightItemInfo[]
  payableAmount: number
  refId: string
  skyDiveEventId: string
  taxAmount: number
  ticketsCount: number
  totalAmount: number
  updatedAt: string
}

export interface flightItemInfo {
  amount: number
  flightDate: string
  flightLoadId: string
  flightNumber: number
  subjectToVAT: boolean
  ticketTypeId: string
  ticketsNumber: number[]
  type: string
  userCode: number
}
