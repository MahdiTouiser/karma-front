import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import KAlert from "../../../components/shared/Alert";
import KButton from "../../../components/shared/Button";
import KDatepicker from "../../../components/shared/DatePicker";
import KLabel from "../../../components/shared/Label";
import KSpinner from "../../../components/shared/Spinner";
import KTextInput from "../../../components/shared/TextInput";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import useAPi from "../../../hooks/useApi";
import { UserPersonalInfo } from "../../../models/shared.models";
import { authActions } from "../../../store/auth";
import { updateAuthDataInLocal } from "../../../utils/authUtils";
import { Regexes } from "../../../utils/shared";
import {
  birthDateBaseNowValidation,
  nationalCodeValidator,
} from "../../../utils/validations";

const SignUpPersonaPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    sendRequest,
    errors: apiErrors,
    isPending,
  } = useAPi<UserPersonalInfo>();
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<UserPersonalInfo>({
    mode: "onTouched",
  });

  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

  function navigateToNextPage() {
    navigate("../user-info");
  }

  function onSubmit(data: UserPersonalInfo) {
    sendRequest(
      {
        url: "/Users/UserPersonalInformationCompletion/true",
        data: data,
        method: "post",
      },
      () => {
        updateAuthDataInLocal({ personalInformationCompleted: true });
        dispatch(authActions.completePersonalInformation());
        navigateToNextPage();
      }
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-8 w-full">
      <div className="mb-6">
        <h1 className="text-lg font-semibold">اطلاعات شخصی</h1>
        <p className="text-slate-400">
          برای تکمیل ثبت نام، اطلاعات خود را کامل کنید.
        </p>
      </div>
      {apiErrors && (
        <KAlert color="red" className="my-2">
          {apiErrors.message}
        </KAlert>
      )}
      <div>
        <div className="mb-4">
          <KLabel htmlFor="nationalCode">کد ملی</KLabel>
          <KTextInput
            {...nationalCodeValidator}
            {...register("nationalCode", {
              required: "فیلد الزامی است.",
              pattern: {
                value: /^\d{10}$/,
                message: "کد ملی باید 10 رقم باشد.",
              },
            })}
            type="text"
            id="nationalCode"
            maxLength={10}
            invalid={!!errors.nationalCode}
          />
          {errors.nationalCode?.message && (
            <p className="text-red-600 text-sm pr-2 mt-2">
              {errors.nationalCode.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <KLabel htmlFor="firstName">نام</KLabel>
          <KTextInput
            {...register("firstName", {
              required: "فیلد الزامی است.",
              pattern: {
                value: Regexes.persianName,
                message: "نام باید فارسی باشد.",
              },
            })}
            type="text"
            id="firstName"
            invalid={!!errors.firstName}
          />
          {errors.firstName?.message && (
            <p className="text-red-600 text-sm pr-2 mt-2">
              {errors.firstName.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <KLabel htmlFor="lastName">نام خانوادگی</KLabel>
          <KTextInput
            {...register("lastName", {
              required: "فیلد الزامی است.",
              pattern: {
                value: Regexes.persianName,
                message: "نام خانوادگی باید فارسی باشد.",
              },
            })}
            type="text"
            id="lastName"
            invalid={!!errors.lastName}
          />
          {errors.lastName?.message && (
            <p className="text-red-600 text-sm pr-2 mt-2">
              {errors.lastName.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <KLabel htmlFor="birthDate">تاریخ تولد</KLabel>
          <KDatepicker
            name="birthDate"
            control={control}
            required={true}
            id="birthDate"
            baseNowValidationOptions={birthDateBaseNowValidation}
          ></KDatepicker>

          {errors.birthDate && (
            <p className="text-red-600 text-sm pr-2 mt-2">
              {errors.birthDate.message}
            </p>
          )}
        </div>
        <div>
          <KButton
            type="submit"
            color="primary"
            className="w-full"
            disabled={isPending}
          >
            {isPending && <KSpinner />}
            مرحله بعد
          </KButton>
        </div>
      </div>
    </form>
  );
};

export default SignUpPersonaPage;
