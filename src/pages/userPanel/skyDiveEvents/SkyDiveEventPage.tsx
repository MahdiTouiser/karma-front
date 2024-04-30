import { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import SDCard from "../../../components/shared/Card";
import SkyDiveEventList from "../../../components/skyDiveEvents/SkyDiveEventList";
import useAPi from "../../../hooks/useApi";
import { BaseResponse } from "../../../models/shared.models";
import { SkyDiveEventStatus } from "../../../models/skyDiveEvents.models";

export const SkyDiveEventsPage: React.FC = () => {
  const params = useParams();
  const { sendRequest, isPending, data } = useAPi<
    null,
    BaseResponse<SkyDiveEventStatus[]>
  >();
  useEffect(() => {
    sendRequest({
      url: "/SkyDiveEventStatuses",
      params: {
        pageSize: 1000,
        pageIndex: 1,
      },
    });
  }, [sendRequest]);
  return (
    <SDCard className="!px-0">
      <div className="flex justify-center my-14">
        <p className="text-center text-slate-600 font-semibold">
          وارد رویداد شوید و بلیت خود را رزرو کنید.
        </p>
      </div>
      {!isPending && data && (
        <nav className="flex border-b border-gray-200">
          <ul className="flex w-full">
            <li className="flex-grow text-center">
              <NavLink
                className={`${!params.statusId &&
                  "border-b-2 !border-primary2-500 !text-primary2-500"
                  } pb-4 block hover:border-b-2 text-gray-500 hover:text-gray-600 hover:border-gray-300  transition-all ease-linear duration-75`}
                to={"/events/"}
              >
                همه
              </NavLink>
            </li>
            {data.content.map((status, index) => (
              <li key={index} className="flex-grow text-center">
                <NavLink
                  className={(nav) =>
                    `${nav.isActive &&
                    "border-b-2 !border-primary2-500 !text-primary2-500"
                    } pb-4 block hover:border-b-2 text-gray-500 hover:text-gray-600 hover:border-gray-300  transition-all ease-linear duration-75`
                  }
                  to={`/events/${status.id}`}
                >
                  {status.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
      <SkyDiveEventList id={params.statusId || ""} />
    </SDCard>
  );
};

export default SkyDiveEventsPage;
