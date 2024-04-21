export interface CartableMessage {
  title: string;
  applicantId: string;
  applicantName: string;
  done: boolean;
  requestType: string;
  requestTypeDisplay: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  applicantCode: number;
  applicantTypeDisplay: string;
  time: string;
}

export const CartableRequestTypes = {
  USER_INFORMATION_CONFIRM: 'UserInformationConfirmation',
  TICKET_RESERVATION: 'TicketReservation',
  TIKET_CANCELATION: 'TicketCancellation',
  REFUND: 'Refund',
  WALET_CHARGE: 'WalletCharging',
  Document_EXPIREATION: 'DocumentsExpiration',
  DOCUMENT_UPDATE: 'UpdatingDocuments',
};

export const CartableRequestTypesPersianMap = new Map([
  [
    CartableRequestTypes.USER_INFORMATION_CONFIRM,
    'درخواست تأیید اطلاعات کاربری',
  ],
  [CartableRequestTypes.TICKET_RESERVATION, 'درخواست رزرو بلیت'],
  [CartableRequestTypes.TIKET_CANCELATION, 'درخواست لغو بلیت'],
  [CartableRequestTypes.REFUND, 'درخواست استرداد وجه'],
  [CartableRequestTypes.WALET_CHARGE, 'شارژ کیف پول'],
  [CartableRequestTypes.Document_EXPIREATION, 'منقضی شدن مدارک'],
  [CartableRequestTypes.DOCUMENT_UPDATE, 'بروز رسانی مدارک'],
]);
