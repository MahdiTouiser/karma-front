import { Button, ButtonProps, DeepPartial, FlowbiteButtonTheme } from "flowbite-react";
interface SDButtonProps extends ButtonProps {
  children?: React.ReactNode;
}

const customTheme: DeepPartial<FlowbiteButtonTheme> = {
  color: {
    ...Button.defaultProps?.theme?.color,
    primary: 'bg-primary-500 hover:bg-primary-600 text-white  disabled:hover:bg-primary-500',
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
    <Button theme={customTheme} {...props} className={`${props.className || ''}`}>
      {props.children}
    </Button>
  );
};

export default SDButton;
