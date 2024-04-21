import {
  forwardRef,
  Ref,
  TextareaHTMLAttributes,
} from "react";
import { replacePersianArabicsNumbers } from "../../utils/shared";
export interface SDTextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

const SDTextArea = forwardRef(
  (props: SDTextAreaProps, ref: Ref<HTMLTextAreaElement>) => {
    const inputProps = { ...props };
    delete inputProps.invalid;
    delete inputProps.className;

    const inputHandler : React.ChangeEventHandler<HTMLTextAreaElement> = (event)=>{
      let value = event.target.value;
      value = replacePersianArabicsNumbers(value);
      event.target.value = value;
    }

    return (
      <textarea
        {...inputProps}
        id={props.id}
        onInput={inputProps.onInput ? inputProps.onInput :  inputHandler}
        ref={ref}
        className={`${
          props.invalid
            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
            : "border-gray-300 focus:border-blue-500"
        } ${
          props.className || ""
        } placeholder:text-right w-full  bg-gray-50 border  text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block  p-2.5 disabled:text-gray-400 disabled:cursor-not-allowed  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
      ></textarea>
    );
  }
);

export default SDTextArea;
