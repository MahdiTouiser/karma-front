import { ComponentType, ReactNode, useState } from "react";

interface PanelShellProps {
  header: ComponentType<ShellElement>;
  sidebar: ComponentType<ShellElement>;
  children: ReactNode;
  mainContinerClassName?: string
  sidBarContainerClassName?: string;
}
export interface ShellElement {
  isMenuOpen: boolean;
  toggleMenu(): void;
}
const PanelShell: React.FC<PanelShellProps> = (props) => {
  const [isMenuOpen, setISMenuOpen] = useState<boolean>(window.innerWidth > 640 ? true : false );
  function toggleMenu() {
    setISMenuOpen((open) => !open);
  }
  return (
    <div className="w-screen h-screen flex flex-col  ">
      <header className="w-full">
        <props.header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      </header>
      <div className="w-full flex flex-1 relative overflow-hidden">
        <aside
          className={`${
            isMenuOpen ? "w-[240px]" : "w-0"
          } ${props.sidBarContainerClassName || ''} h-full absolute flex-shrink-0 top-0 right-0 sm:static overflow-auto transition-all ease-linear duration-200 shadow-sideBar z-10`}
        >
          <props.sidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        </aside>
        <main className={`${props.mainContinerClassName || ''} flex-auto  overflow-auto`}>{props.children}</main>
      </div>
    </div>
  );
};

export default PanelShell;
