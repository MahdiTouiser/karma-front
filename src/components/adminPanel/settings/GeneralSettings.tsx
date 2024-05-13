import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import useAPi from "../../../hooks/useApi";
import { GeneralSettings } from "../../../models/settings.models";
import {
  BaseResponse,
  UserStatuses,
  UserStatusesPersianMap,
} from "../../../models/shared.models";
import { fetchGeneralSettings } from "../../../store/generalSettings";
import SDButton from "../../shared/Button";
import SDLabel from "../../shared/Label";
import SDSpinner from "../../shared/Spinner";
import SDTextInput from "../../shared/TextInput";

const GeneralSettingsComponent: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    control,
    reset,
  } = useForm<GeneralSettings>({
    mode: "onTouched",
  });
  const { fields } = useFieldArray({
    control,
    name: "userStatusInfo",
  });

  const generalSettingsState = useAppSelector((state) => state.generalSettings);
  const dispatch = useAppDispatch();
  const { sendRequest: saveSettingsRequest, isPending: isSaving } = useAPi<
    GeneralSettings,
    BaseResponse<null>
  >();

  useEffect(() => {
    if (generalSettingsState.generalSettings) {
      reset({
        termsAndConditionsUrl:
          generalSettingsState.generalSettings.termsAndConditionsUrl,
        userStatusInfo: generalSettingsState.generalSettings.userStatusInfo
          .length
          ? generalSettingsState.generalSettings.userStatusInfo
          : [
            {
              status: UserStatuses.AWAITING_COMPLETION,
              description: "",
            },
            {
              status: UserStatuses.PENDING,
              description: "",
            },
            {
              status: UserStatuses.ACTIVE,
              description: "",
            },
            {
              status: UserStatuses.INACTIVE,
              description: "",
            },
          ],
        registrationTermsAndConditionsUrl:
          generalSettingsState.generalSettings
            .registrationTermsAndConditionsUrl,
        fileSizeLimitation:
          generalSettingsState.generalSettings.fileSizeLimitation,
        jumpDuration: generalSettingsState.generalSettings.jumpDuration,
        medicalDocumentsValidityDuration:
          generalSettingsState.generalSettings.medicalDocumentsValidityDuration,
        attorneyDocumentsValidityDuration:
          generalSettingsState.generalSettings
            .attorneyDocumentsValidityDuration,
        vat: generalSettingsState.generalSettings.vat,
      });
    }
  }, [generalSettingsState, reset]);

  function onSubmit(data: GeneralSettings) {
    saveSettingsRequest(
      {
        url: "/settings",
        method: "put",
        data: data,
      },
      (response) => {
        toast.success(response.message);
        dispatch(fetchGeneralSettings());
      },
      (error) => {
        toast.error(error?.message);
      }
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6">
        <SDLabel htmlFor="termsAndConditionsUrl">
          لینک شرایط و قوانین اصلی:
        </SDLabel>
        <SDTextInput
          className="ltr"
          disabled={generalSettingsState.loading}
          invalid={!!formErrors.termsAndConditionsUrl}
          id="termsAndConditionsUrl"
          {...register("termsAndConditionsUrl", {
            required: "این فیلد اجباری است.",
          })}
        />
        {formErrors.termsAndConditionsUrl?.message && (
          <p className="text-red-600 text-xs pr-2 mt-2">
            {formErrors.termsAndConditionsUrl.message}
          </p>
        )}
      </div>
      <div className="mb-6">
        <SDLabel htmlFor="registrationTermsAndConditionsUrl">
          لینک شرایط و قوانین ثبت نام:
        </SDLabel>
        <SDTextInput
          className="ltr"
          disabled={generalSettingsState.loading}
          invalid={!!formErrors.registrationTermsAndConditionsUrl}
          id="registrationTermsAndConditionsUrl"
          {...register("registrationTermsAndConditionsUrl", {
            required: "این فیلد اجباری است.",
          })}
        />
        {formErrors.registrationTermsAndConditionsUrl?.message && (
          <p className="text-red-600 text-xs pr-2 mt-2">
            {formErrors.registrationTermsAndConditionsUrl.message}
          </p>
        )}
      </div>
      <div className="mb-6 flex gap-6">
        <div className="w-full">
          <SDLabel htmlFor="fileSizeLimitation">حداکثر حجم آپلود (KB):</SDLabel>
          <SDTextInput
            numeric={true}
            className="ltr"
            disabled={generalSettingsState.loading}
            invalid={!!formErrors.fileSizeLimitation}
            id="fileSizeLimitation"
            {...register("fileSizeLimitation", {
              required: "این فیلد اجباری است.",
              valueAsNumber: true,
            })}
          />
          {formErrors.fileSizeLimitation?.message && (
            <p className="text-red-600 text-xs pr-2 mt-2">
              {formErrors.fileSizeLimitation.message}
            </p>
          )}
        </div>
        <div className="w-full">
          <SDLabel htmlFor="jumpDuration">اعتبار سابقه پرش (روز):</SDLabel>
          <SDTextInput
            numeric={true}
            className="ltr"
            invalid={!!formErrors.jumpDuration}
            disabled={generalSettingsState.loading}
            id="jumpDuration"
            {...register("jumpDuration", {
              required: "این فیلد اجباری است.",
              valueAsNumber: true,
            })}
          />
          {formErrors.jumpDuration?.message && (
            <p className="text-red-600 text-xs pr-2 mt-2">
              {formErrors.jumpDuration.message}
            </p>
          )}
        </div>
      </div>
      <div className="mb-6 flex gap-6">
        <div className="w-full">
          <SDLabel htmlFor="attorneyDocumentsValidityDuration">
            حداقل اعتبار وکالت‌نامه (روز):
          </SDLabel>
          <SDTextInput
            numeric={true}
            className="ltr"
            disabled={generalSettingsState.loading}
            invalid={!!formErrors.attorneyDocumentsValidityDuration}
            id="attorneyDocumentsValidityDuration"
            {...register("attorneyDocumentsValidityDuration", {
              required: "این فیلد اجباری است.",
              valueAsNumber: true,
            })}
          />
          {formErrors.attorneyDocumentsValidityDuration?.message && (
            <p className="text-red-600 text-xs pr-2 mt-2">
              {formErrors.attorneyDocumentsValidityDuration.message}
            </p>
          )}
        </div>
        <div className="w-full">
          <SDLabel htmlFor="medicalDocumentsValidityDuration">
            حداقل اعتبار مدارک پزشکی (روز):
          </SDLabel>
          <SDTextInput
            numeric={true}
            className="ltr"
            invalid={!!formErrors.medicalDocumentsValidityDuration}
            disabled={generalSettingsState.loading}
            id="medicalDocumentsValidityDuration"
            {...register("medicalDocumentsValidityDuration", {
              required: "این فیلد اجباری است.",
              valueAsNumber: true,
            })}
          />
          {formErrors.medicalDocumentsValidityDuration?.message && (
            <p className="text-red-600 text-xs pr-2 mt-2">
              {formErrors.medicalDocumentsValidityDuration.message}
            </p>
          )}
        </div>
      </div>
      <div className="mb-6 flex ml-6">
        <div className="w-1/2">
          <SDLabel htmlFor="vat">مالیات بر ارزش افزوده (درصد):</SDLabel>
          <SDTextInput
            numeric={true}
            className="ltr"
            invalid={!!formErrors.vat}
            disabled={generalSettingsState.loading}
            id="vat"
            {...register("vat", {
              required: "این فیلد اجباری است.",
              valueAsNumber: true,
              max: {
                value: 100,
                message: "مقدار درصدی مجاز نیست.",
              },
            })}
          />
          {formErrors.vat?.message && (
            <p className="text-red-600 text-xs pr-2 mt-2">
              {formErrors.vat.message}
            </p>
          )}
        </div>
      </div>

      <div className="mt-10">
        <h6 className="text-slate-700 font-semibold text-lg mb-4">
          توضیحات وضعیت‌ها
        </h6>
        {fields.map((field, index) => {
          return (
            <div key={field.id} className="mb-6">
              <SDLabel htmlFor={field.status}>
                {UserStatusesPersianMap.get(field.status)}
              </SDLabel>
              <SDTextInput
                id={field.status}
                disabled={generalSettingsState.loading}
                {...register(`userStatusInfo.${index}.description` as const, {
                  required: "این فیلد اجباری است.",
                })}
              />
              {formErrors?.userStatusInfo?.[index]?.description && (
                <p className="text-red-600 text-xs pr-2 mt-2">
                  {formErrors?.userStatusInfo?.[index]?.description?.message}
                </p>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-8 flex justify-center">
        <SDButton
          className="w-full max-w-sm"
          color="primary2"
          disabled={generalSettingsState.loading || isSaving}
          type="submit"
        >
          {isSaving && <SDSpinner />}
          ذخیره
        </SDButton>
      </div>
    </form>
  );
};

export default GeneralSettingsComponent;
