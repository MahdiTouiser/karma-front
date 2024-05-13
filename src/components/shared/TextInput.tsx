import { InputHTMLAttributes, Ref, forwardRef } from "react";
import { replacePersianArabicsNumbers } from "../../utils/shared";
import KButton from "./Button";
import KSpinner from "./Spinner";

export interface KTextInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
  numeric?: boolean;
  allowMinus?: boolean;
  magnifier?: boolean;
  onButtonClick?: () => void;
  isPending?: boolean;
}

const KTextInput = forwardRef(
  (props: KTextInputProps, ref: Ref<HTMLInputElement>) => {
    const inputProps = { ...props };
    delete inputProps.invalid;
    delete inputProps.numeric;
    delete inputProps.allowMinus;
    delete inputProps.magnifier;
    delete inputProps.className;
    delete inputProps.isPending;

    const inputHandler: React.ChangeEventHandler<HTMLInputElement> = (
      event,
    ) => {
      let value = event.target.value;
      value = replacePersianArabicsNumbers(value);

      if (props.numeric) {
        if (!props.allowMinus) {
          value = value.replace(/[^0-9]/g, "");
        } else {
          value = value.replace(/[^0-9-]/g, "");
          value = value.replace(/--/g, "-");
        }

        if (value.startsWith("-")) {
          value = "-" + value.replace(/-/g, "");
        }
      }

      event.target.value = value;
    };

    return (
      <div className="relative">
        <input
          {...inputProps}
          id={props.id}
          onInput={inputProps.onInput ? inputProps.onInput : inputHandler}
          ref={ref}
          className={`${props.invalid
            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:border-blue-500"
            } ${props.className || ""
            } block h-10 w-full rounded-sm border  bg-gray-50 p-2.5 text-sm text-gray-900 placeholder:text-right focus:border-blue-500  focus:ring-blue-500 disabled:cursor-not-allowed disabled:text-gray-400  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`}
        />

        {props.isPending ? (
          <div className="absolute inset-y-0 left-1 flex items-center pr-3">
            <KSpinner />
          </div>
        ) : (
          props.magnifier && (
            <div className="absolute inset-y-0 left-1 flex items-center pr-3">
              <KButton
                className="!h-8 w-8 bg-white font-extrabold  hover:bg-gray-300"
                onClick={props.onButtonClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-8 w-8 stroke-green-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </KButton>
            </div>
          )
        )}
      </div>
    );
  },
);

export default KTextInput;
