import { Button, ButtonProps, FlowbiteButtonTheme } from "flowbite-react";
import { DeepPartial } from "react-hook-form";
interface KButtonProps extends ButtonProps {
  children?: React.ReactNode;
}

const customTheme: DeepPartial<FlowbiteButtonTheme> = {
  color: {
    primary: 'bg-primary2-800 hover:bg-primary2-900 text-white disabled:hover:bg-primary2-800',
    secondary: 'bg-gray-400 hover:bg-gray-900 text-white disabled:hover:bg-gray-800',
    tertiary: 'bg-[#5660f2] hover:bg-[#3e47c0] text-white disabled:hover:bg-[#5660f2]',
    quaternary: 'bg-green-500 hover:bg-green-700 text-white disabled:hover:bg-green-500',
  },
  pill: {
    off: 'rounded-sm'
  },
  outline: {
    pill: {
      off: 'rounded-sm [line-height:unset]'
    }
  }
}

const KButton: React.FC<KButtonProps> = (props) => {

  return (
    <Button theme={customTheme} {...props} className={`${props.className || ''} rounded`}>
      {props.children}
    </Button>
  );
};

export default KButton;
