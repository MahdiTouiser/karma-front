import { ShellElement } from "./PanelShell";

interface HumbergerButtonProps extends ShellElement{
  className?: string;
}


const HumbergerButton: React.FC<HumbergerButtonProps> = (props) => {
  return (
    <button onClick={props.toggleMenu} className="mr-5">
      {
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`${props.className || ''}  w-10 h-10`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      }
    </button>
  );
};
export default HumbergerButton;
