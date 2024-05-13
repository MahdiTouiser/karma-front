import { useAppSelector } from "../../../hooks/reduxHooks";
import useBasketTickets from "../../../hooks/useBasketTickets";
import KButton from "../Button";
import KCard from "../Card";
import NumberWithSeperator from "../NumberWithSeperator";
import KSpinner from "../Spinner";
import BasketTicketItem from "./BasketTicketItem";
import EmptyButton from "./EmptyButton";
import BookButton from "./‌BookButton";
interface BasketProps {
  inPayment?: boolean;
  canPay?: boolean;
  onPayClick?: () => void;
  isPaying?: boolean;
  onZarinPalClicked?: () => void;
}
const Basket: React.FC<BasketProps> = ({
  inPayment = false,
  canPay = true,
  onPayClick,
  isPaying = false,
  onZarinPalClicked,
}) => {
  const basketState = useAppSelector((state) => state.basket);
  const { aggregatedTickets } = useBasketTickets();

  const emptyMessage = (
    <p className="mt-5 text-center">اعلانی موجود نیست .</p>
  );

  const body = (
    <>
      {basketState.basket?.items.length ? (
        <div className=" px-3">
          {aggregatedTickets
            .slice()
            .sort((a, b) => {
              return a.flightNumber - b.flightNumber;
            })
            .map((item, index) => {
              return (
                <BasketTicketItem key={index} {...item} canEdit={!inPayment} />
              );
            })}

          <div className="border-b border-gray-200 py-4">
            <div className="mb-4 flex justify-between px-1">
              <p className="font-semibold">جمع:</p>
              <p>
                <NumberWithSeperator
                  value={basketState.basket?.totalAmount || 0}
                />
                <span className="mr-1">ریال</span>
              </p>
            </div>
            <div className="flex justify-between px-1">
              <p className="font-semibold">مالیات:</p>
              <p>
                <NumberWithSeperator
                  value={basketState.basket?.taxAmount || 0}
                />
                <span className="mr-1">ریال</span>
              </p>
            </div>
          </div>
          <div className="py-4">
            <div className="mb-4 flex justify-between px-1">
              <p className="font-semibold">قابل پرداخت:</p>
              <p>
                <NumberWithSeperator
                  value={basketState.basket?.payableAmount || 0}
                />
                <span className="mr-1">ریال</span>
              </p>
            </div>
          </div>
          {inPayment ? (
            <div className="top-shadow fixed bottom-1 right-0 flex w-full items-center   justify-between  bg-white p-3 px-6 pb-4 lg:static lg:p-0 lg:shadow-none">
              <KButton
                disabled={!canPay || isPaying}
                color="primary2"
                className="w-40 max-w-md items-center lg:w-full "
                type="button"
                onClick={() => {
                  onPayClick && onPayClick();
                  onZarinPalClicked && onZarinPalClicked();
                }}
              >
                {isPaying && <KSpinner />}
                پرداخت
              </KButton>
              <div className="text-centers font-semibold lg:hidden">
                <p className=" mb-3">قابل پرداخت:</p>
                <p>
                  <NumberWithSeperator
                    value={basketState.basket?.payableAmount || 0}
                  />
                  <span className="mr-1">ریال</span>
                </p>
              </div>
            </div>
          ) : (
            <div>
              <BookButton />
              <EmptyButton />
            </div>
          )}
        </div>
      ) : (
        emptyMessage
      )}
    </>
  );

  const errorMessage = <p className="mt-5 text-center">{basketState.error}</p>;

  const laodingContainer = (
    <div className="flex justify-center pt-6">
      <KSpinner size={20} />
    </div>
  );

  return (
    <KCard
      className={`${inPayment && "mb-10"
        } mb-0 border border-gray-200 text-black`}
    >
      <div className="border-b border-gray-400 pb-5 text-center">
        <p className="mb-3 text-xl font-semibold text-slate-600">
          اعلانات شما
        </p>
        {basketState.basket && basketState.basket.items.length > 0 && (
          <p className="text-green-500">
            بلیت‌های انتخاب شده: {basketState.basket.ticketsCount}
          </p>
        )}
      </div>
      {basketState.loading && laodingContainer}
      {basketState.error && errorMessage}
      {basketState.basket && !basketState.loading && body}
      {!basketState.basket &&
        !basketState.loading &&
        !basketState.error &&
        emptyMessage}
    </KCard>
  );
};

export default Basket;
