import { useNavigate } from "react-router-dom";
import {
  CartableMessage,
  CartableRequestTypes,
} from "../../../models/cartable.models";
import KTooltip from "../../shared/Tooltip";

interface CartableItemProps extends CartableMessage {
  onDelete: (id: string) => void;
}

const CartableItem: React.FC<CartableItemProps> = (props) => {
  const [hour, minute] = props.time.split(":");
  const timeString = [hour, minute].join(":");
  const navigate = useNavigate();
  const onClickTitle: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (props.requestType === CartableRequestTypes.USER_INFORMATION_CONFIRM) {
      navigate(`/admin/users/${props.applicantId}/documents`);
    }
  };

  const handleClickDelete: React.MouseEventHandler = () => {
    props.onDelete(props.id);
  };

  return (
    <div className="flex gap-11 items-center border-b py-8 last:border-none">
      <div className="hidden sm:block">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-16 h-w-16"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
          />
        </svg>
      </div>
      <div>
        <div className="flex mb-5 items-center">
          <button className="font-bold text-lg ml-6" onClick={onClickTitle}>
            {props.requestTypeDisplay}
          </button>
          <p className="text-cyan-400 text-sm">
            در
            <span>{props.createdAt}</span>
            <span className="mx-2">{timeString}</span>
          </p>
          <div className="mr-10">
            <KTooltip
              content="حذف"
              trigger="hover"
              placement="bottom"
              className="flex self-end"
            >
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-red-600"
                  onClick={handleClickDelete}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </KTooltip>
          </div>
        </div>
        <div className="flex gap-6 flex-wrap md:gap-12 text-slate-600">
          <p>درخواست کننده: {props.applicantName} </p>
          <p>کد کاربری: {props.applicantCode}</p>
          <p>نوع کاربر: {props.applicantTypeDisplay}</p>
        </div>
      </div>
    </div>
  );
};

export default CartableItem;
