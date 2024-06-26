import React from "react";
import persian from "react-date-object/calendars/persian";
import persian_en from "react-date-object/locales/persian_en";
import persian_fa from "react-date-object/locales/persian_fa";
import { Control, Controller } from "react-hook-form";
import DatePicker, { CalendarProps, DateObject, DatePickerProps } from "react-multi-date-picker";

type DatePickerFinalProps = CalendarProps & DatePickerProps;

interface BaseNowBorder {
  step: "years" | "months" | "days";
  value: number;
  message?: string;
  direction: 'after' | 'before';
}

export interface BaseNowValidationOptions {
  from?: BaseNowBorder;
  to?: BaseNowBorder;
}

interface KDatePickerProps extends Omit<DatePickerFinalProps, "onChange"> {
  name: string;
  control: Control<any>;
  required?: boolean;
  manualInvalid?: boolean;
  baseNowValidationOptions?: BaseNowValidationOptions;
}

const KDatepicker: React.FC<KDatePickerProps> = (props) => {
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
    const choosedJKate = choosedDateObejct.toDate();
    if (validationRage.from) {
      const { value, message = "تاریخ درست نیست", step, direction } = validationRage.from;
      const minDateObject = new DateObject().setHour(0).setMinute(0).setSecond(0).setMillisecond(0);
      if (direction === 'before') {
        minDateObject.subtract(value, step);
      } else {
        minDateObject.add(value, step);
      }
      if (minDateObject.toDate() > choosedJKate) {
        return message;
      }
    }
    if (validationRage.to) {
      const { value, message = "تاریخ درست نیست", step, direction } = validationRage.to;
      const maxDateObject = new DateObject().setHour(0).setMinute(0).setSecond(0).setMillisecond(0);
      if (direction === 'before') {
        maxDateObject.subtract(value, step);
      } else {
        maxDateObject.add(value, step);
      }
      if (maxDateObject.toDate() < choosedJKate) {
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
      return validateBasedOnRanges(value, props.baseNowValidationOptions);
    }
    return true;
  }

  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <DatePicker
          {...props}
          onChange={(date: DateObject) => {
            let dateString = formaDateObject(date);
            const validation = validateDate(dateString);
            if (validation !== true) {
              dateString = "";
            }
            onChange(dateString);
          }}
          value={value || ""}
          name={props.name}
          id={props.id}
          calendar={persian}
          locale={persian_fa}
          calendarPosition="bottom-right"
          containerClassName={`w-full ${props.containerClassName}`}
          inputClass={`${error || props.manualInvalid
            ? "!border-red-500 focus:ring-red-500 focus:border-red-500"
            : "border-gray-300 focus:border-blue-500"
            } ${props.inputClass || ""
            } placeholder:text-right w-full h-10 bg-gray-50 border  text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
        />
      )}
    />
  );
};

export default KDatepicker;
