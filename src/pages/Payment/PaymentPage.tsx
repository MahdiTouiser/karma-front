import { useState, ChangeEvent, useEffect } from "react";
import PaymentMethod from "../../components/payment/PaymentMethod";
import Basket from "../../components/shared/Basket/Basket";
import SDCard from "../../components/shared/Card";
import { FaWallet } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import useAPi from "../../hooks/useApi";
import { BaseResponse } from "../../models/shared.models";
import { toast } from "react-toastify";
import { basketActions } from "../../store/basket";
import { WalletData } from "../../models/wallet.models";

const PaymentPage: React.FC = () => {
  const [method, setMethod] = useState<string>("");
  const [acceptRules, setAcceptRules] = useState<boolean>(false);
  const eventId = useAppSelector(
    (state) => state.basket.basket?.skyDiveEventId,
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [payPending, setPayPending] = useState<boolean>(false);
  const [walletSubtitle, setWalletSubtitle] = useState<string>("");

  const { sendRequest: sendPayRequest } = useAPi<null, BaseResponse<null>>();
  const { sendRequest: sendCheckRequest } = useAPi<null, BaseResponse<null>>();
  const { sendRequest: sendZarinPalRequest } = useAPi<
    null,
    BaseResponse<null>
  >();
  const { sendRequest: getWalletRequest } = useAPi<
    null,
    BaseResponse<WalletData>
  >();

  useEffect(() => {
    getWalletRequest(
      {
        url: "wallets",
      },
      (response) => {
        const balanceString = response.content.balance.toLocaleString();
        setWalletSubtitle(balanceString + " ریال");
      },
    );
  }, [getWalletRequest]);

  function onSelectMethod(id: string) {
    setMethod(id);
  }

  function onChangeAcceptance(evenet: ChangeEvent<HTMLInputElement>) {
    setAcceptRules(!!evenet.target.value);
  }

  function goBack() {
    navigate(-1);
  }

  function onPay(methodId: string) {
    setPayPending(true);
    sendCheckRequest(
      {
        url: "/ShoppingCarts/CheckTickets",
      },
      () => {
        payBasket(methodId);
      },
      (error) => {
        toast.error(error?.message);
        setPayPending(false);
      },
    );
  }
  function payBasket(methodId: string) {
    if (methodId === "wallet") {
      payByWallet();
      return;
    }
    dumpPay();
  }

  function payByWallet() {
    sendPayRequest(
      {
        url: "/Reservations/SetAsPaidByWallet",
        method: "put",
      },
      onFinishPayment,
      (error) => {
        toast.error(error?.message);
        setPayPending(true);
      },
    );
  }

  function dumpPay() {
    sendPayRequest(
      {
        url: "/Reservations/SetAsPaid",
        method: "put",
      },
      onFinishPayment,
      (error) => {
        toast.error(error?.message);
        setPayPending(true);
      },
    );
  }

  function onFinishPayment(payResponse: BaseResponse<null>) {
    toast.success(payResponse.message);
    dispatch(basketActions.reset());
    setPayPending(true);
    navigate("/tickets");
  }

  function onZarinPalClicked() {
    setPayPending(true);
    sendZarinPalRequest(
      {
        url: "/ShoppingCarts/Checkout",
        method: "post",
      },
      (response) => {
        window.location.href = response.message;
        setPayPending(false);
      },
      (error) => {
        toast.error(error?.message);
      },
    );
  }

  return (
    <div className="mt-1 flex flex-wrap  pb-3 pt-4 lg:px-20 xl:px-28">
      <SDCard className="w-full border border-gray-200 lg:w-2/3">
        <p className="mb-5 font-semibold text-slate-600">روش پرداخت</p>
        <PaymentMethod
          title="پرداخت آنلاین"
          subtitle="زرین پال"
          icon={<FaWallet size="2.2rem" color="rgb(54 63 75)" />}
          id="zarinpal"
          onSelect={onSelectMethod}
          isActive={method === "zarinpal"}
        />
        <PaymentMethod
          title="استفاده از اعتبار کیف پول"
          subtitle={walletSubtitle}
          icon={<FaWallet size="2.2rem" color="rgb(54 63 75)" />}
          id="wallet"
          onSelect={onSelectMethod}
          isActive={method === "wallet"}
        />

        <div className="mr-4 mt-4 flex items-center ">
          <input
            id="red-radio"
            type="radio"
            value="accept"
            checked={acceptRules}
            onChange={onChangeAcceptance}
            name="colored-radio"
            className="h-6 w-6 border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
          />
          <label
            htmlFor="red-radio"
            className="mr-2  font-medium text-gray-900 dark:text-gray-300"
          >
            <Link
              to={`/events/${eventId}/terms`}
              target="_blank"
              className="ml-1 inline-block text-blue-600"
            >
              قوانین و شرایط
            </Link>
            را مطالعه کرده‌ام و می‌پذیرم.
          </label>
        </div>
        <div className="mt-10 flex text-slate-600">
          <button onClick={goBack} className="m-auto flex items-center">
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
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
            بازگشت و ویرایش سبد خرید
          </button>
        </div>
      </SDCard>
      <aside className="relative w-full pt-4 lg:w-1/3 lg:pt-0">
        <div className="lg:px-3">
          <Basket
            inPayment={true}
            canPay={!!method && acceptRules}
            isPaying={payPending}
            onPayClick={() => {
              if (method === "zarinpal") {
                onZarinPalClicked();
              } else {
                onPay(method);
              }
            }}
          />
        </div>
      </aside>
    </div>
  );
};

export default PaymentPage;
