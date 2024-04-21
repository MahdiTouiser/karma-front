import { useState } from "react";
import {
  AdminFlightModel,
  AdminTicketModel,
  flightNameData,
  flightStatusData,
} from "../../../models/skyDiveEvents.models";
import useAPi from "../../../hooks/useApi";
import { BaseResponse, FlightStatuses } from "../../../models/shared.models";
import AdminFlightTicketsGrid from "./AdminFlightTicketsGrid";
import SDSpinner from "../../shared/Spinner";
import useConfirm from "../../../hooks/useConfirm";
import { toast } from "react-toastify";
import SDSelect from "../../shared/Select";
import SDTextInput from "../../shared/TextInput";

interface AdminFlightItemProps extends AdminFlightModel {
  withHeader?: boolean;
  dayId: string;
  fetchFlights: (dayId: string) => void;
}

const AdminFlightItem: React.FC<AdminFlightItemProps> = ({
  withHeader = false,
  fetchFlights,
  dayId,
  ...flight
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [tickets, setTickets] = useState<AdminTicketModel[]>();

  const { sendRequest: getTicketRequest, isPending: ticketsPending } = useAPi<
    null,
    BaseResponse<AdminTicketModel[]>
  >();
  const { sendRequest: deleteRequest } = useAPi<null, BaseResponse<null>>();

  const { sendRequest: statusChangeRequest } = useAPi<
    flightStatusData,
    BaseResponse<string>
  >();

  const { sendRequest: nameChangeRequest } = useAPi<
    flightNameData,
    BaseResponse<string>
  >();

  const [ConfirmModal, confirmation] = useConfirm(
    " این پرواز حذف خواهد شد. آیا مطمئن هستید؟ ",
    "حذف کردن پرواز",
  );

  function fetchTickets(flightId: string) {
    getTicketRequest(
      {
        url: `/SkyDiveEvents/Tickets/${flightId}`,
        params: {
          pageIndex: 1,
          pageSize: 1000,
        },
      },
      (response) => {
        setTickets(response.content);
      },
    );
  }

  async function OnStatusChange(flightId: string, itemValue: string) {
    statusChangeRequest(
      {
        url: `/SkyDiveEvents/SetFlightStatus/${flightId}`,
        method: "put",
        data: {
          status: itemValue,
        },
      },
      (response) => {
        toast.success(response.message);
      },
      (error) => {
        toast.error(error?.message);
      },
    );
  }

  async function onRemoveTicket(ticketId: string) {
    const confirm = await confirmation();
    if (confirm) {
      deleteRequest(
        {
          method: "delete",
          url: `/SkyDiveEvents/RemoveFlight/${ticketId}`,
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

  function activate() {
    setIsActive(true);
    if (!tickets) {
      fetchTickets(flight.id);
    }
  }

  function deactivate() {
    setIsActive(false);
  }

  async function handleBlur(flightId: string, itemValue: string) {
    nameChangeRequest(
      {
        url: `/SkyDiveEvents/SetFlightName/${flightId}`,
        method: "put",
        data: {
          name: itemValue,
        },
      },
      (response) => {
        toast.success(response.message);
      },
      (error) => {
        toast.error(error?.message);
      },
    );
  }

  const activateButton = (
    <button
      onClick={activate}
      className=" flex w-10 items-center justify-end  transition-all duration-75 ease-linear group-hover:bg-gray-100"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5L8.25 12l7.5-7.5"
        />
      </svg>
    </button>
  );

  const deActivateButton = (
    <button
      onClick={deactivate}
      className="flex w-10 items-center justify-end !bg-gray-200  transition-all duration-75 ease-linear group-hover:bg-gray-100"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
        />
      </svg>
    </button>
  );

  const handleDelete = (id: string) => {
    onRemoveTicket(id);
  };

  return (
    <>
      <ConfirmModal />

      <div className="mb-2 ">
        <div className="text-slate-700">
          {withHeader && (
            <div className="flex font-semibold">
              <div className="w-10 min-w-[1.5rem]"></div>
              <p className="w-60 px-5 py-3">شماره پرواز</p>
              <p className="w-60 px-5 py-3">نام پرواز</p>
              <p className="w-60 px-5 py-3">ظرفیت</p>
              <p className="w-40 px-5 py-3">غیر قابل رزرو</p>
              <p className="w-40 px-5 py-3">تعیین وضعیت</p>
              <p className="w-40 px-5 py-3">عملیات</p>
            </div>
          )}
          <div className={`group flex cursor-pointer `}>
            {isActive ? deActivateButton : activateButton}
            <p
              className={`${
                isActive && "!bg-gray-200"
              } w-40 px-5 py-3  transition-all duration-75 ease-linear group-hover:bg-gray-100`}
            >
              {flight.flightNumber}
            </p>
            <p
              className={`${
                isActive && "!bg-gray-200"
              } w-80 px-8 py-3  transition-all duration-75 ease-linear group-hover:bg-gray-100`}
            >
              <SDTextInput
                onBlur={(event) => handleBlur(flight.id, event.target.value)}
                id="name"
                defaultValue={flight.name || ""}
                // value={flight.name}
                // invalid={!!formErrors.name}
                // {...register("flightName", {
                //   required: "فیلد اجباری است.",
                //   valueAsNumber: true,
                //   validate: (value) => {
                //     return value >= 0 || "مقدار نمی‌تواند منفی باشد.";
                //   },
                // })}
              />
            </p>
            <p
              className={`${
                isActive && "!bg-gray-200"
              } w-60 px-5 py-3  transition-all duration-75 ease-linear group-hover:bg-gray-100`}
            >
              {flight.capacity}
            </p>
            <p
              className={`${
                isActive && "!bg-gray-200"
              } w-40 px-5 py-3  transition-all duration-75 ease-linear group-hover:bg-gray-100`}
            >
              {flight.voidableQty}
            </p>
            <p
              className={`${
                isActive && "!bg-gray-200"
              } w-40 px-3 py-3  transition-all duration-75 ease-linear group-hover:bg-gray-100`}
            >
              <div className="flex flex-col">
                <SDSelect
                  id="eventStatus"
                  // invalid={!!formErrors.statusId}
                  // {...register("statusId", {
                  //   required: "فیلد اجباری است.",
                  // })}
                  onChange={(event) =>
                    OnStatusChange(flight.id, event.target.value)
                  }
                >
                  {Object.entries(FlightStatuses).map(([title, value]) => (
                    <option
                      key={value}
                      value={value}
                      selected={flight.status === value}
                    >
                      {title}
                    </option>
                  ))}
                </SDSelect>
              </div>
            </p>

            <p
              className={`${
                isActive && "!bg-gray-200"
              } w-40 px-5 py-3  transition-all duration-75 ease-linear group-hover:bg-gray-100`}
            >
              <button onClick={() => handleDelete(flight.id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6 text-red-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </p>
          </div>
        </div>
        {isActive && (
          <div>
            {ticketsPending && (
              <div className="mr-28  mt-8 flex">
                <SDSpinner color="blue" size={28} />
              </div>
            )}
            {tickets && !ticketsPending && (
              <div className="p-5">
                <AdminFlightTicketsGrid
                  tickets={tickets}
                  onChange={() => fetchTickets(flight.id)}
                />
              </div>
            )}
          </div>
        )}
        {ticketsPending && (
          <div className="mr-28  mt-8 flex">
            <SDSpinner color="blue" size={28} />
          </div>
        )}
      </div>
    </>
  );
};

export default AdminFlightItem;
