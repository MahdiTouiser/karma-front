import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  DocumentStatus,
  DocumentTitleMap,
} from "../../../models/account.models";
import { UserDocumentsFieldType, accoutnActions } from "../../../store/account";
import KDatepicker from "../../shared/DatePicker";
import KLabel from "../../shared/Label";
import LabeledFileInput from "../../shared/LabeledFileInput";
import UserDocumentStatusLabel from "../../shared/UserDocumentStatusLabel";

interface DocumentItemProps {
  field: UserDocumentsFieldType;
  title: string;
  validation?: boolean;
  disable: boolean;
}

const DocumentItemComponent: React.FC<DocumentItemProps> = ({
  title,
  validation,
  field,
  disable,
}) => {
  const documentData = useAppSelector((state) => state.account[field]);
  const required = documentData.required === undefined || documentData.required === true
  console.log(title, documentData.required)
  const maxFileSize = useAppSelector(
    (state) => state.generalSettings.generalSettings?.fileSizeLimitation
  );
  const dispatch = useAppDispatch();
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // Check if the title is "کارت ملی" to determine if the LabeledFileInput should be disabled.
  const isTitleNationalCard = title === DocumentTitleMap.nationalCardDocument;

  function onFileUpload(id: string) {
    setIsUploading(true);
    dispatch(accoutnActions.setDocumentFile({ field: field, fileId: id }));
  }

  function onFileRemove() {
    setIsUploading(false);
    dispatch(accoutnActions.setDocumentFile({ field: field, fileId: "" }));
  }

  function onDateChange(value: string) {
    dispatch(
      accoutnActions.setDocumentExpireDate({ field: field, date: value })
    );
  }

  return (
    <div className="flex justify-between i  py-8 border-b last:border-none first:pt-0  flex-wrap xs:border-none items-end">
      <div className="w-full xs:w-1/2">
        <p className="text-slate-500 text-center text-lg font-semibold xs:text-base xs:text-right">
          {title}
          {required && (!documentData?.fileId ||
            (documentData.withDate && !documentData?.expirationDate)) && (
              <span className="text-red-600 mr-1">*</span>
            )}
        </p>
        {documentData.withDate && (
          <div className="relative pt-5 flex items-center w-[70%] m-auto xs:w-auto mb-4 xs:mb-0 xs:pl-20 sm:pl-28">
            <KLabel className="whitespace-nowrap ml-2  !mb-0 bg-white text-sm top-2 px-1 right-2  xs:absolute xs:ml-0">
              تاریخ انقضا
            </KLabel>
            <KDatepicker
              inputClass="text-center !bg-white border-slate-500"
              name="expireDate"
              onChange={onDateChange}
              required={true}
              manualInvalid={
                validation && documentData?.validationMessage !== ""
              }
              value={documentData?.expirationDate || ""}
            ></KDatepicker>
          </div>
        )}
        {validation && documentData?.validationMessage && (
          <p className="text-red-600 text-sm pr-2 mt-2">
            {documentData.validationMessage}
          </p>
        )}
      </div>
      <div
        className={`w-full xs:w-1/2 flex whitespace-nowrap justify-center gap-8 text-center mt-4 xs:mt-0 xs:justify-around items-center ${documentData.withDate ? "xs:pb-2" : ""
          }`}
      >
        <div>
          <LabeledFileInput
            acceptFiles="application/pdf,image/*"
            title={title}
            onUpload={onFileUpload}
            onRemove={onFileRemove}
            disabled={
              (isTitleNationalCard &&
                documentData.status === DocumentStatus.CONFIRMED) ||
              documentData.status === DocumentStatus.PENDING ||
              disable
            }
            maxSize={maxFileSize}
          />
        </div>
        <div>
          <UserDocumentStatusLabel
            status={documentData?.status || ""}
            display={documentData?.statusDisplay || ""}
            isUploading={isUploading}
          ></UserDocumentStatusLabel>
        </div>
      </div>
    </div>
  );
};

export default DocumentItemComponent;
