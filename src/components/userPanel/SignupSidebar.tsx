import React from "react";
import { LinkWithIcon } from "../../models/shared.models";
import { ShellElement } from "../shared/PanelShell";

const SignupSidebar: React.FC<ShellElement> = () => {
  const links: LinkWithIcon[] = [
    {
      title: "اطلاعات اولیه",
    },
    {
      title: "سوابق تحصیلی",
    },
    {
      title: "سوابق شغلی",
    },
    {
      title: "مهارت های تکمیلی",
    },
  ];

  return (
    <div className="bg-green-500">
      {links.map((link, index) => (
        <div
          key={index}
          className="font-extrabold bg-gray-100 text-green-500 text-2xl border-r-2 border-green-500 py-10 px-20"
        >
          <span>{link.title}</span>
        </div>
      ))}
    </div>
  );
};

export default SignupSidebar;
