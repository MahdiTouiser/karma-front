import { InputHTMLAttributes, Ref, forwardRef } from "react";

interface SDSelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  invalid?: boolean;
  children: React.ReactNode;
}

const SDSelect = forwardRef(
  (props: SDSelectProps, ref: Ref<HTMLSelectElement>) => {
    const { invalid, className, placeholder, children, ...rest } = props;

    return (
      <select
        {...rest}
        ref={ref}
        className={`${invalid ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500"
          } ${className || ""
          } placeholder:text-right w-full h-10 bg-gray-50 border  text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block  p-2.5 disabled:text-gray-400 disabled:cursor-not-allowed  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
      >
        <option value="" disabled selected>
          {placeholder}
        </option>
        {children}
      </select>
    );
  }
);

export default SDSelect;
