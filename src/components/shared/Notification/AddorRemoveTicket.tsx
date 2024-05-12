import { useState } from "react";
import AddTicketModal from "./AddTicketModal";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  addTicketToBasket,
  removeTicketFromBasket,
} from "../../../store/basket";
import {
  RequestTicketItem,
  AggregatedTicket,
  BasketTicketModel,
} from "../../../models/shared.models";
import SDSpinner from "../Spinner";
import RemoveTicketModal from "./RemoveTicketModal";
interface PlusMinusProps {
  aggretadTicket: AggregatedTicket;
  disabled?: boolean;
}

const AddOrRemoveTicket: React.FC<PlusMinusProps> = ({
  aggretadTicket,
  disabled = false,
}) => {
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [isRemoving, setIsRemoving] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const changingTicket = useAppSelector((state) => state.basket.changingTicket);
  const isEmmptying = useAppSelector((state) => state.basket.isEmptying);
  const pending =
    Boolean(
      changingTicket &&
        changingTicket.flightLoadId === aggretadTicket.flightLoadId &&
        changingTicket.ticketTypeId === aggretadTicket.ticketTypeId
    ) || isEmmptying;

  function increase() {
    setIsAdding(true);
  }

  function decrease() {
    setIsRemoving(true);
  }

  function onSubmitAdd(userCode: number) {
    const ticket: RequestTicketItem = {
      flightLoadId: aggretadTicket.flightLoadId,
      ticketTypeId: aggretadTicket.ticketTypeId,
      userCode: userCode || null,
    };
    dispatch(addTicketToBasket(ticket));
  }

  function onRemoveSubmit(tickets: BasketTicketModel[]) {
    const removingTickets: RequestTicketItem[] = tickets.map((item) => {
      return {
        flightLoadId: item.flightLoadId,
        ticketTypeId: item.ticketTypeId,
        userCode: item.userCode,
      };
    });
    dispatch(removeTicketFromBasket(removingTickets));
  }

  return (
    <>
      {isAdding && (
        <AddTicketModal
          onClose={() => setIsAdding(false)}
          onSubmit={onSubmitAdd}
        ></AddTicketModal>
      )}
      <RemoveTicketModal
        aggregatedTicket={aggretadTicket}
        show={isRemoving}
        onClose={() => setIsRemoving(false)}
        onSubmit={onRemoveSubmit}
      ></RemoveTicketModal>
      <div className="flex gap-6 items-center">
        <button
          onClick={decrease}
          disabled={aggretadTicket?.ticketMembers?.length === 0 || pending}
          className="rounded-full shadow-lg border border-slate-100 w-10 h-10 text-lg text-pink-500 flex justify-center items-center disabled:shadow-none disabled:bg-slate-100 disabled:cursor-not-allowed"
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
              d="M19.5 12h-15"
            />
          </svg>
        </button>
        <div className="text-lg">
          {/* <SDSpinner size={10}></SDSpinner> */}
          {pending ? (
            <SDSpinner size={10}></SDSpinner>
          ) : (
            aggretadTicket?.ticketMembers?.length || 0
          )}
        </div>
        <button
          onClick={increase}
          disabled={disabled || pending}
          className="rounded-full shadow-lg border border-slate-100 w-10 h-10 text-lg text-white bg-pink-500 flex justify-center items-center disabled:bg-pink-300 disabled:cursor-not-allowed"
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
        </button>
      </div>
    </>
  );
};

export default AddOrRemoveTicket;
