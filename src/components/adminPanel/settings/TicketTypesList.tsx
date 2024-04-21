import React, { useState } from 'react';
import { SkyDiveEventTicketType } from '../../../models/skyDiveEvents.models';
import SDSpinner from '../../shared/Spinner';

const TicketTypesList: React.FC<{
  userTypeId: string;
  selectedTickets: string[];
  allowedTicketTypes: SkyDiveEventTicketType[];
  handleAddTicket: (
    userType: string,
    ticketTypeUserType: string
  ) => Promise<void>;
  handleRemoveTicket: (userType: string, ticket: string) => Promise<void>;
}> = ({
  userTypeId,
  selectedTickets,
  allowedTicketTypes,
  handleAddTicket,
  handleRemoveTicket,
}) => {
  const isSelectedTicket = (ticketTypeId: string) =>
    selectedTickets.includes(ticketTypeId);

  const [isPending, setIsPending] = useState<boolean>(false);

  async function onAddClick(ticketTypeId: string) {
    setIsPending(true);
    await handleAddTicket(userTypeId, ticketTypeId);
    setIsPending(false);
  }

  async function onRemoveClick(ticketTypeId: string) {
    setIsPending(true);
    await handleRemoveTicket(userTypeId, ticketTypeId);
    setIsPending(false);
  }

  return (
    <ul className="space-y-2 p-4">
      {allowedTicketTypes.map((ticketType) => {
        const isSelected = isSelectedTicket(ticketType.id);

        return (
          <li key={ticketType.id} className="flex items-center justify-between">
            <span className={`text-lg ${isSelected ? 'text-green-500' : ''}`}>
              {ticketType.title}
            </span>
            <div className="flex-grow flex">
              {isSelected ? (
                <button
                  className="px-2 mt-2 py-0.5 text-red-700 text-sm rounded-md bg-red-200 ml-2 flex items-center flex-grow-0 mr-2 disabled:opacity-70"
                  onClick={(event) => {
                    event.stopPropagation();
                    onRemoveClick(ticketType.id);
                  }}
                  disabled={isPending}
                >
                  - حذف
                  {isPending && <SDSpinner color="blue" />}
                </button>
              ) : (
                <button
                  className="px-2 mt-2 py-0.5 rounded-md text-green-700 text-sm bg-green-200 ml-2 flex items-center flex-grow-0  mr-2 disabled:opacity-70"
                  onClick={(event) => {
                    event.preventDefault();
                    onAddClick(ticketType.id);
                  }}
                  disabled={isPending}
                >
                  + افزودن
                  {isPending && <SDSpinner color="blue" />}
                </button>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default TicketTypesList;
