import React from "react";
import { LinkWithIcon } from "../../models/shared.models";
import CircularProgress from "../shared/CircularProgress";

interface InfoSidebarProps {
  links: LinkWithIcon[];
  activeIndex: number;
  progress: number;
  onLinkClick: (index: number) => void;
}

const InfoSidebar: React.FC<InfoSidebarProps> = ({
  links,
  activeIndex,
  progress,
  onLinkClick,
}) => {
  const handleLinkClick = (index: number) => {
    onLinkClick(index);
  };

  return (
    <div>
      <div className="mt-5">
        <CircularProgress progress={progress} />
      </div>
      {links.map((link, index) => (
        <div
          key={index}
          className={`font-extrabold text-xl mt-5 p-5 m-1 cursor-pointer transition-colors duration-300 ease-in-out ${activeIndex === index
            ? "text-cyan-500 border-r-4 border-cyan-500"
            : "text-gray-500 border-r-2 border-transparent hover:text-cyan-500"
            }`}
          onClick={() => handleLinkClick(index)}
        >
          <span>{link.title}</span>
        </div>
      ))}
    </div>
  );
};

export default InfoSidebar;
