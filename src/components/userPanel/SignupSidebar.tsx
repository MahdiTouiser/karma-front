import React from "react";
import { LinkWithIcon } from "../../models/shared.models";

interface SignupSidebarProps {
  links: LinkWithIcon[];
  activeIndex: number;
  onLinkClick: (index: number) => void;
}

const SignupSidebar: React.FC<SignupSidebarProps> = ({ links, activeIndex, onLinkClick }) => {
  return (
    <div>
      {links.map((link, index) => (
        <div
          key={index}
          className={`font-extrabold text-2xl p-10 m-5 cursor-pointer transition-colors duration-300 ease-in-out 
          ${activeIndex === index ? "text-green-500 border-r-4 border-green-500" : "text-gray-200 border-r-2 border-transparent hover:border-green-500"}`}
          onClick={() => onLinkClick(index)}
        >
          <span>{link.title}</span>
        </div>
      ))}
    </div>
  );
};

export default SignupSidebar;
