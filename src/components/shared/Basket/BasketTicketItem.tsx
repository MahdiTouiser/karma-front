import { AggregatedTicket } from "../../../models/shared.models";
import NumberWithSeperator from "../NumberWithSeperator";
import AddOrRemoveTicket from "./AddorRemoveTicket";
interface BasketTicketItemProps extends AggregatedTicket {
  canEdit?: boolean;
}
const BasketTicketItem: React.FC<BasketTicketItemProps> = ({
  canEdit = true,
  ...ticket
}) => {
  return (
    <div className="flex justify-between border-b border-gray-200 py-4 items-center text-center">
      <div>
        <div className="flex flex-col items-start mb-5">
          <p className="text-sm text-start">
            شماره پرواز: {ticket.flightNumber}
          </p>
          <p className="text-sm text-start">تاریخ پرواز: {ticket.flightDate}</p>
        </div>

        <p>
          <NumberWithSeperator value={ticket.amount} />
          <span className="mr-1">ریال</span>
        </p>
      </div>
      <div>
        <p className="mb-5">بلیت {ticket.type}</p>
        {canEdit ? (
          <AddOrRemoveTicket aggretadTicket={ticket} />
        ) : (
          <span className="text-lg">{ticket.ticketMembers?.length || 0}</span>
        )}
      </div>
    </div>
  );
};
export default BasketTicketItem;
