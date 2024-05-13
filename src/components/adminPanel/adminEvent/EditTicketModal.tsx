import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAPi from "../../../hooks/useApi";
import { BaseResponse } from "../../../models/shared.models";
import {
  AdminTicketModel,
  EditTicketRequest,
  SkyDiveEventTicketType,
} from "../../../models/skyDiveEvents.models";
import SDButton from "../../shared/Button";
import SDLabel from "../../shared/Label";
import SDModal from "../../shared/Modal/Modal";
import RadioButton from "../../shared/RadioButton";
import SDSelect from "../../shared/Select";
import SDSpinner from "../../shared/Spinner";

interface EditTicketModal {
  onCloseModal: (submitted: boolean) => void;
  ticket: AdminTicketModel;
}

const EditTicketModal: React.FC<EditTicketModal> = ({
  onCloseModal,
  ticket,
}) => {
  const {
    register,
    formState: { errors: formErrors },
    handleSubmit,
    reset,
  } = useForm<EditTicketRequest>({
    mode: "onTouched",
  });

  const [selectedReservableOption, setSelectedReservableOption] =
    useState(false);

  const { sendRequest: getTicketTypesRequest, data: tickeTypeResponse } =
    useAPi<null, BaseResponse<SkyDiveEventTicketType[]>>();

  const { sendRequest: sendEditRequest, isPending: editPending } = useAPi<
    EditTicketRequest,
    BaseResponse<null>
  >();

  const reservableOptions = [
    { value: "reservable-active", label: "فعال" },
    { value: "reservable-inactive", label: "غیر فعال" },
  ];

  function handleReservableOptionChange(value: string) {
    setSelectedReservableOption(value === "reservable-active");
  }

  function resetModal(submitted: boolean) {
    reset();
    onCloseModal(submitted);
  }

  function onSubmit(data: EditTicketRequest) {
    sendEditRequest(
      {
        url: `/SkyDiveEvents/UpdateTicket`,
        data: {
          id: ticket.id,
          ticketTypeId: data.ticketTypeId,
          reservable: selectedReservableOption,
        },
        method: "put",
      },
      (reponse) => {
        toast.success(reponse.message);
        resetModal(true);
      },
      (error) => {
        toast.error(error?.message);
      }
    );
  }

  useEffect(() => {
    setSelectedReservableOption(ticket.reservable);
    reset({
      ticketTypeId: ticket.ticketTypeId,
    });
  }, [ticket, reset, tickeTypeResponse]);

  useEffect(() => {
    const fetchEventTicketType = () => {
      getTicketTypesRequest({
        url: "/SkyDiveEventTicketType",
        params: {
          pageIndex: 1,
          pageSize: 1000000000,
        },
      });
    };

    fetchEventTicketType();
  }, [getTicketTypesRequest]);

  return (
    <SDModal
      show={true}
      onClose={() => resetModal(false)}
      containerClass="!w-[480px]"
    >
      <SDModal.Header color="primary2">ویرایش بلیت</SDModal.Header>
      <SDModal.Body>
        <div className="px-3 py-5">
          <div className="flex flex-col gap-3 items-center text-slate-700 text-center w-full">
            <div className="flex gap-6">
              <p className="font-semibold">شماره بلیت</p>
              <p>{ticket.ticketNumber}</p>
            </div>
          </div>
          <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full flex flex-wrap">
              <div className="w-full md:w-1/2 px-5 py-3">
                <SDLabel htmlFor="tpyeId" className="mb-2">
                  نوع بلیت
                </SDLabel>
                <SDSelect
                  id="tpyeId"
                  invalid={!!formErrors.ticketTypeId}
                  {...register("ticketTypeId", {
                    required: "فیلد اجباری است.",
                  })}
                >
                  <option></option>
                  {tickeTypeResponse?.content &&
                    tickeTypeResponse.content.map((item, index) => {
                      return (
                        <option key={index} value={item.id}>
                          {item.title}
                        </option>
                      );
                    })}
                </SDSelect>
                {formErrors.ticketTypeId?.message && (
                  <p className="text-red-600 text-xs pr-2 mt-2">
                    {formErrors.ticketTypeId.message}
                  </p>
                )}
              </div>
              <div className="w-full md:w-1/2 px-5 py-3">
                <SDLabel htmlFor="reservableQty" className="mb-2">
                  قابل رزرو
                </SDLabel>
                <div className="mt-3">
                  <RadioButton
                    groupName="reservable"
                    options={reservableOptions}
                    selectedOption={
                      selectedReservableOption
                        ? "reservable-active"
                        : "reservable-inactive"
                    }
                    onOptionChange={handleReservableOptionChange}
                  />
                </div>
              </div>
            </div>
            <div className="w-full px-5 pt-5 flex justify-start items-center">
              <SDButton
                color="primary2"
                type="submit"
                className="w-full"
                disabled={editPending}
              >
                {editPending && <SDSpinner color="blue" />}
                ذخیره
              </SDButton>
            </div>
          </form>
        </div>
      </SDModal.Body>
    </SDModal>
  );
};

export default EditTicketModal;
