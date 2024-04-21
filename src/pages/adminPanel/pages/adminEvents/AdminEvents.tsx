import React, { useEffect, useState, useCallback, useRef } from "react";
import Grid from "../../../../components/shared/Grid/Grid";
import SDButton from "../../../../components/shared/Button";
import useAPi from "../../../../hooks/useApi";
import {
  NewEvent,
  SkyDiveEventStatus,
  SkyDiveEvent,
} from "../../../../models/skyDiveEvents.models";
import { BaseResponse } from "../../../../models/shared.models";
import AdminEventModal from "../../../../components/adminPanel/adminEvent/AdminEventModal";
import {
  ColDef,
  GridGetData,
  GridRef,
} from "../../../../components/shared/Grid/grid.types";
import StatusIndicator from "../../../../components/shared/StatusIndicator";
import { BiToggleLeft } from "react-icons/bi";
import { BsAirplaneEngines } from "react-icons/bs";
import useConfirm from "../../../../hooks/useConfirm";
import { toast } from "react-toastify";
import CostModal from "../../../../components/adminPanel/adminEvent/CostModal";
import { useNavigate } from "react-router-dom";
import TermsAndConditionsModal from "../../../../components/adminPanel/adminEvent/TermsAndConditionsModal";
import SDSelect from "../../../../components/shared/Select";
import DateRangeFilter from "../../../../components/shared/DateRangeFilter";

