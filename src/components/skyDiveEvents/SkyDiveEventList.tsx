import { useEffect, useState, useCallback } from "react";
import useAPi from "../../hooks/useApi";
import { BaseResponse, SelectPageEvent } from "../../models/shared.models";
import { SkyDiveEvent } from "../../models/skyDiveEvents.models";
import SkyDiveEventCard from "./SkyDiveEventCard";
import SDSpinner from "../shared/Spinner";
import ReactPaginate from "react-paginate";

interface SkyDiveEventListProps {
  id: string;
}

const SkyDiveEventList: React.FC<SkyDiveEventListProps> = (props) => {
  const { sendRequest, isPending, data } = useAPi<
    null,
    BaseResponse<SkyDiveEvent[]>
  >();
  const pageSize = 12;
  const [pageCount, setPageCount] = useState<number>();

  const fetchEvents = useCallback(
    (id: string, pageIndex = 1) => {
      sendRequest(
        {
          url: "/SkyDiveEvents",
          params: {
            statusId: id,
            pageIndex: pageIndex,
            pageSize: pageSize,
          },
        },
        (response) => {
          setPageCount(response.total / pageSize);
        }
      );
    },
    [sendRequest]
  );

  useEffect(() => {
    fetchEvents(props.id);
  }, [props.id, fetchEvents]);

  const handlePageClick = (event: SelectPageEvent) => {
    fetchEvents(props.id, event.selected + 1);
  };

  return (
    <div>
      <div className="p-6 flex flex-wrap ">
        {data?.content && !isPending ? (
          data.content.map((item, index) => (
            <div
              key={index}
              className=" my-3 px-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
            >
              <SkyDiveEventCard {...item} />
            </div>
          ))
        ) : (
          <div className="flex justify-center py-24 w-full">
            <SDSpinner size={28} />
          </div>
        )}
      </div>
      {pageCount && pageCount > 1 && (
        <ReactPaginate
          breakLabel="..."
          nextLabel={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          }
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          }
          renderOnZeroPageCount={null}
          containerClassName="flex gap-5  justify-center"
          nextClassName="flex items-center"
          previousClassName="flex items-center"
          pageLinkClassName="p-1 block hover:text-primary-400 transition-all ease-linear duration-75"
          nextLinkClassName="p-1 block hover:text-primary-400 transition-all ease-linear duration-75"
          previousLinkClassName="p-1 block hover:text-primary-400 transition-all ease-linear duration-75"
          breakClassName="p-1 block hover:text-primary-400"
          activeClassName="text-primary-500"
          pageClassName="text-base "
        />
      )}
    </div>
  );
};

export default SkyDiveEventList;
