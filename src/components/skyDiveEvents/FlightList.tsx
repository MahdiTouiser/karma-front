import { useEffect } from "react";
import useAPi from "../../hooks/useApi";
import { BaseResponse } from "../../models/shared.models";
import { FlightOfDayInfo } from "../../models/skyDiveEvents.models";
import FlightItem from "./FlightItem";
import SDSpinner from "../shared/Spinner";

const FlightList: React.FC<{ dayId: string }> = ({ dayId }) => {
  const { sendRequest, isPending, data } = useAPi<
    null,
    BaseResponse<FlightOfDayInfo>
  >();

  useEffect(() => {
    if (dayId) {
      sendRequest({
        url: `/SkyDiveEvents/EventDayTickets/${dayId}`,
        params: {
          pageIndex: 1,
          pageSize: 100000,
        },
      });
    }
  }, [dayId, sendRequest]);

  if (isPending) {
    return (
      <div className="flex justify-center py-24">
        <SDSpinner size={28} />
      </div>
    );
  }

  return (
    <>
      <p className="text-green-500 font-semibold mb-6 text-lg">
        بلیت‌های موجود {data?.content.dateDisplay} : {data?.content.qty}
      </p>
      {data?.content.flights.map((flight, index) => (
        <FlightItem key={index} {...flight} />
      ))}
    </>
  );
};

export default FlightList;
