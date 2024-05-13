// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import  Editor from "ckeditor5-custom-build/src/ckeditor";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAPi from "../../../hooks/useApi";
import { BaseResponse } from "../../../models/shared.models";
import {
  AddTermAndConditionsRequest,
  SkyDiveEvent,
} from "../../../models/skyDiveEvents.models";
import KButton from "../../shared/Button";
import KEditor from "../../shared/Editor";
import KModal from "../../shared/Modal/Modal";
import KSpinner from "../../shared/Spinner";
// import * as ClassicEditor from "../../../assets/ckEditor/build/ckeditor.js"

interface TermsAndConditionsModalProps {
  skyDiveEvent: SkyDiveEvent;
  onCloseModal: (submitted: boolean) => void;
}

const TermsAndConditionsModal: React.FC<TermsAndConditionsModalProps> = ({
  skyDiveEvent,
  onCloseModal,
}) => {
  const resetModal = (submitted: boolean) => {
    onCloseModal(submitted);
  };

  const [content, setContent] = useState<string>("");
  const { sendRequest, isPending } = useAPi<
    AddTermAndConditionsRequest,
    BaseResponse<null>
  >();

  useEffect(() => {
    setContent(skyDiveEvent.termsAndConditions);
  }, [skyDiveEvent]);

  function onChangeContent(data: string) {
    setContent(data);
  }

  function onSubmit(formEvent: FormEvent) {
    formEvent.preventDefault();
    sendRequest(
      {
        method: "put",
        url: `/SkyDiveEvents/ConditionsAndTerms/${skyDiveEvent.id}`,
        data: {
          conditionsAndTerms: content,
        },
      },
      (response) => {
        toast.success(response.message);
        resetModal(true);
      },
      (error) => {
        toast.error(error?.message);
      }
    );
  }

  return (
    <KModal
      show={true}
      onClose={() => resetModal(false)}
      containerClass="!w-[900px]"
    >
      <KModal.Header color="primary2">قوانین و شرایط رویداد</KModal.Header>
      <KModal.Body>
        <div>
          <div className="flex flex-col gap-3 my-5 items-center text-slate-700 text-center w-full ">
            <div className="flex gap-6">
              <p className="font-semibold">رویداد</p>
              <p>{skyDiveEvent.title}</p>
            </div>
          </div>
          <form className=" overflow-auto" onSubmit={onSubmit}>
            <div className="p-3">
              {/* <CKEditor editor={Editor as any}></CKEditor> */}
              <KEditor data={content} onChange={onChangeContent} />
            </div>
            <div className="w-full px-5 py-5 flex justify-center items-center">
              <KButton
                color="primary2"
                type="submit"
                className="w-96"
                disabled={isPending}
              >
                {isPending && <KSpinner color="blue" />}
                ذخیره
              </KButton>
            </div>
          </form>
        </div>
      </KModal.Body>
    </KModal>
  );
};

export default TermsAndConditionsModal;