const AdminEvents: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndtDate] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<SkyDiveEvent>();
  const [costTargetEvent, setCostTargetEvent] = useState<SkyDiveEvent>();
  const [termsTartgetEvent, setTermsTargetEvent] = useState<SkyDiveEvent>();
  const gridRef = useRef<GridRef>(null);
  const navigate = useNavigate();

  const { sendRequest, errors } = useAPi<
    NewEvent,
    BaseResponse<SkyDiveEvent[]>
  >();

  const { sendRequest: sendDeleteRequest } = useAPi<
    null,
    BaseResponse<string>
  >();

  const { sendRequest: eventStatusSendRequest, data: eventStatusData } = useAPi<
    null,
    BaseResponse<SkyDiveEventStatus[]>
  >();
  const { sendRequest: lastCodeSendRequest, data: lastCode } = useAPi<
    null,
    BaseResponse<string>
  >();

  const { sendRequest: publishRequest } = useAPi<null, BaseResponse<null>>();

  const [DeleteConfirmModal, deleteConfirmation] = useConfirm(
    " رویداد شما حذف خواهد شد. آیا مطمئن هستید؟ ",
    "حذف کردن رویداد",
  );

  const [PublishConfirmModal, publishConfirmation] = useConfirm(
    "رویداد فعال شده و برای کاربران نمایش داده خواهد شد، آیا مطمئن هستید؟",
    "فعال کردن رویداد",
  );

  const handleCloseEntryModal = (submitted: boolean) => {
    if (submitted) {
      gridRef.current?.refresh();
    }
    setEditingEvent(undefined);
    setCostTargetEvent(undefined);
    setShowModal(false);
  };

  const handleCloseTermsModal = (submitted: boolean) => {
    if (submitted) {
      gridRef.current?.refresh();
    }
    setTermsTargetEvent(undefined);
  };

  const onCreate = () => {
    setShowModal(true);
  };

  const onEdit = (item: SkyDiveEvent) => {
    setEditingEvent(item);
    setShowModal(true);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };
  const [colDefs] = useState<ColDef<SkyDiveEvent>[]>([
    {
      field: "code",
      headerName: "کد",
    },
    {
      field: "title",
      headerName: "عنوان",
    },

    {
      field: "startDate",
      headerName: "تاریخ شروع",
    },

    {
      field: "endDate",
      headerName: "تاریخ پایان",
    },
    {
      field: "location",
      headerName: "محل رویداد",
    },
    {
      field: "statusTitle",
      headerName: "وضعیت",
    },
    {
      field: "voidableString",
      headerName: "قابل لغو",
    },
    {
      field: "",
      headerName: "قوانین و شرایط",
      onClick: (item: SkyDiveEvent) => {
        setTermsTargetEvent(item);
      },
      template: "ویرایش",
    },
    {
      field: "",
      headerName: "بهای فروش",
      onClick: (item) => {
        setCostTargetEvent(item);
      },
      template: "ویرایش",
    },
    {
      field: "",
      headerName: "",
      cellRenderer: (item) => (
        <StatusIndicator isActive={item.isActive}></StatusIndicator>
      ),
    },
  ]);

  const fetchEvents = useCallback<GridGetData<SkyDiveEvent>>(
    (gridParams, setRows, fail) => {
      sendRequest(
        {
          url: "/SkyDiveEvents",
          params: {
            pagesize: gridParams.pageSize,
            pageindex: gridParams.pageIndex,
            Statusid: selectedValue,
            start: startDate,
            end: endDate,
          },
        },
        (response) => {
          const processedData =
            response.content.map((item) => {
              const voidableString = item.voidable ? "هست" : "نیست";
              return { ...item, voidableString };
            }) || [];
          setRows(processedData, response.total);
        },
        (error) => fail(error),
      );
    },
    [sendRequest, selectedValue, startDate, endDate],
  );

  const onRemove = async (item: SkyDiveEvent) => {
    const confirm = await deleteConfirmation();
    if (confirm) {
      sendDeleteRequest(
        {
          url: `/SkyDiveEvents/${item.id}`,
          method: "delete",
        },
        (response) => {
          toast.success(response.message);
          gridRef.current?.refresh();
        },
        (error) => {
          toast.error(error?.message);
        },
      );
    }
  };

  const onPublishEvent = async (item: SkyDiveEvent) => {
    const confirm = await publishConfirmation();
    if (confirm) {
      publishRequest(
        {
          url: `/SkyDiveEvents/PublishEvent/${item.id}`,
          method: "put",
        },
        (response) => {
          toast.success(response.message);
          gridRef.current?.refresh();
        },
        (error) => {
          toast.error(error?.message);
        },
      );
    }
  };

  useEffect(() => {
    const fetchEventStatuses = () => {
      try {
        eventStatusSendRequest({
          url: "/SkyDiveEventStatuses",
        });
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchEventStatuses();
  }, [eventStatusSendRequest]);

  useEffect(() => {
    const fetchLastCode = () => {
      try {
        lastCodeSendRequest({
          url: "/SkyDiveEvents/GetLastCode",
        });
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchLastCode();
  }, [lastCodeSendRequest]);

  if (errors) {
    return <div>Error: {errors.message}</div>;
  }

  return (
    <>
      <DeleteConfirmModal />
      <PublishConfirmModal />
      <AdminEventModal
        eventStatusData={eventStatusData?.content}
        lastCode={lastCode?.content || ""}
        showModal={showModal}
        onCloseModal={handleCloseEntryModal}
        eventData={editingEvent}
      />
      {costTargetEvent && (
        <CostModal
          onCloseModal={() => setCostTargetEvent(undefined)}
          rowId={costTargetEvent.id}
        />
      )}
      {termsTartgetEvent && (
        <TermsAndConditionsModal
          skyDiveEvent={termsTartgetEvent}
          onCloseModal={handleCloseTermsModal}
        />
      )}

      <div className="mt-12  flex flex-wrap">
        <div className=" mb-4 basis-full xl:mb-0 xl:basis-1/12">
          <SDButton color="success" onClick={onCreate}>
            + جدید
          </SDButton>
        </div>
        <div className="flex flex-wrap justify-between gap-4 xl:basis-11/12">
          <div className="flex flex-wrap">
            <div className="ml-8 flex items-center justify-center pb-2">
              <label htmlFor="status" className="pl-1 text-sm">
                وضعیت:
              </label>

              <div className="mr-1 w-40">
                <SDSelect
                  id="status"
                  onChange={handleSelectChange}
                  value={selectedValue}
                >
                  <option value="">همه</option>
                  {eventStatusData?.content.map((status, index) => (
                    <option
                      key={index}
                      value={status.id}
                      className="text-right"
                    >
                      {status.title}
                    </option>
                  ))}
                </SDSelect>
              </div>
            </div>
          </div>
          <DateRangeFilter
            label="تاریخ"
            fromDate={startDate}
            toDate={endDate}
            onChangeFromDate={setStartDate}
            onChangeToDate={setEndtDate}
          />
        </div>
      </div>
      <div className="mt-3">
        <Grid<SkyDiveEvent>
          getData={fetchEvents}
          colDefs={colDefs}
          onEditRow={onEdit}
          ref={gridRef}
          onRemoveRow={onRemove}
          rowActions={{
            edit: true,
            remove: true,
            otherActions: [
              {
                icon: <BiToggleLeft size="1.5rem" color="#e02424" />,
                descriptions: "فعال کردن",
                showField: "!isActive",
                // disableField: '!isActive',
                onClick: onPublishEvent,
              },
            ],
            moreActions: [
              {
                icon: <BsAirplaneEngines size="1.5rem" />,
                descriptions: "پروازها",
                onClick: (item) => {
                  navigate(`${item.id}/flights`);
                },
              },
            ],
          }}
        />
      </div>
    </>
  );
};

export default AdminEvents;
