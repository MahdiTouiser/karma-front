import { DatePickerProps, CalendarProps } from "react-multi-date-picker";
import { Control, Controller } from "react-hook-form";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import persian_en from "react-date-object/locales/persian_en";
import DatePicker, { DateObject } from "react-multi-date-picker";
import { useState } from "react";
type DatePickerFinalProps = CalendarProps & DatePickerProps;

interface BaseNowBorder{
  step: "years" | "months" | "days";
  value: number;
  message?: string;
  direction:'after' | 'before';
}
export interface BaseNowValidationOptions {
  from?: BaseNowBorder;
  to?: BaseNowBorder
}
interface SDDatePickerProps extends Omit<DatePickerFinalProps, "onChange"> {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: Control<any>;
  required?: boolean;
  manualInvalid?: boolean;
  onChange?: (value: string) => void;
  baseNowValidationOptions?: BaseNowValidationOptions// use only with control
}

const SDDatepicker: React.FC<SDDatePickerProps> = (props) => {
  const datePickerPropsTemp = { ...props };
  delete datePickerPropsTemp.control;
  delete datePickerPropsTemp.required;
  delete datePickerPropsTemp.onChange;
  delete datePickerPropsTemp.baseNowValidationOptions;

  const [manualIsTouched, setManualIsTouched] = useState<boolean>(false);

  function formaDateObject(date: DateObject): string {
    if (!date) {
      return "";
    }
    date.locale = persian_en;
    return date.format("YYYY/MM/DD");
  }

  function validateBasedOnRanges(
    chooseDate: string,
    validationRage: BaseNowValidationOptions
  ) {
    const choosedDateObejct = new DateObject({
      date: chooseDate,
      format: "YYYY/MM/DD",
      locale: persian_en,
      calendar: persian,
    });
    const choosedJSDate = choosedDateObejct.toDate();
    if (validationRage.from) {
      const {value,message="تاریخ درست نیست",step,direction} = validationRage.from
      const minDateObject = new DateObject().setHour(0).setMinute(0).setSecond(0).setMillisecond(0);
      if(direction === 'before'){
        minDateObject.subtract(value,step)
      }else{
        minDateObject.add(value,step)
      }
      if (minDateObject.toDate() > choosedJSDate) {
        return message;
      }
    }
    if (validationRage.to) {
      const {value,message="تاریخ درست نیست",step,direction} = validationRage.to
      const maxDateObject = new DateObject().setHour(0).setMinute(0).setSecond(0).setMillisecond(0);
      if(direction === 'before'){
        maxDateObject.subtract(value,step)
      }else{
        maxDateObject.add(value,step)
      }
      if (maxDateObject.toDate() < choosedJSDate) {
        return message;
      }
    }
    return true;
  }

  function validateDate(value: string): string | boolean {
    const message = "تاریخ درست نیست.";
    if (!/\d{4}\/\d{2}\/\d{2}/.test(value)) {
      return message;
    }
    const [year, month, day] = value.split("/").map((part) => +part);
    if (day > 31 || day < 0 || month > 12 || month < 0 || year < 1000) {
      return message;
    }
    if (6 <= month && day > 30) {
      return message;
    }
    if (props.baseNowValidationOptions) {
      return validateBasedOnRanges(value,props.baseNowValidationOptions)
    }
    return true;
  }

  function handleChangeWithoutForm(date: DateObject) {
    let dateString = formaDateObject(date);
    const validation = validateDate(dateString);
    if (validation !== true) {
      dateString = "";
    }
    props.onChange && props.onChange(dateString);
  }

  return props.control ? (
    <Controller
      control={props.control}
      name={props.name}
      rules={
        props.required
          ? { required: "فیلد الزامی است.", validate: validateDate }
          : { validate: validateDate }
      } //optional
      render={({
        field: { onChange, value,onBlur },
        formState: { errors }, //optional, but necessary if you want to show an error message
      }) => (
        <>
          <DatePicker
            {...datePickerPropsTemp}
            onOpen={() => setManualIsTouched(true)}
            name={props.name}
            id={props.id}
            value={value || ""}
            onChange={(date: DateObject) => {
              onChange(formaDateObject(date));
            }}
            onClose={onBlur}
            calendar={persian}
            locale={persian_fa}
            calendarPosition="bottom-right"
            containerClassName={`w-full ${datePickerPropsTemp.containerClassName}`}
            inputClass={`${
              errors[props.name] ||
              (props.required && manualIsTouched && !value)
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:border-blue-500"
            } ${
              props.inputClass || ""
            }  placeholder:text-right w-full h-10 bg-gray-50 border  text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
          />
        </>
      )}
    />
  ) : (
    <DatePicker
      {...datePickerPropsTemp}
      onChange={handleChangeWithoutForm}
      value={props.value}
      name={props.name}
      id={props.id}
      //   format={language === "en" ? "MM/DD/YYYY" : "YYYY/MM/DD"}
      calendar={persian}
      locale={persian_fa}
      calendarPosition="bottom-right"
      containerClassName={`w-full ${datePickerPropsTemp.containerClassName}`}
      inputClass={`${
        props.manualInvalid
          ? "!border-red-500 focus:ring-red-500 focus:border-red-500"
          : "border-gray-300 focus:border-blue-500"
      } ${
        props.inputClass || ""
      } placeholder:text-right w-full h-10 bg-gray-50 border  text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
    />
  );
};

export default SDDatepicker;
