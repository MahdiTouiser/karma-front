import { Button, ButtonProps, FlowbiteButtonTheme } from "flowbite-react";
import { DeepPartial } from "react-hook-form";
interface SDButtonProps extends ButtonProps {
  children?: React.ReactNode;
}

const customTheme: DeepPartial<FlowbiteButtonTheme> = {
  color: {
    primary2: 'bg-primary2-800 hover:bg-primary2-900 text-white disabled:hover:bg-primary2-800',
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

const SDButton: React.FC<SDButtonProps> = (props) => {

  return (
    <Button theme={customTheme} {...props} className={`${props.className || ''} rounded`}>
      {props.children}
    </Button>
  );
};

export default SDButton;
