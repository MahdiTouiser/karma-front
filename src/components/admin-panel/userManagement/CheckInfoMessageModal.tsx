import { useState } from "react";
import { toast } from "react-toastify";
import useApi from "../../../hooks/useApi";
import { BaseResponse } from "../../../models/shared.models";
import { CheckUserInfoRequest } from "../../../models/usermanagement.models";
import KButton from "../../shared/Button";
import KLabel from "../../shared/Label";
import KModal from "../../shared/Modal/Modal";
import KSpinner from "../../shared/Spinner";
import KTextArea from "../../shared/TextArea";
interface CheckInfoMessageModalProps {
  onCloseModal: (submitted: boolean) => void;
  userId: string;
  confirm?: boolean;
  showModal: boolean;
}
const CheckInfoMessageModal: React.FC<CheckInfoMessageModalProps> = ({
  onCloseModal,
  userId,
  confirm = false,
  showModal,
}) => {
  const title = confirm ? "پیام تأیید اطلاعات" : "پیام عدم تأیید اطلاعات";
  const [message, setMessage] = useState<string>("");
  const { sendRequest: sendCheckRequest, isPending } = useApi<
    CheckUserInfoRequest,
    BaseResponse<null>
  >();

  const onMessageChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    setMessage(event.target.value);
  };

  function resetModal(submitted: boolean) {
    setMessage("");
    onCloseModal(submitted);
  }
  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    checkInfo(userId, confirm, message);
  }

  function checkInfo(id: string, confirm: boolean, message: string) {
    sendCheckRequest(
      {
        url: "/Admin/CheckUserPersonalInformation",
        data: {
          id: id,
          isConfirmed: confirm,
          message: message,
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
      show={showModal}
      onClose={() => resetModal(false)}
      containerClass="lg:!w-[480px]"
    >
      <KModal.Header color="primary">{title}</KModal.Header>
      <KModal.Body>
        <form onSubmit={onSubmit}>
          <div className="px-6 py-6">
            <div className=" w-full">
              <KLabel htmlFor="message" className="mb-2">
                پیام
              </KLabel>
              <KTextArea
                id="message"
                value={message}
                onChange={onMessageChange}
                rows={6}
              />
            </div>
          </div>
          <div className="w-full px-5 pb-6 flex justify-start items-center">
            <KButton
              color="primary"
              type="submit"
              className="w-full"
              disabled={isPending}
            >
              {isPending && <KSpinner />}
              ارسال
            </KButton>
          </div>
        </form>
      </KModal.Body>
    </KModal>
  );
};

export default CheckInfoMessageModal;
