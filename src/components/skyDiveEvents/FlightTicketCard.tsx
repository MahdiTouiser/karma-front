import { useEffect, useState } from "react";
import useBasketTickets from "../../hooks/useBasketTickets";
import { AggregatedTicket } from "../../models/shared.models";
import { Ticket } from "../../models/skyDiveEvents.models";
import AddOrRemoveTicket from "../shared/Notification/AddorRemoveTicket";
import NumberWithSeperator from "../shared/NumberWithSeperator";

interface FlightTicketCardProps extends Ticket {
  className?: string;
  flightLoadId: string;
}

const FlightTicketCard: React.FC<FlightTicketCardProps> = (props) => {
  const [aggregatedTicket, setAggreatedTicket] = useState<AggregatedTicket>();
  const { aggregatedTickets, getAggregate } = useBasketTickets();

  useEffect(() => {
    const aggreated = getAggregate(props.ticketTypeId, props.flightLoadId);
    setAggreatedTicket(
      aggreated || {
        amount: 0,
        flightLoadId: props.flightLoadId,
        flightNumber: 0,
        ticketMembers: [],
        ticketTypeId: props.ticketTypeId,
        type: "",
        flightDate: "",
      },
    );
  }, [aggregatedTickets, props, getAggregate]);
  return (
    <div
      className={`${props.className || ""
        } flex w-full flex-col items-center  justify-center py-8 text-lg font-semibold`}
    >
      <p className="mb-1 text-slate-600">بلیت‌ {props.ticketType}</p>
      <p className="mb-5 text-slate-600">
        مبلغ <NumberWithSeperator value={props.amount} /> ریال
      </p>
      <p className="mb-6 text-green-500">بلیت‌های موجود : {props.qty}</p>
      {aggregatedTicket && aggregatedTickets && (
        <AddOrRemoveTicket
          aggretadTicket={aggregatedTicket}
          disabled={!props.allowedToReserve}
        />
      )}
    </div>
  );
};

export default FlightTicketCard;
