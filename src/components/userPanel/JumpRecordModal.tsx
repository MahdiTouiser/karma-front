import { useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAPi from "../../hooks/useApi";
import { AddJumpRecordRequest } from "../../models/jumps.models";
import { BaseResponse } from "../../models/shared.models";
import KButton from "../shared/Button";
import KDatepicker from "../shared/DatePicker";
import KLabel from "../shared/Label";
import KModal from "../shared/Modal/Modal";
import KSpinner from "../shared/Spinner";
import KTextArea from "../shared/TextArea";
import KTextInput from "../shared/TextInput";

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
    <KModal
      show={showModal}
      onClose={() => resetModal(false)}
      containerClass="!p-0 lg:!w-[480px]"
    >
      <KModal.Header color={adminStyling ? "primary2" : "primary2"}>
        سابقه پرش جدید
      </KModal.Header>
      <KModal.Body>
        <form className="px-3 py-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full flex flex-wrap">
            <div className="w-full md:w-1/2 px-5 py-3">
              <KLabel htmlFor="date" className="mb-2">
                تاریخ
              </KLabel>
              <KDatepicker
                name="date"
                required={true}
                control={control}
              ></KDatepicker>
              {formErrors.date?.message && (
                <p className="text-red-600 text-sm pr-2 mt-2">
                  {formErrors.date.message}
                </p>
              )}
            </div>
            <div className="w-full md:w-1/2 px-5 py-3">
              <KLabel htmlFor="location" className="mb-2">
                محل پرواز
              </KLabel>
              <KTextInput
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
              <KLabel htmlFor="equipments" className="mb-2">
                تجهیزات
              </KLabel>
              <KTextInput
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
              <KLabel htmlFor="planeType" className="mb-2">
                نوع هواپیما
              </KLabel>
              <KTextInput
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
              <KLabel htmlFor="height" className="mb-2">
                ارتفاع(متر)
              </KLabel>
              <KTextInput
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
              <KLabel className="mb-2">مدت</KLabel>
              <div className="flex justify-between items-center">
                <div className="px-5">
                  <KTextInput
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
                  <KTextInput
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
                  {`${formErrors.minutes?.message || ""} ${formErrors.hours?.message || ""
                    }`}
                </p>
              )}
            </div>
          </div>
          <div className="w-full flex flex-wrap">
            <div className="w-full px-5 py-3">
              <KLabel htmlFor="height" className="mb-2">
                توضیحات
              </KLabel>
              <KTextArea
                id="description"
                {...register("description")}
                rows={4}
              ></KTextArea>
            </div>
          </div>
          <div className="w-full px-5 pt-5 flex justify-start items-center">
            <KButton
              type="submit"
              color={adminStyling ? "primary2" : "primary2"}
              className="!w-full"
              disabled={isPending}
            >
              {isPending && <KSpinner />}
              افزودن
            </KButton>
          </div>
        </form>
      </KModal.Body>
    </KModal>
  );
};

export default JumpRecordModal;
