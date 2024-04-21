import { DocumentItem, DocumentStatus } from "../../../models/account.models";
import SDButton from "../../shared/Button";
import SDCard from "../../shared/Card";
import noImage from "../../../assets/no-image.png";
import UserDocumentStatusLabel from "../../shared/UserDocumentStatusLabel";
import DocumentImagePlacholder from "../../../assets/document.png";
import { useCallback, useEffect, useState } from "react";
import useAPi, { axiosIntance } from "../../../hooks/useApi";
import { BaseResponse } from "../../../models/shared.models";
import { toast } from "react-toastify";
interface AdminUserDocumentItemProp {
  withDate?: boolean;
  title: string;
  documentData: DocumentItem | null;
  onChange: () => void;
}

const AdminUserDocumentItem: React.FC<AdminUserDocumentItemProp> = ({
  withDate = true,
  title,
  documentData,
  onChange,
}) => {
  const [fileContent, setFileContent] = useState<string | undefined>();
  const imageLink = documentData?.fileId
    ? `${import.meta.env.VITE_BASE_API_URL}/file/${documentData.fileId}`
    : "";

  const { sendRequest, isPending } = useAPi<null, BaseResponse<null>>();

  const checkDocument = useCallback(
    (id: string, approve: boolean) => {
      sendRequest(
        {
          url: `/Admin/CheckUserDocument/${id}/${approve}`,
          method: "put",
        },
        (response) => {
          toast.success(response.message);
          onChange();
        },
        (error) => {
          toast.error(error?.message || "");
        }
      );
    },
    [sendRequest, onChange]
  );

  useEffect(() => {
    const fetchFile = async (address: string) => {
      try {
        const response = await axiosIntance.get(address, {
          responseType: "blob",
        });
        const blob = response.data;

        const contentType = response.headers["content-type"];
        const isImage = contentType?.startsWith("image/") ?? false;
        if (isImage) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setFileContent(reader.result as string);
          };
          reader.readAsDataURL(blob);
        } else {
          setFileContent(DocumentImagePlacholder);
        }
      } catch (error) {
        console.error("Error fetching file:", error);
      }
    };
    if (documentData?.fileId) {
      fetchFile(imageLink);
    }
  }, [documentData?.fileId, imageLink]);

  //   const documentImage  =

  return (
    <SDCard className="border w-52 flex flex-col items-center mb-6">
      <div className="border w-40 ">
        <div className="h-48 block">
          {documentData?.fileId ? (
            <a href={imageLink} target="_blank">
              <img
                className="w-full h-full object-contain"
                src={fileContent}
                alt=""
              />
            </a>
          ) : (
            <img
              className="w-full h-full object-contain"
              src={noImage}
              alt=""
            />
          )}

          {/* {documentData && documentData.fileId && (
          )} */}
        </div>
        {/* {documentData && documentData.status !==DocumentStatus.NOT_LOADED && documentData.fileId && documentData.createdAt && (
          <p className="text-xs text-center pb-2">
            بارگذاری در {documentData.createdAt}
          </p>
        )} */}
      </div>
      <div className="text-center mt-2 mb-3">
        <p className="font-bold text-lg mb-1">{title}</p>
        <UserDocumentStatusLabel
          status={documentData?.status || ""}
          display={documentData?.statusDisplay || ""}
          isUploading={false}
        ></UserDocumentStatusLabel>

        {withDate && documentData?.expirationDate && (
          <p className="text-sm">تاریخ انقضا: {documentData.expirationDate}</p>
        )}
      </div>
      {documentData?.status === DocumentStatus.PENDING && (
        <div className="flex justify-center gap-1 mt-auto">
          <SDButton
            color="success"
            size="xs"
            className="px-0 py-0"
            disabled={isPending}
            onClick={() => checkDocument(documentData.id || "", true)}
          >
            تأیید
          </SDButton>
          <SDButton
            size="xs"
            className="px-0 py-0"
            color="failure"
            disabled={isPending}
            onClick={() => checkDocument(documentData.id || "", false)}
          >
            عدم تأیید
          </SDButton>
        </div>
      )}
    </SDCard>
  );
};

export default AdminUserDocumentItem;
