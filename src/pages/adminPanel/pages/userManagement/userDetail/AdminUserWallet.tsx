import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import SDCard from "../../../../../components/shared/Card";
import SDButton from "../../../../../components/shared/Button";
import { BaseResponse } from "../../../../../models/shared.models";
import useApi from "../../../../../hooks/useApi";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import SDSpinner from "../../../../../components/shared/Spinner";
import {
  ChargeWalletData,
  WalletData,
} from "../../../../../models/wallet.models";
import NumberWithSeperator from "../../../../../components/shared/NumberWithSeperator";
import useConfirm from "../../../../../hooks/useConfirm";
import ThousandSeparatorInput from "../../../../../components/shared/ThousandSeparatorInput";
interface FormData {
  amount: number;
}
const AdminUserWallet: React.FC = () => {
  const params = useParams();
  const [confirmAmount, setConfirmAmount] = useState<number>(0);

  const [ConfirmModal, confirmation] = useConfirm(
    confirmAmount >= 0
      ? `آیا از شارژ کیف پول به مبلغ \u200E${
          confirmAmount.toLocaleString() ?? "0"
        } ریال مطمئن هستید؟`
      : `آیا از برداشت کیف پول به مبلغ \u200E${confirmAmount} ریال مطمئن هستید؟`,
    "عملیات کیف پول"
  );

  const {  handleSubmit, control,formState:{errors} } = useForm<FormData>({
    mode: "onTouched",
  });

  const {
    sendRequest,
    isPending,
    data: walletData,
  } = useApi<null, BaseResponse<WalletData>>();

  const { sendRequest: sendChargeRequest, isPending: isPendingChargeWallet } =
    useApi<ChargeWalletData, BaseResponse<null>>();

  const fetchWalletData = useCallback(() => {
    sendRequest({
      url: `/wallets/UserWallet/${params.userId}`,
    });
  }, [sendRequest, params.userId]);

  useEffect(() => {
    fetchWalletData();
  }, [fetchWalletData]);

  const onSubmit = async (data: FormData) => {
    setConfirmAmount(data.amount);
    const confirm = await confirmation();
    if (confirm) {
      const chargeData: ChargeWalletData = {
        userId: params.userId,
        amount: data.amount,
      };

      sendChargeRequest(
        {
          url: "/wallets",
          method: "put",
          data: chargeData,
        },
        (response) => {
          toast.success(response.message);
          fetchWalletData();
        },
        (error) => {
          toast.error(error?.message);
        }
      );
    }
  };

  return (
    <SDCard className="flex items-center justify-center p-8 bg-red-500">
      <SDCard className="shadow rounded-lg w-full sm:max-w-md md:max-w-lg lg:max-w-xl flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4 text-center">
          شارژ کیف پول کاربر
        </h1>
        {isPending ? (
          <div className="flex justify-center pt-6 w-full">
            <SDSpinner size={20} color="blue" />
          </div>
        ) : (
          <>
            <ConfirmModal />
            <div className="flex items-center mb-8 flex-wrap justify-center">
              <div className="flex items-center ">
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
                    d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
                  />
                </svg>
                <span className="text-xl m-4 text-gray-600">موجودی :</span>
              </div>
              <span className="text-lg text-gray-800 ml-2">
                <NumberWithSeperator
                  value={walletData?.content.balance || 0}
                ></NumberWithSeperator>
                <span className="mr-1 text-sm">ریال</span>
              </span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
                <ThousandSeparatorInput
                  allowMinus={true}
                  name="amount"
                  className="text-center"
                  placeholder="مبلغ مورد نظر را وارد کنید"
                  control={control}
                  required={"این فیلد اجباری است."}
                />

                <SDButton
                  className="w-full md:w-auto lg:w-1/3 flex items-center justify-center"
                  type="submit"
                  color="success"
                  disabled={isPendingChargeWallet}
                >
                  {isPendingChargeWallet && <SDSpinner size={5} />}
                  <span className="whitespace-nowrap">شارژ کیف پول</span>
                </SDButton>
              </div>
              {errors.amount?.message && (
                  <p className="text-red-600 text-sm pr-2 mt-2">
                    {errors.amount.message}
                  </p>
                )}
            </form>
          </>
        )}
      </SDCard>
    </SDCard>
  );
};

export default AdminUserWallet;
