import React, { useState } from "react";
import { LinkWithIcon } from "../../models/shared.models";

const SignupSidebar: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const links: LinkWithIcon[] = [
    { title: "اطلاعات اولیه" },
    { title: "سوابق تحصیلی" },
    { title: "سوابق شغلی" },
    { title: "مهارت های تکمیلی" },
  ];

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="border-l-2">
      {links.map((link, index) => (
        <div
          key={index}
          className={`font-extrabold text-2xl p-10 m-5 cursor-pointer transition-colors duration-300 ease-in-out 
          ${activeIndex === index ? "text-green-500 border-r-4 border-green-500" : "text-gray-200 border-r-2 border-transparent hover:border-green-500"}`}
          onClick={() => handleClick(index)}
        >
          <span>{link.title}</span>
        </div>
      ))}
    </div>
  );
};

export default SignupSidebar;
