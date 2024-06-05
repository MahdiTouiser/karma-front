import { Button, ButtonProps, FlowbiteButtonTheme } from "flowbite-react";
import React from 'react';
import { DeepPartial } from "react-hook-form";

interface KButtonProps extends ButtonProps {
  children?: React.ReactNode;
}

const customTheme: DeepPartial<FlowbiteButtonTheme> = {
  color: {
    primary: 'bg-green-500 hover:bg-green-800 text-white disabled:hover:bg-green-800',
    secondary: 'bg-gray-400 hover:bg-gray-900 text-white disabled:hover:bg-gray-800',
    tertiary: 'bg-[#17a589] hover:bg-gray-700 text-white disabled:hover:bg-[#17a589]',
    warning: 'bg-red-600 bg-opacity-75 hover:bg-opacity-100 text-white disabled:bg-opacity-75',
  },
  pill: {
    off: 'rounded-sm',
  },
  outline: {
    pill: {
      off: 'rounded-sm [line-height:unset]',
    },
  },
};

const KButton: React.FC<KButtonProps> = (props) => {
  return (
    <Button theme={customTheme} {...props} className={`${props.className || ''} border-0 outline-none shadow-none rounded`}>
      {props.children}
    </Button>
  );
};

export default KButton;
