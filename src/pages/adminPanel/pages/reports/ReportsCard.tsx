import { Link } from "react-router-dom";
import SDCard from "../../../../components/shared/Card";

interface ReportsCardProps {
  onClick: () => void;
}

const ReportsCard: React.FC<ReportsCardProps> = ({ onClick }) => {
  return (
    <Link to={"/admin/reports/tickets"} onClick={onClick}>
      <SDCard className="flex h-48 items-end justify-center border border-gray-200 !p-0">
        <div className="flex w-full flex-col items-center justify-end">
          <h1 className="rounded-xl p-4 text-xl">گزارش بلیت ها</h1>
        </div>
      </SDCard>
    </Link>
  );
};

export default ReportsCard;
