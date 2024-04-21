import { useParams } from "react-router-dom";
import useAPi from "../../../hooks/useApi";
import { SkyDiveEvent } from "../../../models/skyDiveEvents.models";
import { useEffect } from "react";
import SDCard from "../../../components/shared/Card";
import SDSpinner from "../../../components/shared/Spinner";
import { BaseResponse } from "../../../models/shared.models";
import SkydiveEventField from "../../../components/shared/SkydiveEventField";

const SkyDiveEventTermsPage: React.FC = () => {
  const params = useParams();
  const {
    sendRequest,
    isPending,
    data: eventRepsonse,
  } = useAPi<null, BaseResponse<SkyDiveEvent>>();
  useEffect(() => {
    function fetchEventDetail(eventId: string) {
      sendRequest({
        url: `/SkyDiveEvents/${eventId}`,
      });
    }
    if (params.eventId) {
      fetchEventDetail(params.eventId);
    }
  }, [params.eventId, sendRequest]);
  return (
    <SDCard>
      {isPending && (
        <div className="flex justify-center mt-8">
          <SDSpinner size={28} />
        </div>
      )}
      {eventRepsonse?.content && !isPending && (
        <div className="pt-5 px-4">
          <h1 className="text-center font-bold text-lg">
            قوانین و شرایط رویداد
          </h1>
          <div className="flex justify-between px-12 my-7 flex-wrap gap-6">
            <SkydiveEventField
              title="نام"
              value={eventRepsonse.content.title}
            />
            <SkydiveEventField
              title="شروع"
              value={eventRepsonse.content.startDate}
            />
            <SkydiveEventField
              title="پایان"
              value={eventRepsonse.content.endDate}
            />
            <SkydiveEventField
              title="محل رویداد"
              value={eventRepsonse.content.location}
            />
          </div>
          <div
            className="pt-8 sm:px-8 md:px-12 lg:px-24"
            dangerouslySetInnerHTML={{
              __html: eventRepsonse.content.termsAndConditions,
            }}
          ></div>
        </div>
      )}
    </SDCard>
  );
};

export default SkyDiveEventTermsPage;
