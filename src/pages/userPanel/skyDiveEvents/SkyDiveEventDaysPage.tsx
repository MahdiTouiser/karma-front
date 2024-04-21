import { Link, useParams } from "react-router-dom";
import SDCard from "../../../components/shared/Card";
import SkyDiveEventDayItem from "../../../components/skyDiveEvents/SkyDiveEventDayItem";
import { useEffect } from "react";
import useAPi from "../../../hooks/useApi";
import { BaseResponse } from "../../../models/shared.models";
import {
  SkyDiveEvent,
  SkyDiveEventDay,
} from "../../../models/skyDiveEvents.models";
import SDSpinner from "../../../components/shared/Spinner";
import { useState } from "react";
import { sortDate } from "../../../utils/shared";

const SkyDiveEventDaysPage: React.FC = () => {
  const params = useParams();
  const {
    sendRequest: requestDetail,
    data: event,
    isPending: detailPending,
  } = useAPi<null, BaseResponse<SkyDiveEvent>>();
  const { sendRequest: requestDays, isPending: daysPending } = useAPi<
    null,
    BaseResponse<SkyDiveEventDay[]>
  >();

  const [days, setDays] = useState<SkyDiveEventDay[]>();

  useEffect(() => {
    function getEvnetDetail(eventId: string) {
      requestDetail({
        url: `/SkyDiveEvents/${eventId}`,
      });
    }

    function getDays(eventId: string) {
      requestDays(
        {
          url: `/SkyDiveEvents/EventDays/${eventId}`,
        },
        (response) => {
          setDays(sortDate<SkyDiveEventDay>(response.content, "date"));
        }
      );
    }

    const id = params.eventId;
    if (id) {
      getEvnetDetail(id);
      getDays(id);
    }
  }, [params, requestDays, requestDetail]);

  const mainBody = (
    <>
      <header className="flex flex-col items-center gap-3 mb-5">
        <h2 className="text-center font-bold text-lg">
          {event?.content.title}
        </h2>
        <div className="flex justify-between text-slate-600 gap-8">
          <p>{event?.content.duration}</p>
          <p>{event?.content.capacity} ظرفیت خالی</p>
        </div>
        <Link
          target="_blank"
          to={`/events/${event?.content.id}/terms`}
          className="text-blue-700 font-semibold"
        >
          قوانین و شرایط
        </Link>
      </header>
      <main className="w-full flex flex-wrap">
        {days &&
          days.map((item, index) => {
            return (
              <div key={index} className=" my-3 px-3 w-full md:w-1/2">
                <SkyDiveEventDayItem {...item} />
              </div>
            );
          })}
      </main>
    </>
  );

  return (
    <SDCard>
      {detailPending || daysPending ? (
        <div className="flex justify-center py-24">
          <SDSpinner size={28} />
        </div>
      ) : (
        mainBody
      )}
    </SDCard>
  );
};
export default SkyDiveEventDaysPage;
