import React from 'react';

import { LinkWithIcon } from '../../models/shared.models';
import CircularProgress from '../shared/CircularProgress';

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
    <div className="p-4 bg-white rounded-lg">
      <div className="mb-5">
        <CircularProgress progress={progress} />
      </div>
      {links.map((link, index) => (
        <div
          key={index}
          className={`flex items-center justify-center 
            font-bold ${activeIndex === index
              ? "text-cyan-500 border-cyan-500 border-b-4 md:border-b-0 md:border-r-4 rounded"
              : "text-gray-600 border-b-0 border-transparent"} 
            transition-colors duration-300 ease-in-out mt-3 p-3 m-1 cursor-pointer text-lg md:text-xl hover:text-cyan-500 hover:bg-gray-100 rounded`}
          onClick={() => handleLinkClick(index)}
        >
          <span className="sm:text-center md:text-right">{link.title}</span>
        </div>
      ))}
    </div>
  );
};

export default InfoSidebar;