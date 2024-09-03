import { jsx as _jsx } from "react/jsx-runtime";
import { UserStatuses } from "../../models/shared.models";
const UserStatusLabel = (props) => {
    const statusColorMap = new Map([
        [UserStatuses.PENDING, "text-orange-500"],
        [UserStatuses.AWAITING_COMPLETION, "text-orange-500"],
        [UserStatuses.ACTIVE, "text-cyan-500"],
        [UserStatuses.INACTIVE, "text-red-600"],
    ]);
    return (_jsx("p", { className: `${statusColorMap.get(props.status)} font-semibold`, children: props.display }));
};
export default UserStatusLabel;
