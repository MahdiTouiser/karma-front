import { Button, ButtonProps, FlowbiteButtonTheme } from "flowbite-react";
import { DeepPartial } from "react-hook-form";
interface KButtonProps extends ButtonProps {
  children?: React.ReactNode;
}

const customTheme: DeepPartial<FlowbiteButtonTheme> = {
  color: {
    primary: 'bg-primary-800 hover:bg-primary-900 text-white disabled:hover:bg-primary-800',
    secondary: 'bg-gray-400 hover:bg-gray-900 text-white disabled:hover:bg-gray-800',
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
