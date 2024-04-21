import { Link } from "react-router-dom";
import SDCard from "../shared/Card";
import { SkyDiveEvent } from "../../models/skyDiveEvents.models";

const SkyDiveEventCard: React.FC<SkyDiveEvent> = (props) => {
  return (
    <Link
      to={`/events/${props.id}/days`}
      className={!props.reservable ? "pointer-events-none" : ""}
    >
      <SDCard className="border border-gray-200 !p-0">
        <div className="relative aspect-[2] w-full">
          <img
            src={`${import.meta.env.VITE_BASE_API_URL}/file/${props.image}`}
            alt={props.title}
            className="h-full w-full rounded-t-lg object-cover"
          />
          <span className="absolute bottom-2 left-2 rounded-xl bg-primary-100 px-3 py-0.5 text-sm shadow">
            {props.statusTitle}
          </span>
        </div>
        <div className={`${!props.reservable ? "opacity-70" : ""} px-4 py-4`}>
          <p className="text-lg font-bold">{props.title}</p>
          <div className="mt-2 flex flex-wrap justify-between text-slate-600">
            <p className="my-1">{props.duration}</p>
            <p className="my-1">{props.capacity} ظرفیت خالی</p>
          </div>
        </div>
      </SDCard>
    </Link>
  );
};

export default SkyDiveEventCard;
