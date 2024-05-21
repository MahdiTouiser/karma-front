import React from "react";
import { LinkWithIcon } from "../../models/shared.models";
import CircularProgress from "../shared/CircularProgress";

interface SignupSidebarProps {
  links: LinkWithIcon[];
  activeIndex: number;
  onLinkClick?: (index: number) => void;
}

const SignupSidebar: React.FC<SignupSidebarProps> = ({ links, activeIndex }) => {
  return (
    <div>
      <div className="mt-5">
        <CircularProgress progress={20} />
      </div>
      {links.map((link, index) => (
        <div
          key={index}
          className={`font-extrabold text-2xl mt-5 p-10 m-5 cursor-pointer transition-colors duration-300 ease-in-out 
          ${activeIndex === index ? "text-green-500 border-r-4 border-green-500" : "text-gray-200 border-r-2 border-transparent"}`}
        >
          <span>{link.title}</span>
        </div>
      ))}
    </div>
  );
};

export default SignupSidebar;
