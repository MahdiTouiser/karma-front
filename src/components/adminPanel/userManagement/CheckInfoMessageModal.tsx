import { useState } from "react";
import { toast } from "react-toastify";
import useAPi from "../../../hooks/useApi";
import { BaseResponse } from "../../../models/shared.models";
import { CheckUserInfoRequest } from "../../../models/usermanagement.models";
import SDButton from "../../shared/Button";
import SDLabel from "../../shared/Label";
import SDModal from "../../shared/Modal/Modal";
import SDSpinner from "../../shared/Spinner";
import SDTextArea from "../../shared/TextArea";
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
  const { sendRequest: sendCheckRequest, isPending } = useAPi<
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
    <SDModal
      show={showModal}
      onClose={() => resetModal(false)}
      containerClass="lg:!w-[480px]"
    >
      <SDModal.Header color="primary2">{title}</SDModal.Header>
      <SDModal.Body>
        <form onSubmit={onSubmit}>
          <div className="px-6 py-6">
            <div className=" w-full">
              <SDLabel htmlFor="message" className="mb-2">
                پیام
              </SDLabel>
              <SDTextArea
                id="message"
                value={message}
                onChange={onMessageChange}
                rows={6}
              />
            </div>
          </div>
          <div className="w-full px-5 pb-6 flex justify-start items-center">
            <SDButton
              color="primary2"
              type="submit"
              className="w-full"
              disabled={isPending}
            >
              {isPending && <SDSpinner />}
              ارسال
            </SDButton>
          </div>
        </form>
      </SDModal.Body>
    </SDModal>
  );
};

export default CheckInfoMessageModal;
