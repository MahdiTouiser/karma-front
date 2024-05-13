import { useEffect, useState } from "react";
import { UserStatuses } from "../../../models/shared.models";
import { UserDocumentsFields } from "../../../store/account";
import KButton from "../../shared/Button";
import KSpinner from "../../shared/Spinner";
import DocumentItemComponent from "./DocumentsItemComponent";

interface DocumentsProp {
  onSubmit: () => Promise<void>;
  isPending: boolean;
  userStatus: string;
  anyChange: boolean;
}

const Documents: React.FC<DocumentsProp> = (props) => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [disableAll, setDisableAll] = useState<boolean>(false);

  useEffect(() => {
    if (props.userStatus === UserStatuses.PENDING) {
      setDisableAll(true);
    }
  }, [props.userStatus])


  async function onSubmit() {
    setIsSubmitted(true);
    await props.onSubmit();
  }



  return (
    <>
      <div className="flex flex-col items-center">
        <div className="max-w-2xl mx-auto w-full">
          <p className="text-slate-500">
            جهت تکمیل ثبت نام مدارک زیر الزامی است.
          </p>
          <div className="mt-10">
            <DocumentItemComponent
              field={UserDocumentsFields.nationalCardDocument}
              title="کارت ملی"
              validation={isSubmitted}
              disable={disableAll}
            />
            <DocumentItemComponent
              field={UserDocumentsFields.logBookDocument}
              title="صفحه آخر Log Book"
              validation={isSubmitted}
              disable={disableAll}
            />
            <DocumentItemComponent
              field={UserDocumentsFields.attorneyDocument}
              title="وکالتنامه محضری"
              validation={isSubmitted}
              disable={disableAll}
            />
            <DocumentItemComponent
              field={UserDocumentsFields.medicalDocument}
              title="مدارک پزشکی"
              validation={isSubmitted}
              disable={disableAll}
            />
          </div>
          <div className="flex justify-center pt-6">
            <KButton
              color="primary2"
              type="submit"
              className="basis-full xs:basis-1/2"
              onClick={onSubmit}
              disabled={props.isPending || disableAll || (props.userStatus === UserStatuses.ACTIVE && !props.anyChange)}
            >
              {props.isPending && <KSpinner />}
              ذخیره
            </KButton>
          </div>
        </div>
      </div>
    </>
  );
};
export default Documents;
