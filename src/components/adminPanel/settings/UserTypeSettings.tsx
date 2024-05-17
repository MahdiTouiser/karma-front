import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useApi from "../../../hooks/useApi";
import { UnAssignTicketTypes } from "../../../models/settings.models";
import { BaseResponse } from "../../../models/shared.models";
import { SkyDiveEventTicketType } from "../../../models/skyDiveEvents.models";
import {
  AssignTicketTypes,
  userType as UserTypeModel,
} from "../../../models/usermanagement.models";
import KSpinner from "../../shared/Spinner";
import UserTypesList from "./UserTypesList";

const UserTypeSettings: React.FC = () => {
  const { sendRequest, isPending } = useApi<
    null,
    BaseResponse<UserTypeModel[]>
  >();
  const { sendRequest: sendPostRequest } = useApi<
    AssignTicketTypes | UnAssignTicketTypes,
    BaseResponse<null>
  >();
  const { sendRequest: getTicketTypesRequest } = useApi<
    null,
    BaseResponse<SkyDiveEventTicketType[]>
  >();

  const [selectedTickets, setSelectedTickets] = useState<{
    [key: string]: string[];
  }>({});
  const [userTypes, setUserTypes] = useState<UserTypeModel[]>([]);
  const [allowedTicketTypes, setAllowedTicketTypes] = useState<
    SkyDiveEventTicketType[]
  >([]);

  useEffect(() => {
    getTicketTypesRequest({ url: "/SkyDiveEventTicketType" }, (response) => {
      setAllowedTicketTypes(response.content);
    });
  }, [getTicketTypesRequest]);

  useEffect(() => {
    sendRequest({ url: "/UserTypes" }, (response) => {
      if (response?.content.length > 0) {
        setUserTypes(response.content);
        setSelectedTickets(
          response.content.reduce((acc, userType) => {
            return {
              ...acc,
              [userType.id]: userType.allowedTicketTypes.map(
                (ticketType) => ticketType.id
              ),
            };
          }, {})
        );
      }
    });
  }, [sendRequest]);

  const handleAddTicket = (userTypeId: string, ticketTypeId: string) => {
    const assignTicketTypes: AssignTicketTypes = {
      userTypeId: userTypeId,
      ticketTypes: [ticketTypeId],
    };

    return sendPostRequest(
      {
        url: "/UserTypes/AssignTicketType",
        method: "post",
        data: assignTicketTypes,
      },
      (response) => {
        setSelectedTickets((prevState) => {
          return {
            ...prevState,
            [userTypeId]: [...prevState[userTypeId], ticketTypeId],
          };
        });
        toast.success(response.message);
      },
      (error) => {
        toast.error(error?.message);
      }
    );
  };

  const handleRemoveTicket = (userTypeId: string, ticketTypeId: string) => {
    const ticketTypeIds =
      selectedTickets[userTypeId].filter((id) => id !== ticketTypeId) || [];

    const body: UnAssignTicketTypes = {
      userTypeId: userTypeId,
      ticketTypeId: ticketTypeId,
    };

    return sendPostRequest(
      {
        url: "/UserTypes/UnAssignTicketType",
        method: "put",
        data: body,
      },
      (response) => {
        setSelectedTickets((prevState) => {
          return {
            ...prevState,
            [userTypeId]: ticketTypeIds,
          };
        });
        toast.success(response.message);
      },
      (error) => {
        toast.error(error?.message);
      }
    );
  };

  if (isPending) {
    return (
      <div className="flex justify-center pt-6 w-full">
        <KSpinner size={20} color="blue" />
      </div>
    );
  }

  return (
    <UserTypesList
      userTypes={userTypes}
      allowedTicketTypes={allowedTicketTypes}
      handleAddTicket={handleAddTicket}
      handleRemoveTicket={handleRemoveTicket}
      selectedTickets={selectedTickets}
    />
  );
};

export default UserTypeSettings;
