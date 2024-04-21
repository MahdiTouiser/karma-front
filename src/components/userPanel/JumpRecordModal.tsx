import { useForm } from "react-hook-form";
import SDModal from "../shared/Modal/Modal";
import SDLabel from "../shared/Label";
import SDDatepicker from "../shared/DatePicker";
import SDTextInput from "../shared/TextInput";
import { useRef } from "react";
import SDButton from "../shared/Button";
import useAPi from "../../hooks/useApi";
import { AddJumpRecordRequest } from "../../models/jumps.models";
import { BaseResponse } from "../../models/shared.models";
import SDTextArea from "../shared/TextArea";
import SDSpinner from "../shared/Spinner";
import { toast } from "react-toastify";

interface JumpRecordModalProps {
  showModal: boolean;
  onClose: (submitted: boolean) => void;
  adminStyling?: boolean;
  userId?: string;
}

interface JumpRecordFormData {
  userId?: string;
  date: string;
  location: string;
  equipments: string;
  planeType: string;
  height: number;
  hours: number;
  minutes: number;
  description: string;
}

const JumpRecordModal: React.FC<JumpRecordModalProps> = ({
  showModal,
  onClose,
  adminStyling = false,
  userId,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    control,
    reset,
    watch,
  } = useForm<JumpRecordFormData>({
    mode: "onTouched",
  });

  const minutesRef = useRef<string | number | undefined>();
  minutesRef.current = watch("minutes", undefined);
  const { sendRequest, isPending } = useAPi<
    AddJumpRecordRequest,
    BaseResponse<null>
  >();

  function resetModal(submitted: boolean) {
    reset();
    onClose(submitted);
  }

  function formatTime(hours: number, minutes: number) {
    const hourStr: string = hours > 9 ? hours.toString() : "0" + hours;
    const minuteStr: string = minutes > 9 ? minutes.toString() : "0" + minutes;
    return `${hourStr}:${minuteStr}:00`;
  }

  function onSubmit(data: JumpRecordFormData) {
    sendRequest(
      {
        url: "/JumpRecords",
        method: "post",
        data: {
          date: data.date,
          description: data.description,
          equipments: data.equipments,
          height: data.height,
          location: data.location,
          planeType: data.planeType,
          time: formatTime(data.hours, data.minutes),
          userId: adminStyling ? userId : undefined,
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
    <SDModal
      show={showModal}
      onClose={() => resetModal(false)}
      containerClass="!p-0 lg:!w-[480px]"
    >
      <SDModal.Header color={adminStyling ? "primary2" : "primary"}>
        سابقه پرش جدید
      </SDModal.Header>
      <SDModal.Body>
        <form className="px-3 py-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full flex flex-wrap">
            <div className="w-full md:w-1/2 px-5 py-3">
              <SDLabel htmlFor="date" className="mb-2">
                تاریخ
              </SDLabel>
              <SDDatepicker
                name="date"
                required={true}
                control={control}
              ></SDDatepicker>
              {formErrors.date?.message && (
                <p className="text-red-600 text-sm pr-2 mt-2">
                  {formErrors.date.message}
                </p>
              )}
            </div>
            <div className="w-full md:w-1/2 px-5 py-3">
              <SDLabel htmlFor="location" className="mb-2">
                محل پرواز
              </SDLabel>
              <SDTextInput
                type="text"
                id="location"
                invalid={!!formErrors.location}
                {...register("location", {
                  required: "فیلد اجباری است.",
                })}
              />
              {formErrors.location?.message && (
                <p className="text-red-600 text-xs pr-2 mt-2">
                  {formErrors.location.message}
                </p>
              )}
            </div>
          </div>
          <div className="w-full flex flex-wrap">
            <div className="w-full md:w-1/2 px-5 py-3">
              <SDLabel htmlFor="equipments" className="mb-2">
                تجهیزات
              </SDLabel>
              <SDTextInput
                type="text"
                id="equipments"
                invalid={!!formErrors.equipments}
                {...register("equipments", {
                  required: "فیلد اجباری است.",
                })}
              />
              {formErrors.equipments?.message && (
                <p className="text-red-600 text-xs pr-2 mt-2">
                  {formErrors.equipments.message}
                </p>
              )}
            </div>
            <div className="w-full md:w-1/2 px-5 py-3">
              <SDLabel htmlFor="planeType" className="mb-2">
                نوع هواپیما
              </SDLabel>
              <SDTextInput
                type="text"
                id="planeType"
                invalid={!!formErrors.planeType}
                {...register("planeType", {
                  required: "فیلد اجباری است.",
                })}
              />
              {formErrors.planeType?.message && (
                <p className="text-red-600 text-xs pr-2 mt-2">
                  {formErrors.planeType.message}
                </p>
              )}
            </div>
          </div>
          <div className="w-full flex flex-wrap">
            <div className="w-full md:w-1/2 px-5 py-3">
              <SDLabel htmlFor="height" className="mb-2">
                ارتفاع(متر)
              </SDLabel>
              <SDTextInput
                className="ltr"
                numeric={true}
                id="height"
                invalid={!!formErrors.height}
                {...register("height", {
                  required: "فیلد اجباری است.",
                  valueAsNumber: true,
                  validate: (value) => {
                    return value > 0 || "مقدار باید بزرگ‌تر از 0 باشد.";
                  },
                })}
              />
              {formErrors.height?.message && (
                <p className="text-red-600 text-xs pr-2 mt-2">
                  {formErrors.height.message}
                </p>
              )}
            </div>
            <div className="w-full md:w-1/2 px-5 py-3">
              <SDLabel className="mb-2">مدت</SDLabel>
              <div className="flex justify-between items-center">
                <div className="px-5">
                  <SDTextInput
                    numeric={true}
                    id="minutes"
                    placeholder="mm"
                    className="ltr text-center placeholder:!text-center"
                    invalid={!!formErrors.minutes}
                    {...register("minutes", {
                      required: "دقیقه نباید خالی باشد.",
                      valueAsNumber: true,
                      validate: (value) => {
                        return (
                          (value >= 0 && value <= 59) ||
                          "دقیقه باید بین 0 تا 59 باشد."
                        );
                      },
                    })}
                  />
                </div>

                <span className="text-3xl">:</span>
                <div className="px-5">
                  <SDTextInput
                    numeric={true}
                    id="hours"
                    placeholder="hh"
                    className="ltr text-center placeholder:!text-center"
                    invalid={!!formErrors.hours}
                    {...register("hours", {
                      required: "ساعت نباید خالی باشد.",
                      valueAsNumber: true,
                      validate: (value) => {
                        if (value < 0 || value > 23) {
                          return "ساعت باید بین 0 تا 23 باشد.";
                        }
                        if (+value === 0 && Number(minutesRef.current) === 0) {
                          return "مدت نمی‌تواند 0 باشد.";
                        }
                      },
                    })}
                  />
                </div>
              </div>
              {(formErrors.minutes?.message || formErrors.hours?.message) && (
                <p className="text-red-600 text-xs pr-2 mt-2">
                  {`${formErrors.minutes?.message || ""} ${
                    formErrors.hours?.message || ""
                  }`}
                </p>
              )}
            </div>
          </div>
          <div className="w-full flex flex-wrap">
            <div className="w-full px-5 py-3">
              <SDLabel htmlFor="height" className="mb-2">
                توضیحات
              </SDLabel>
              <SDTextArea
                id="description"
                {...register("description")}
                rows={4}
              ></SDTextArea>
            </div>
          </div>
          <div className="w-full px-5 pt-5 flex justify-start items-center">
            <SDButton
              type="submit"
              color={adminStyling ? "primary2" : "primary"}
              className="!w-full"
              disabled={isPending}
            >
              {isPending && <SDSpinner />}
              افزودن
            </SDButton>
          </div>
        </form>
      </SDModal.Body>
    </SDModal>
  );
};

export default JumpRecordModal;
