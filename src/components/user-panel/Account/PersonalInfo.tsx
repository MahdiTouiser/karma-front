/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import useApi from '../../../hooks/useApi'
import { PersonalInfoEditableFormData } from '../../../models/account.models'
import { BaseResponse, UserPersonalInfo } from '../../../models/shared.models'
import { accoutnActions } from '../../../store/account'
import { Regexes } from '../../../utils/shared'
import { heightRangeOptions, phoneInputValidator, weightRangeOptions } from '../../../utils/validations'
import KButton from '../../shared/Button'
import KLabel from '../../shared/Label'
import KTextInput from '../../shared/TextInput'

interface PersonalInfoProps {
  onSubmit: () => void
  formHook: UseFormReturn<PersonalInfoEditableFormData>
  disableAll: boolean
}

const PersonalInfo: React.FC<PersonalInfoProps> = props => {
  const {
    register,
    formState: { errors, touchedFields },
    handleSubmit,
    trigger,
    setValue,
  } = props.formHook

  const { sendRequest: getInfo, data: personalInfo } = useApi<null, BaseResponse<UserPersonalInfo>>()

  const userMobile = useAppSelector(state => state.auth.mobile)

  const dispatch = useAppDispatch()

  useEffect(() => {
    getInfo(
      {
        url: '/Users/GetPersonalInformation',
      },
      response => {
        // setFormValue(response.content);
        dispatch(accoutnActions.setPersonalInfo(response.content))
      }
    )
  }, [getInfo, dispatch])

  useEffect(() => {
    function setFormValue(info: UserPersonalInfo) {
      // reset({
      //   address: info.address,
      //   cityAndState: info.cityAndState || "",
      //   email: info.email,
      //   emergencyContact: info.emergencyContact,
      //   emergencyPhone: info.emergencyPhone,
      //   height: info.height,
      //   weight: info.weight,
      // });
      setValue('address', info.address || '')
      setValue('cityAndState', info.cityAndState || '')
      setValue('email', info.email || '')
      setValue('emergencyContact', info.emergencyContact || '')
      setValue('emergencyPhone', info.emergencyPhone || '')
      setValue('height', info.height || null)
      setValue('weight', info.weight || null)

      trigger()
    }

    if (personalInfo?.content) {
      setFormValue(personalInfo.content)
    }
  }, [personalInfo, trigger, setValue])

  function onSubmit(data: PersonalInfoEditableFormData) {
    const info: UserPersonalInfo = {
      ...personalInfo!.content,
      ...data,
    }
    dispatch(accoutnActions.setPersonalInfo(info))
    props.onSubmit()
  }

  return (
    <div className="flex pt-4">
      <form className="mx-auto flex max-w-xl flex-wrap justify-end" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6 flex w-full gap-6">
          <div className="w-1/2">
            <KLabel htmlFor="nationalCode">کد ملی</KLabel>
            <KTextInput type="text" id="nationalCode" disabled={true} defaultValue={personalInfo?.content.nationalCode} />
          </div>
          <div className="w-1/2">
            <KLabel htmlFor="birthDate">تاریخ تولد</KLabel>
            <KTextInput disabled={true} type="text" id="birthDate" defaultValue={personalInfo?.content.birthDate} />
          </div>
        </div>
        <div className="mb-6 flex w-full gap-3">
          <div className="w-1/3">
            <KLabel htmlFor="firstName">نام</KLabel>
            <KTextInput type="text" id="firstName" disabled={true} defaultValue={personalInfo?.content.firstName} />
          </div>
          <div className="w-2/3">
            <KLabel htmlFor="lastName">نام خانوادگی</KLabel>
            <KTextInput disabled={true} type="text" id="lastName" defaultValue={personalInfo?.content.lastName} />
          </div>
        </div>
        <div className="mb-6 w-full">
          <KLabel htmlFor="email">
            ایمیل
            {errors.email?.message && <span className="text-red-600">*</span>}
          </KLabel>
          <KTextInput
            {...register('email', {
              required: 'فیلد اجباری است.',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'مقدار وارد شده صحیح نیست.',
              },
            })}
            type="email"
            id="email"
            className="ltr"
            disabled={props.disableAll}
            invalid={!!errors.email && touchedFields.email}
          />
          {errors.email?.message && touchedFields.email && <p className="mt-2 pr-2 text-sm text-red-600">{errors.email.message}</p>}
        </div>
        <div className="mb-6 w-full">
          <KLabel htmlFor="cityId">
            استان و شهر اقامت
            {errors.cityAndState?.message && <span className="text-red-600">*</span>}
          </KLabel>
          <KTextInput
            id="cityId"
            {...register('cityAndState', { required: 'فیلد اجباری است.' })}
            invalid={!!errors.cityAndState && touchedFields.cityAndState}
            disabled={props.disableAll}
          ></KTextInput>
          {errors.cityAndState?.message && touchedFields.cityAndState && <p className="mt-2 pr-2 text-sm text-red-600">{errors.cityAndState.message}</p>}
        </div>
        <div className=" mb-6 w-full">
          <KLabel htmlFor="address">
            نشانی
            {errors.address?.message && <span className="text-red-600">*</span>}
          </KLabel>
          <KTextInput {...register('address', { required: 'فیلد اجباری است.' })} type="address" id="address" disabled={props.disableAll} invalid={!!errors.address && touchedFields.address} />
          {errors.address?.message && touchedFields.address && <p className="mt-2 pr-2 text-sm text-red-600">{errors.address.message}</p>}
        </div>
        <div className="mb-6 flex w-full gap-6">
          <div className="w-1/2 ">
            <KLabel htmlFor="height">
              قد (سانتی متر)
              {errors.height?.message && <span className="text-red-600">*</span>}
            </KLabel>
            <KTextInput
              {...register('height', {
                valueAsNumber: true,
                required: 'فیلد اجباری است.',
                ...heightRangeOptions,
              })}
              numeric={true}
              id="height"
              className="ltr"
              disabled={props.disableAll}
              invalid={!!errors.height && touchedFields.height}
            />
            {errors.height?.message && touchedFields.height && <p className="mt-2 pr-2 text-sm text-red-600">{errors.height.message}</p>}
          </div>
          <div className="w-1/2">
            <KLabel htmlFor="weight">
              وزن (کیلوگرم)
              {errors.weight?.message && <span className="text-red-600">*</span>}
            </KLabel>
            <KTextInput
              {...register('weight', {
                valueAsNumber: true,
                required: 'فیلد اجباری است.',
                ...weightRangeOptions,
              })}
              numeric={true}
              id="weight"
              disabled={props.disableAll}
              invalid={!!errors.weight && touchedFields.weight}
              className="ltr"
            />
            {errors.weight?.message && touchedFields.weight && <p className="mt-2 pr-2 text-sm text-red-600">{errors.weight.message}</p>}
          </div>
        </div>
        <div className="mt-8 w-full">
          <p className="mb-4 text-slate-700">اطلاعات تماس اضطراری</p>
          <div className="mb-6 flex w-full gap-6">
            <div className="w-1/2 ">
              <KLabel htmlFor="emergencyContact">
                نام
                {errors.emergencyContact?.message && <span className="text-red-600">*</span>}
              </KLabel>
              <KTextInput
                {...register('emergencyContact', {
                  required: 'فیلد اجباری است.',
                  pattern: {
                    value: Regexes.persianName,
                    message: 'نام باید فارسی باشد.',
                  },
                })}
                type="text"
                disabled={props.disableAll}
                id="emergencyContact"
                invalid={!!errors.emergencyContact && touchedFields.emergencyContact}
              />
              {errors.emergencyContact?.message && touchedFields.emergencyContact && <p className="mt-2 pr-2 text-sm text-red-600">{errors.emergencyContact.message}</p>}
            </div>
            <div className="w-1/2">
              <KLabel htmlFor="emergencyPhone">
                موبایل
                {errors.emergencyPhone?.message && <span className="text-red-600">*</span>}
              </KLabel>
              <KTextInput
                {...phoneInputValidator}
                {...register('emergencyPhone', {
                  pattern: {
                    value: Regexes.mobile,
                    message: 'شماره موبایل صحیح نیست.',
                  },
                  required: 'فیلد اجباری است.',
                  validate: value => {
                    if (value !== userMobile) {
                      return
                    }
                    return 'شماره موبایل اضطراری نباید با شماره موبایل شما یکسان باشد.'
                  },
                })}
                type="text"
                disabled={props.disableAll}
                maxLength={14}
                id="emergencyPhone"
                className="ltr"
                invalid={!!errors.emergencyPhone && touchedFields.emergencyPhone}
              />
              {errors.emergencyPhone?.message && touchedFields.emergencyPhone && <p className="mt-2 pr-2 text-sm text-red-600">{errors.emergencyPhone.message}</p>}
            </div>
          </div>
        </div>
        <div className="flex w-full justify-center ">
          <KButton className="w-full md:w-1/2" color="primary" type="submit" disabled={props.disableAll}>
            مرحله بعد
          </KButton>
        </div>
      </form>
    </div>
  )
}
export default PersonalInfo
