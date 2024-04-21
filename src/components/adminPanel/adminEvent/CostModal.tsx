import React, { useEffect } from "react";
import {
  NewTicketFeeList,
  SkyDiveEventTicketType,
  TicketFee,
} from "../../../models/skyDiveEvents.models";
import SDModal from "../../shared/Modal/Modal";
import SDLabel from "../../shared/Label";
import SDButton from "../../shared/Button";
import SDSpinner from "../../shared/Spinner";
import { BaseResponse } from "../../../models/shared.models";
import useAPi from "../../../hooks/useApi";
import { toast } from "react-toastify";
import { useFieldArray, useForm } from "react-hook-form";
import SDSelect from "../../shared/Select";
import ThousandSeparatorInput from "../../shared/ThousandSeparatorInput";

export interface CostModalProps {
  rowId: string;
  onCloseModal: (submitted: boolean) => void;
}

const CostModal: React.FC<CostModalProps> = ({ onCloseModal, rowId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    control,
    reset,
  } = useForm<NewTicketFeeList>({
    mode: "onChange",
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });
  const {
    sendRequest: getRequest,
    isPending: getTypesPending,
    data: typesResponse,
  } = useAPi<null, BaseResponse<SkyDiveEventTicketType[]>>();

  const {
    sendRequest: getFees,
    isPending: getFeesPending,
    data: detailResponse,
  } = useAPi<null, BaseResponse<TicketFee[]>>();

  const { sendRequest: sendChangeRequest, isPending: sendDataIsPending } =
    useAPi<NewTicketFeeList, BaseResponse<null>>();

  useEffect(() => {
    getFees({
      url: `/SkyDiveEvents/TicketTypeAmounts/${rowId}`,
    });
  }, [rowId, getFees]);

  useEffect(() => {
    function setFormValue(fees: TicketFee[]) {
      reset({
        items: fees.map((fee) => {
          return {
            amount: fee.amount,
            typeId: fee.typeId,
          };
        }),
      });
    }
    if (detailResponse?.content) {
      if (detailResponse.content.length) {
        setFormValue(detailResponse.content);
      } else {
        setFormValue([
          {
            amount: 0,
            typeId: "",
          },
        ]);
      }
    }
  }, [detailResponse, reset, typesResponse]);

  useEffect(() => {
    const fetchEventTicketType = () => {
      getRequest({
        url: "/SkyDiveEventTicketType",
        params: {
          pageIndex: 1,
          pageSize: 1000000000,
        },
      });
    };

    fetchEventTicketType();
  }, [getRequest, detailResponse]);

  const handleSaveButton = handleSubmit((data) => {
    sendChangeRequest(
      {
        url: `/SkyDiveEvents/AddEventTypeFee/${rowId}`,
        method: "post",
        data: data,
      },
      (response) => {
        toast.success(response.message);
        onCloseModal(true);
        // if (fetchData) {
        //   fetchData();
        // }
      },
      (error) => {
        toast.error(error?.message);
      }
    );
  });

  const addFeeItem = () => {
    append({
      amount: 0,
      typeId: "",
    });
  };

  const removeFeeItem = (index: number) => {
    remove(index);
  };

  const resetModal = (submitted: boolean) => {
    onCloseModal(submitted);
  };

  return (
    <div>
      <SDModal
        show={true}
        onClose={() => resetModal(false)}
        containerClass="!w-[480px]"
      >
        <SDModal.Header color="primary2">ویرایش بهای فروش</SDModal.Header>
        <SDModal.Body>
          <>
            {(getTypesPending || getFeesPending) && (
              <div className="flex justify-center py-5">
                <SDSpinner color="blue" size={20}></SDSpinner>
              </div>
            )}
            {typesResponse?.content && !getTypesPending && !getFeesPending && (
              <form>
                <div className="px-6 py-8">
                  <div className="flex flex-row items-center  w-full mt-5">
                    <div className="flex flex-col w-5/12 ">
                      <div>
                        <SDLabel>نوع</SDLabel>
                      </div>
                    </div>
                    <div className="flex flex-col w-5/12  mr-4">
                      <div>
                        <SDLabel>قیمت واحد</SDLabel>
                      </div>
                    </div>
                  </div>
                  {fields.map((field, index) => {
                    return (
                      <div
                        className="flex flex-row  justify-between w-full mb-2"
                        key={field.id}
                      >
                        <div className="flex flex-col w-5/12">
                          <div className="">
                            <SDSelect
                              id={`ticketType-${index}`}
                              {...register(`items.${index}.typeId` as const, {
                                required: "فیلد اجباری است.",
                              })}
                              invalid={
                                !!formErrors?.items?.[index]?.typeId?.message
                              }
                            >
                              <option value="">انتخاب کنید</option>
                              {typesResponse.content.map((type, typeIndex) => (
                                <option
                                  key={typeIndex}
                                  value={type.id}
                                  className="text-right"
                                >
                                  {type.title}
                                </option>
                              ))}
                            </SDSelect>
                            {formErrors?.items?.[index]?.typeId && (
                              <p className="text-red-600 text-xs pr-2 mt-2">
                                {formErrors?.items?.[index]?.typeId?.message}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col w-4/12 items-center mr-4">
                          <div>
                            <ThousandSeparatorInput
                              control={control}
                              name={`items.${index}.amount` as const}
                              required="فیلد اجباری است."
                            />
                            {formErrors?.items?.[index]?.amount && (
                              <p className="text-red-600 text-xs pr-2 mt-2">
                                {formErrors?.items?.[index]?.amount?.message}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex  justify-between pr-4  w-4/12 xs:w-3/12">
                          {fields.length !== 1 && (
                            <SDButton
                              color="primary"
                              className="font-extrabold !h-10 w-10"
                              onClick={() => removeFeeItem(index)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                              </svg>
                            </SDButton>
                          )}
                          {index === fields.length - 1 && (
                            <SDButton
                              className=" mr-1 !h-10 w-10"
                              onClick={addFeeItem}
                              disabled={
                                fields.length === typesResponse.content.length
                              }
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 4.5v15m7.5-7.5h-15"
                                />
                              </svg>
                            </SDButton>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="w-full px-5 pb-6 flex justify-start items-center">
                  <SDButton
                    color="primary2"
                    type="submit"
                    className="w-full"
                    onClick={handleSaveButton}
                    disabled={sendDataIsPending}
                  >
                    {sendDataIsPending && <SDSpinner />}
                    افزودن
                  </SDButton>
                </div>
              </form>
            )}
          </>
        </SDModal.Body>
      </SDModal>
    </div>
  );
};

export default CostModal;
