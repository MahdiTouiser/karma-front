import { useState } from "react";
import { toast } from "react-toastify";
import { useAppSelector } from "../../../hooks/reduxHooks";
import useAPi from "../../../hooks/useApi";
import {
  DocumentItemModel,
  DocumentsUplodModel,
} from "../../../models/account.models";
import { BaseResponse } from "../../../models/shared.models";
import KButton from "../../shared/Button";
import KModal from "../../shared/Modal/Modal";
import KSpinner from "../../shared/Spinner";
import AdminDocumentUploadItem from "./AdminDocumentUploadItem";

interface AdminUploadDocumentModalProps {
  onCloseModal: (submitted: boolean) => void;
  userId: string;
}
const AdminUploadDocumentModal: React.FC<AdminUploadDocumentModalProps> = ({
  onCloseModal,
  userId,
}) => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [anyChange, setAnyChange] = useState<boolean>(false);
  const medicalDocumentsValidityDuration = useAppSelector(
    (state) =>
      state.generalSettings.generalSettings?.medicalDocumentsValidityDuration
  );
  const attorneyDocumentsValidityDuration = useAppSelector(
    (state) =>
      state.generalSettings.generalSettings?.attorneyDocumentsValidityDuration
  );
  const [nationalCardDocumentModel, setNationalCardDocumentModel] =
    useState<DocumentItemModel>({
      fileId: "",
    });

  const [logBookDocumenttModel, setLogBookDocumentModel] =
    useState<DocumentItemModel>({
      fileId: "",
    });

  const [attorneyDocumentModel, setAttorneyDocumentModel] =
    useState<DocumentItemModel>({
      fileId: "",
      withDate: true,
    });

  const [medicalDocumentModel, setMedicalDocumentModel] =
    useState<DocumentItemModel>({
      fileId: "",
      withDate: true,
    });

  const { sendRequest, isPending } = useAPi<
    DocumentsUplodModel,
    BaseResponse<string>
  >();

  function handleChangeDocument(
    doc: DocumentItemModel,
    setter: React.Dispatch<React.SetStateAction<DocumentItemModel>>
  ) {
    if (!anyChange && doc.fileId) {
      setAnyChange(true);
    }
    setter(doc);
  }

  function resetModal(submitted: boolean) {
    setSubmitted(false);
    onCloseModal(submitted);
  }

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitted(true);
    if (
      attorneyDocumentModel.validationMessage ||
      medicalDocumentModel.validationMessage
    ) {
      return;
    }
    sendRequest(
      {
        url: `/Admin/UploadDocument/${userId}`,
        data: {
          nationalCardDocument: nationalCardDocumentModel.fileId
            ? { fileId: nationalCardDocumentModel.fileId }
            : undefined,
          logBookDocument: logBookDocumenttModel.fileId
            ? { fileId: logBookDocumenttModel.fileId }
            : undefined,
          attorneyDocument: attorneyDocumentModel.fileId
            ? {
              fileId: attorneyDocumentModel.fileId,
              expirationDate: attorneyDocumentModel.expirationDate,
            }
            : undefined,
          medicalDocument: medicalDocumentModel.fileId
            ? {
              fileId: medicalDocumentModel.fileId,
              expirationDate: medicalDocumentModel.expirationDate,
            }
            : undefined,
        },
        method: "put",
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
      containerClass="!p-0 lg:!w-[480px]"
    >
      <KModal.Header color="primary">بارگذاری مدارک</KModal.Header>
      <KModal.Body>
        <form onSubmit={onSubmit}>
          <div className="px-6 py-6">
            <AdminDocumentUploadItem
              title="کارت ملی"
              documentData={nationalCardDocumentModel}
              validation={submitted}
              onChange={(item) => {
                handleChangeDocument(item, setNationalCardDocumentModel);
              }}
            />
            <AdminDocumentUploadItem
              title="صفحه آخر Log Book"
              documentData={logBookDocumenttModel}
              validation={submitted}
              onChange={(item) => {
                handleChangeDocument(item, setLogBookDocumentModel);
              }}
            />
            <AdminDocumentUploadItem
              title="وکالت‌نامه محضری"
              documentData={attorneyDocumentModel}
              validation={submitted}
              onChange={(item) => {
                handleChangeDocument(item, setAttorneyDocumentModel);
              }}
              minExpireDay={attorneyDocumentsValidityDuration}
            />
            <AdminDocumentUploadItem
              title="مدارک پزشکی"
              documentData={medicalDocumentModel}
              validation={submitted}
              onChange={(item) => {
                handleChangeDocument(item, setMedicalDocumentModel);
              }}
              minExpireDay={medicalDocumentsValidityDuration}
            />
          </div>
          <div className="w-full px-5 pb-6 flex justify-start items-center">
            <KButton
              color="primary"
              type="submit"
              className="w-full"
              disabled={isPending || !anyChange}
            >
              {isPending && <KSpinner />}
              ذخیره
            </KButton>
          </div>
        </form>
      </KModal.Body>
    </KModal>
  );
};

export default AdminUploadDocumentModal;