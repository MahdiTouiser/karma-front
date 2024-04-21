import {  useNavigate } from "react-router-dom";
import { BsAirplaneEngines } from "react-icons/bs";
import { toast } from "react-toastify";
export interface HomeLinkProps {
  title: string;
  href: string;
  newTab?: boolean;
  isActiveUser?: boolean;
  needActivation?: boolean;
}

const HomeLink: React.FC<HomeLinkProps> = (props) => {
  const navigate = useNavigate();
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (props.newTab) {
      window.open(props.href);
      return;
    }
    if (
      props.needActivation !== undefined &&
      props.needActivation &&
      !props.isActiveUser
    ) {
      toast.error('ابتدا حساب کاربری خود را تکمیل کنید.');
      return;
    }
    navigate(props.href);
  };
  return (
    <div className="p-1 my-1 min-w-fit w-1/2 flex justify-center mb-4">
      <button className="inline-flex gap-2 w-52" onClick={handleClick}>
        <BsAirplaneEngines size="1.5rem"></BsAirplaneEngines>
        <span>{props.title}</span>
      </button>
    </div>
  );
};

export default HomeLink;
