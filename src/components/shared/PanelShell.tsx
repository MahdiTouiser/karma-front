import { ComponentType, ReactNode, useState } from "react";

interface PanelShellProps {
  header: ComponentType<ShellElement>;
  children: ReactNode;
  mainContainerClassName?: string
  sideBarContainerClassName?: string;
}
export interface ShellElement {
  isMenuOpen: boolean;
  toggleMenu(): void;
}
const PanelShell: React.FC<PanelShellProps> = (props) => {
  const [isMenuOpen, setISMenuOpen] = useState<boolean>(window.innerWidth > 640 ? true : false);
  function toggleMenu() {
    setISMenuOpen((open) => !open);
  }
  return (
    <div className="w-screen h-screen flex flex-col">
      <header className="w-full">
        <props.header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      </header>
      <div className="w-full flex flex-1 relative overflow-hidden">
        <main className={`${props.mainContainerClassName || ''} flex-auto  overflow-auto`}>{props.children}</main>
      </div>
    </div>
  );
};

export default PanelShell;
