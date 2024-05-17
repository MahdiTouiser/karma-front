import KCard from "../../shared/Card";

interface SettingsSectionCardProps {
  title: string;
  children: React.ReactNode;
}

const SettingsSectionCard: React.FC<SettingsSectionCardProps> = ({
  title,
  children,
}) => {
  return (
    <KCard className="pt-0 px-0 pb-2 border border-blue-100">
      <div className="  p-4 bg-blue-900 text-white rounded-t-lg">
        <h6 className="font-bold text-lg ">{title}</h6>
      </div>
      <div className="py-8 px-6">{children}</div>
    </KCard>
  );
};

export default SettingsSectionCard