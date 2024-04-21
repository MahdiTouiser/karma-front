import { Link, useParams } from "react-router-dom";
import { SkyDiveEventDay } from "../../models/skyDiveEvents.models";

const SkyDiveEventDayItem: React.FC<SkyDiveEventDay> = (props) => {
  const params = useParams();
  return (
    <Link to={`../${params.eventId}/flights`} state={{dayId: props.id}}>
      <div className="flex flex-wrap justify-between items-center border-gray-300 shadow-sm border rounded-lg w-full  py-3 px-6 ">
        <p className="w-full text-center my-3 xs:w-auto font-semibold">
          {props.date}
        </p>
        <p className="w-full text-center my-3 xs:w-auto text-slate-600">
          {props.flightQty} پرواز
        </p>
        <p className="w-full text-center my-3 xs:w-auto text-slate-600">
          {props.emptyCapacity} ظرفیت خالی
        </p>
        <p className="w-full text-center my-3 xs:w-auto text-green-500">
          بلیت‌های شما : {props.userTicketQty}
        </p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="hidden w-full xs:w-auto xs:block  h-6 stroke-gray-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className=" w-full xs:w-auto xs:hidden  h-6 stroke-gray-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </div>
    </Link>
  );
};

export default SkyDiveEventDayItem;
