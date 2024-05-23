import React, { useState } from 'react';
import { userType } from '../../../models/usermanagement.models';
import TicketTypesList from './TicketTypesList';
import {  SkyDiveEventTicketType } from '../../../models/skyDiveEvents.models';

const UserTypesList: React.FC<{
  userTypes: userType[];
  allowedTicketTypes: SkyDiveEventTicketType[]
  handleAddTicket: (userType: string, ticketTypeUserType: string) => Promise<void>;
  handleRemoveTicket: (userType: string, ticket: string) => Promise<void>;
  selectedTickets: { [key: string]: string[] };
}> = ({
  userTypes,
  allowedTicketTypes,
  handleAddTicket,
  handleRemoveTicket,
  selectedTickets,
}) => {
  const [expandedUserType, setExpandedUserType] = useState<string | null>(null);

  const toggleExpand = (userType: string) => {
    if (expandedUserType === userType) {
      setExpandedUserType(null);
    } else {
      setExpandedUserType(userType);
    }
  };

  return (
    <ul className="space-y-4">
      {userTypes.map((userType) => {
        const isSelected = expandedUserType === userType.title

        return (
          <li
            key={userType.title}
            className={`flex flex-col ${
              isSelected ? 'bg-black-200' : 'bg-white'
            }`}
            style={{
              border: '1px solid gray',
              borderRadius: '0.5rem',
              transition: 'background-color 0.3s',
            }}
          >
            <button
              className={`p-4 text-lg font-bold w-full text-right flex items-center ${
                isSelected ? 'text-blue-600' : ''
              }`}
              onClick={() => {
                toggleExpand(userType.title);
              }}
              style={{
                transition: 'color 0.3s',
              }}
            >
              <div className="flex items-center">
                {isSelected ? (
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
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                ) : (
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
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>
                )}
                <span>{userType.title}</span>
              </div>
            </button>
            {isSelected && (
              <div className="p-4">
                <TicketTypesList
                  userTypeId={userType.id}
                  selectedTickets={selectedTickets[userType.id]}
                  allowedTicketTypes={allowedTicketTypes}
                  handleAddTicket={handleAddTicket}
                  handleRemoveTicket={handleRemoveTicket}
                />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default UserTypesList;
