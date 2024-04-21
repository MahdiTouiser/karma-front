import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  DocumentItem,
  DocumentItemModel,
  DocumentsList,
  DocumentStatus,
} from '../models/account.models';
import { UserPersonalInfo } from '../models/shared.models';
import { sortDateComprator } from '../utils/shared';
import { DateObject } from 'react-multi-date-picker';
import persian_en from 'react-date-object/locales/persian_en';
import persian from 'react-date-object/calendars/persian';

const fileMessage = 'بارگذاری این مدرک الزامی است.';
const expireMessage = 'تاریخ انقضا برای این مدرک الزامی است.';
const expireRangeMessage = 'حداقل مدت اعتبار رعایت نشده است.';

function getLastDocument(
  documents: DocumentItem[] | null,
  withDate?: boolean,
  required = true
): DocumentItemModel {
  const defaultDoc: DocumentItemModel = {
    fileId: '',
    withDate: withDate,
    validationMessage: required ? fileMessage : '',
    required: required
  };
  if (!documents) {
    return defaultDoc;
  }
  const createdComperator = sortDateComprator<DocumentItem>('createdAt');
  const expirationComperator =
    sortDateComprator<DocumentItem>('expirationDate');
  const sorted = documents.sort((a, b) => {
    const createDiff = createdComperator(a, b);
    if (createDiff !== 0) {
      return createDiff;
    }
    if (a.status === b.status) {
      return expirationComperator(a, b);
    }
    const priorStatuses = [DocumentStatus.EXPIRED, DocumentStatus.PENDING];
    if (priorStatuses.includes(a.status as string)) {
      return 1;
    }
    if (priorStatuses.includes(b.status as string)) {
      return -1;
    }
    return 0;
  });
  const lastDoc = sorted[sorted.length - 1];
  if (!lastDoc) {
    return defaultDoc;
  }
  return {
    ...lastDoc,
    withDate: withDate,
    validationMessage: getValidationMessage(lastDoc),
  };
}

function getValidationMessage(
  documentItemModel: DocumentItemModel,
  timeStamp?: number
): string {
  console.log(documentItemModel.required)
  // if (documentItemModel.required === false){
  //   return ''
  // }
  let message = ''
  const required = documentItemModel.required === undefined || documentItemModel.required === true
  if (!documentItemModel.fileId) {
    message = required ? fileMessage : '';
  }
  if (documentItemModel.withDate) {
    if (!documentItemModel.expirationDate) {
      message = required ?  expireMessage : '';
    }
    if (timeStamp) {
      const expireDateObejct = new DateObject({
        date: documentItemModel.expirationDate,
        format: 'YYYY/MM/DD',
        locale: persian_en,
        calendar: persian,
      });
      const expirationJSDate = expireDateObejct.toDate();
      if (expirationJSDate.getTime() < timeStamp) {
        message = expireRangeMessage;
      }
    }
  }
  return message;
}

function getRelatedTimeStamp(
  state: AccountState,
  field: UserDocumentsFieldType
) {
  const map = new Map<UserDocumentsFieldType, number>([
    ['attorneyDocument', state.maxAttornyTimeStamp],
    ['medicalDocument', state.maxMedicalTimeStamp],
  ]);
  return map.get(field);
}

interface AccountState {
  personalInfo: UserPersonalInfo | null;
  medicalDocument: DocumentItemModel;
  logBookDocument: DocumentItemModel;
  attorneyDocument: DocumentItemModel;
  nationalCardDocument: DocumentItemModel;
  anyDocChange: boolean;
  maxAttornyTimeStamp: number;
  maxMedicalTimeStamp: number;
}

const initialState: AccountState = {
  personalInfo: null,
  medicalDocument: { fileId: '', withDate: true, required: false },
  logBookDocument: { fileId: '' },
  attorneyDocument: { fileId: '', withDate: true, required:false },
  nationalCardDocument: { fileId: '' },
  anyDocChange: false,
  maxAttornyTimeStamp: 0,
  maxMedicalTimeStamp: 0,
};

export const UserDocumentsFields = {
  medicalDocument: 'medicalDocument',
  logBookDocument: 'logBookDocument',
  attorneyDocument: 'attorneyDocument',
  nationalCardDocument: 'nationalCardDocument',
} as const;

type keys = keyof typeof UserDocumentsFields;
export type UserDocumentsFieldType = (typeof UserDocumentsFields)[keys];

const accountSlice = createSlice({
  name: 'account',
  initialState: initialState,
  reducers: {
    setPersonalInfo: (state, action: PayloadAction<UserPersonalInfo>) => {
      state.personalInfo = action.payload;
    },
    setDocuments: (state, action: PayloadAction<DocumentsList>) => {
      const payload = action.payload;
      state.medicalDocument = getLastDocument(payload.medicalDocuments, true, false);
      state.logBookDocument = getLastDocument(payload.logBookDocuments);
      state.attorneyDocument = getLastDocument(payload.attorneyDocuments, true, false);
      state.nationalCardDocument = getLastDocument(
        payload.nationalCardDocuments
      );
    },
    setTimeStaps: (
      state,
      action: PayloadAction<{
        medicalDocumentsValidityDuration: number;
        attorneyDocumentsValidityDuration: number;
      }>
    ) => {
      const {
        attorneyDocumentsValidityDuration,
        medicalDocumentsValidityDuration,
      } = action.payload;
      const currentDate = new Date();
      const attornyDate = new Date(currentDate);
      attornyDate.setDate(
        currentDate.getDate() + attorneyDocumentsValidityDuration
      );
      attornyDate.setHours(0, 0, 0, 0);
      const medicalDate = new Date(currentDate);
      medicalDate.setDate(
        currentDate.getDate() + medicalDocumentsValidityDuration
      );
      medicalDate.setHours(0, 0, 0, 0);
      state.maxAttornyTimeStamp = attornyDate.getTime();
      state.maxMedicalTimeStamp = medicalDate.getTime();
    },
    setDocumentFile: (
      state,
      action: PayloadAction<{ field: UserDocumentsFieldType; fileId: string }>
    ) => {
      const { field, fileId } = action.payload;
      const document = state[field];
      state.anyDocChange = true;
      if (!document) {
        state[field] = {
          fileId: fileId,
        };
      } else {
        document.fileId = fileId;
      }
      const timeStamp = getRelatedTimeStamp(state, field);
      document.validationMessage = getValidationMessage(document, timeStamp);
    },
    setDocumentExpireDate: (
      state,
      action: PayloadAction<{ field: UserDocumentsFieldType; date: string }>
    ) => {
      const { field, date } = action.payload;
      const document = state[field];
      state.anyDocChange = true;
      if (!document) {
        state[field] = {
          fileId: '',
          expirationDate: date,
        };
      } else {
        document.expirationDate = date;
      }
      const timeStamp = getRelatedTimeStamp(state, field);
      document.validationMessage = getValidationMessage(document, timeStamp);
    },
  },
});

export const accoutnActions = accountSlice.actions;
export default accountSlice.reducer;
