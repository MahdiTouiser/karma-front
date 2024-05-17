import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAPi from "../../../hooks/useApi";
import { BaseResponse } from "../../../models/shared.models";
import { Regexes } from "../../../utils/shared";
import KButton from "../../shared/Button";
import KLabel from "../../shared/Label";
import KModal from "../../shared/Modal/Modal";
import PasswordInput from "../../shared/PasswordInput";
import KSpinner from "../../shared/Spinner";

interface ResetUserPasswordModalProps {
  showModal: boolean;
  onCloseModal: () => void;
  userId: string;
}

const ResetUserPasswordModal: React.FC<ResetUserPasswordModalProps> = ({
  showModal,
  onCloseModal,
  userId,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    reset,
  } = useForm<{ password: string }>({
    mode: "onTouched",
  });

  const { sendRequest, isPending } = useAPi<
    { password: string },
    BaseResponse<null>
  >();

  const resetModal = () => {
    reset();
    onCloseModal();
  };

  function onSubmit(data: { password: string }) {
    sendRequest(
      {
        url: `/Admin/UpdateUserPassword/${userId}`,
        method: "put",
        data: data,
      },
      (response) => {
        toast.success(response.message);
        resetModal();
      },
      (error) => {
        toast.error(error?.message);
      }
    );
  }

  return (
    <KModal
      show={showModal}
      onClose={() => resetModal()}
      containerClass="!w-[480px]"
    >
      <KModal.Header color="primary">بازنشانی رمزعبور کاربر</KModal.Header>
      <KModal.Body>
        <form className="px-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 py-8">
            <KLabel>رمز عبور:</KLabel>
            <PasswordInput
              {...register("password", {
                required: "فیلد اجباری است.",
                pattern: {
                  value: Regexes.password,
                  message:
                    "رمز عبور حداقل 6 کاراکتر و شامل اعداد و حروف انگلیسی باشد.",
                },
              })}
            />
            {formErrors.password?.message && (
              <p className="text-red-600 text-xs pr-2 mt-2">
                {formErrors.password.message}
              </p>
            )}
          </div>
          <div className="w-full px-5 pb-6 flex justify-start items-center">
            <KButton
              color="primary"
              type="submit"
              className="w-full"
              disabled={isPending}
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

export default ResetUserPasswordModal;
