import React, { useCallback, useEffect, useState } from "react";
import KCard from "../../components/shared/Card";
import NumberWithSeperator from "../../components/shared/NumberWithSeperator";
import KSpinner from "../../components/shared/Spinner";
import useAPi from "../../hooks/useApi";
import { BaseResponse } from "../../models/shared.models";
import { WalletData } from "../../models/wallet.models";

const Wallet: React.FC = () => {
  const [balance, setBalance] = useState<number>(0);
  // const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const { sendRequest: getWalletRequest, isPending: getPending } = useAPi<
    null,
    BaseResponse<WalletData>
  >();

  // const handlePaymentAmountChange = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const amount = parseInt(event.target.value, 10);
  //   setPaymentAmount(amount);
  // };

  // const handlePayment = () => {
  //   if (paymentAmount > 0) {
  //     // const newBalance = balance + paymentAmount;
  //     // setBalance(newBalance);
  //     // toast.success("موجودی با موفقیت به روز شد!");
  //   }
  // };

  const fetchWallet = useCallback(() => {
    getWalletRequest(
      {
        url: "wallets",
      },
      (response) => {
        setBalance(response.content.balance);
      }
    );
  }, [getWalletRequest]);

  useEffect(() => {
    fetchWallet();
  }, [fetchWallet]);

  return (
    <KCard className="flex items-center justify-center min-h-screen p-8">
      <KCard className="shadow rounded-lg w-full md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl mb-16 sm:w-full sm:max-w-screen-md flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-4 text-center">کیف پول کاربر</h1>

        {getPending ? (
          <KSpinner size={10}></KSpinner>
        ) : (
          <>
            <div className="flex items-center mb-8 flex-wrap justify-center">
              <div className="flex items-center ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-10 h-10"
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
                <NumberWithSeperator value={balance}></NumberWithSeperator>
                <span className="mr-1 text-sm">ریال</span>
              </span>
            </div>
            {/* <div className="flex flex-col md:flex-row items-center justify-center w-full space-y-4 md:space-y-0 md:space-x-4">
              <div className="text-center md:text-left ml-5 md:w-1/6">
                <h1>مبلغ شارژ</h1>
              </div>
              <KTextInput
                numeric={true}
                allowMinus={true}
                id="amount"
                placeholder="مبلغ مورد نظر را وارد کنید"
                className="ltr text-center placeholder:!text-center"
                value={
                  isNaN(paymentAmount)
                    ? ''
                    : paymentAmount
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                onChange={handlePaymentAmountChange}
              />
              <KButton
                type="submit"
                color="primary2"
                onClick={handlePayment}
                className="w-full md:w-auto"
              >
                پرداخت
              </KButton>
            </div> */}
          </>
        )}
      </KCard>
    </KCard>
  );
};

export default Wallet;
