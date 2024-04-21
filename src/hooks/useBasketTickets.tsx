import { useEffect, useState, useCallback } from "react";
import { AggregatedTicket } from "../models/shared.models";
import { useAppSelector } from "./reduxHooks";

function useBasketTickets() {
  const basketTicket = useAppSelector((state) => state.basket.basket?.items);
  const [aggregated, setAggregated] = useState<AggregatedTicket[]>([]);

  const getAggregate = useCallback(
    (tikcetTypeId: string, flightLoadId: string) => {
      const findedAggregate = aggregated.find(
        (agg) =>
          agg.flightLoadId === flightLoadId && agg.ticketTypeId === tikcetTypeId
      );
      return findedAggregate;
    },
    [aggregated]
  );

  useEffect(() => {
    function getAggregatedTickets(): AggregatedTicket[] {
      const tempaggregated: AggregatedTicket[] = [];
      basketTicket?.forEach((item) => {
        const findedAggregate = tempaggregated.find(
          (agg) =>
            agg.flightLoadId === item.flightLoadId &&
            agg.ticketTypeId === item.ticketTypeId
        );
        if (findedAggregate) {
          findedAggregate.amount += item.amount;
          findedAggregate.ticketMembers.push(item);
        } else {
          const aggregated: AggregatedTicket = {
            flightLoadId: item.flightLoadId,
            flightNumber: item.flightNumber,
            ticketTypeId: item.ticketTypeId,
            flightDate: item.flightDate,
            type: item.type,
            amount: item.amount,
            ticketMembers: [item],
          };
          tempaggregated.push(aggregated);
        }
      });
      return tempaggregated;
    }

    setAggregated(getAggregatedTickets());
  }, [basketTicket]);

  return { aggregatedTickets: aggregated, getAggregate };
}

export default useBasketTickets;
