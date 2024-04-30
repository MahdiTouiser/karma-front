import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAPi from "../../../hooks/useApi";
import useConfirm from "../../../hooks/useConfirm";
import { BaseResponse } from "../../../models/shared.models";
import { AdminFlightOfDay } from "../../../models/skyDiveEvents.models";
import SDButton from "../../shared/Button";
import SDSpinner from "../../shared/Spinner";
import AddFlightModal from "./AddFlightModal";
import AdminFlightItem from "./AdminFlightItem";

const AdminFlighList: React.FC<{ dayId: string; date: string }> = ({
  dayId,
  date,
}) => {
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [ConfirmModal, confirmation] = useConfirm(
    "پرواز‌های این روز حذف می‌شوند، آیا مطمئن هستید؟",
    "حذف پروازهای روز",
  );

  const { sendRequest: deleteRequest, isPending: deletePending } = useAPi<
    null,
    BaseResponse<null>
  >();

  const {
    sendRequest,
    isPending,
    data: flightsResponse,
  } = useAPi<null, BaseResponse<AdminFlightOfDay>>();

  const fetchFlights = useCallback(
    (dayId: string) => {
      sendRequest({
        url: `/SkyDiveEvents/EventDayFlights/${dayId}`,
      });
    },
    [sendRequest],
  );

  function startAddFlight() {
    setShowAddModal(true);
  }

  function onCloseAddModal(submitted: boolean) {
    setShowAddModal(false);
    if (submitted) {
      fetchFlights(dayId);
    }
  }

  async function removeFlights() {
    const confirm = await confirmation();
    if (confirm) {
      deleteRequest(
        {
          url: `/SkyDiveEvents/RemoveFlights/${dayId}`,
          method: "delete",
        },
        (response) => {
          toast.success(response.message);
          fetchFlights(dayId);
        },
        (error) => {
          toast.error(error?.message);
        },
      );
    }
  }

  useEffect(() => {
    fetchFlights(dayId);
  }, [dayId, fetchFlights]);
  return (
    <>
      <ConfirmModal />

      <AddFlightModal
        showModal={showAddModal}
        dayId={dayId}
        date={date}
        onCloseModal={onCloseAddModal}
      />

      <div className="min-h-[300px]">
        {(isPending || deletePending) && (
          <div className="mt-8 flex justify-center">
            <SDSpinner color="blue" size={28} />
          </div>
        )}
        {flightsResponse?.content && !isPending && !deletePending && (
          <>
            <div className="flex gap-2 ">
              <SDButton
                color="primary2"
                className="px-8"
                onClick={startAddFlight}
                disabled={flightsResponse.content.flights.length > 0}
              >
                افزودن
              </SDButton>
              <SDButton
                color="failure"
                className="px-8"
                onClick={removeFlights}
                disabled={!flightsResponse.content.flights.length}
              >
                حذف
              </SDButton>
            </div>
            <div className="mt-8">
              {flightsResponse.content.flights.length ? (
                flightsResponse.content.flights.map((item, index) => {
                  return (
                    <AdminFlightItem
                      key={index}
                      dayId={dayId}
                      withHeader={index === 0}
                      fetchFlights={fetchFlights}
                      {...item}
                    />
                  );
                })
              ) : (
                <div className="mr-5 mt-12 text-slate-700">
                  هیچ پروازی ثبت نشده است.
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AdminFlighList;
