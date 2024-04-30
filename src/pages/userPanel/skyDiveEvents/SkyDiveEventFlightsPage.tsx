import { useCallback, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Basket from "../../../components/shared/Basket/Basket";
import BookButton from "../../../components/shared/Basket/‌BookButton";
import SDCard from "../../../components/shared/Card";
import FlightList from "../../../components/skyDiveEvents/FlightList";
import useAPi from "../../../hooks/useApi";
import { useUserContainerDom } from "../../../hooks/userContainerDom";
import { BaseResponse } from "../../../models/shared.models";
import { SkyDiveEventDay } from "../../../models/skyDiveEvents.models";
import { sortDate } from "../../../utils/shared";

const SkyDiveEventFlightsPage: React.FC = () => {
  const params = useParams();
  const location = useLocation();
  const [currentDayId, setCurrentDayId] = useState<string>("");
  const { sendRequest: requestDays } = useAPi<
    null,
    BaseResponse<SkyDiveEventDay[]>
  >();

  const [days, setDays] = useState<SkyDiveEventDay[]>([]);
  const [eventTitle, setEventTitle] = useState<string>("");
  const container = useUserContainerDom();
  const [atTheEnd, setAddTheEnd] = useState<boolean>(false);

  useEffect(() => {
    function getDays(eventId: string, currentDayId: string | null) {
      requestDays(
        {
          url: `/SkyDiveEvents/EventDays/${eventId}`,
        },
        (response) => {
          const sortedDays = sortDate<SkyDiveEventDay>(
            response.content,
            "date"
          );
          setEventTitle(response.message);
          setDays(sortedDays);
          setCurrentDayId(currentDayId || sortedDays[0].id);
        }
      );
    }
    if (params.eventId) {
      getDays(params.eventId, location.state?.dayId || null);
    }
  }, [params, requestDays, location]);

  const handleScroll = useCallback(
    (event: Event) => {
      const container = event.target as HTMLDivElement;
      const { scrollTop, clientHeight, scrollHeight } = container;
      const threshold = 20; // Adjust this value according to your needs

      const isNearBottom = scrollTop + clientHeight >= scrollHeight - threshold;
      if (isNearBottom && !atTheEnd) {
        setAddTheEnd(true);
      }
      if (scrollTop === 0) {
        setAddTheEnd(false);
      }
    },
    [atTheEnd]
  );

  useEffect(() => {
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }
  }, [handleScroll, container]);

  useEffect(() => {
    if (container && currentDayId) {
      container.scrollTop = 0;
    }
  }, [currentDayId, container]);

  useEffect(() => {
    function setNextDay() {
      setCurrentDayId((prevId) => {
        const currentIndex = days.findIndex((item) => {
          return item.id === prevId;
        });
        if (currentIndex === days.length - 1) return prevId;
        const nextDay = days[currentIndex + 1];
        return nextDay.id;
      });
    }

    if (atTheEnd) {
      setNextDay();
    }
  }, [atTheEnd, days, handleScroll]);

  function changeCurrentDay(dayId: string) {
    setCurrentDayId(dayId);
  }

  return (
    <div className="flex relative mt-1 px-5 pb-[30px]">
      <SDCard className="px-0 pt-0 w-full lg:w-[65vw] border border-gray-200 relative">
        <header className="flex flex-col items-center sticky top-0 bg-white pt-5 rounded-t-lg">
          <h2 className="text-center font-bold text-lg">{eventTitle}</h2>
          <nav className="mt-8 flex border-b-2  border-gray-200 w-full">
            <ul className="flex w-full overflow-auto horizental-scrol">
              {days &&
                days.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className="flex-grow text-center min-w-[100px]"
                    >
                      <a
                        className={`${currentDayId === item.id &&
                          "border-b-2 !border-primary2-500 !text-primary2-500"
                          } cursor-pointer pb-4 block hover:border-b-2 text-gray-500 hover:text-gray-600 hover:border-gray-300  transition-all ease-linear duration-75`}
                        onClick={() => changeCurrentDay(item.id)}
                      >
                        {item.date}
                      </a>
                    </li>
                  );
                })}
            </ul>
          </nav>
        </header>
        <div className="px-8 pt-8">
          <FlightList dayId={currentDayId} />
        </div>
        <div className="px-5 fixed w-full right-0 -bottom-1 flex justify-center top-shadow py-5 bg-white lg:hidden lg:shadow-none">
          <BookButton />
        </div>
      </SDCard>
      <aside className="hidden lg:block  relative">
        <div
          className={` top-[64px] px-3   w-[33vw] sticky  left-0 transition-all ease-linear`}
        >
          <Basket />
        </div>
      </aside>
    </div>
  );
};

export default SkyDiveEventFlightsPage;
