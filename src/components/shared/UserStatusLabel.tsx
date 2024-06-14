import { UserStatuses } from "../../models/shared.models";

interface UserStatusLabelProps {
  status: (typeof UserStatuses)[keyof typeof UserStatuses];
  display: string;
}
const UserStatusLabel: React.FC<UserStatusLabelProps> = (props) => {
  const statusColorMap = new Map([
    [UserStatuses.PENDING, "text-orange-500"],
    [UserStatuses.AWAITING_COMPLETION, "text-orange-500"],
    [UserStatuses.ACTIVE, "text-cyan-500"],
    [UserStatuses.INACTIVE, "text-red-600"],
  ]);
  return (
    <p className={`${statusColorMap.get(props.status)} font-semibold`}>
      {props.display}
    </p>
  );
};

export default UserStatusLabel;
