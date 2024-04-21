import { useEffect, useState } from "react";
import { DocumentItemModel } from "../../../models/account.models";
import SDDatepicker from "../../shared/DatePicker";
import SDLabel from "../../shared/Label";
import LabeledFileInput from "../../shared/LabeledFileInput";
import { DateObject } from "react-multi-date-picker";
import persian_en from "react-date-object/locales/persian_en";
import persian from "react-date-object/calendars/persian";
import { useAppSelector } from "../../../hooks/reduxHooks";

interface AdminDocumentUploadItemProps {
  title: string;
  documentData: DocumentItemModel;
  validation: boolean;
  onChange: (documentData: DocumentItemModel) => void;
  minExpireDay?: number;
}
const AdminDocumentUploadItem: React.FC<AdminDocumentUploadItemProps> = ({
  title,
  documentData,
  validation,
  onChange,
  minExpireDay,
}) => {
  const localDocumentData = { ...documentData };
  const [expirationDate, setDocumentExpireDate] = useState<string>("");
  const [timeStamp, setTimeStamp] = useState<number>();
  const maxFileSize = useAppSelector(
    (state) => state.generalSettings.generalSettings?.fileSizeLimitation
  );
  function onFileUpload(id: string) {
    localDocumentData.fileId = id;
    // if (documentData.withDate && !expirationDate) {
    //   localDocumentData.validationMessage =
    //     "تاریخ انقضا برای این مدرک الزامی است.";
    // }
    onChange(localDocumentData);
  }

  function onFileRemove() {
    localDocumentData.fileId = "";
    localDocumentData.validationMessage = "";
    onChange(localDocumentData);
  }

  function onDateChange(value: string) {
    localDocumentData.expirationDate = value;
    localDocumentData.validationMessage = "";
    setDocumentExpireDate(value);

    if (timeStamp && value) {
      const expireDateObejct = new DateObject({
        date: value,
        format: "YYYY/MM/DD",
        locale: persian_en,
        calendar: persian,
      });
      const expirationJSDate = expireDateObejct.toDate();
      if (expirationJSDate.getTime() < timeStamp) {
        localDocumentData.validationMessage =
          "حداقل مدت اعتبار رعایت نشده است.";
      }
    }
    // if(!hasFile){
    //   return
    // }
    onChange(localDocumentData);
  }

  useEffect(() => {
    if (minExpireDay) {
      const minDate = new Date();
      minDate.setDate(minDate.getDate() + minExpireDay);
      minDate.setHours(0, 0, 0, 0);
      setTimeStamp(minDate.getTime());
    }
  }, [minExpireDay]);

  return (
    <div className="py-5  border-b border-slate-300 last:border-none">
      <p className="text-slate-700 text-lg font-semibold">{title}</p>
      <div className="pr-4 mt-3 flex items-center">
        <LabeledFileInput
          acceptFiles="application/pdf,image/*"
          title={title}
          onUpload={onFileUpload}
          onRemove={onFileRemove}
          maxSize={maxFileSize}
        />
        {documentData.withDate && (
          <div className="relative mr-3 md:mr-12">
            <SDLabel className="whitespace-nowrap   !mb-0 bg-white text-sm -top-3 px-1 right-2  absolute ml-0">
              تاریخ انقضا
            </SDLabel>
            <SDDatepicker
              inputClass=" text-center !bg-white border-slate-500 !w-44"
              name="expireDate"
              onChange={onDateChange}
              required={true}
              manualInvalid={
                (validation || !!documentData.expirationDate) &&
                !!documentData.validationMessage
              }
              value={expirationDate}
              onOpenPickNewDate={false}
            ></SDDatepicker>
          </div>
        )}
      </div>
      {(validation || !!documentData.expirationDate) &&
        documentData.validationMessage && (
          <p className="text-red-600 text-sm pr-2 mt-2 text-center">
            {documentData.validationMessage}
          </p>
        )}
    </div>
  );
};

export default AdminDocumentUploadItem;
