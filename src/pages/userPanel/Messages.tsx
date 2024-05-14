import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import KCard from "../../components/shared/Card";
import KSpinner from "../../components/shared/Spinner";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { SelectPageEvent } from "../../models/shared.models";
import { fetchMessages } from "../../store/messages";

const Messages: React.FC = () => {
  const pageSize = 10;
  const messagesState = useAppSelector((state) => state.messages);
  const dispatch = useAppDispatch();
  const [pageCount, setPageCount] = useState<number>();

  useEffect(() => {
    setPageCount(Math.ceil(messagesState.total / pageSize));
  }, [messagesState]);

  const handlePageClick = (event: SelectPageEvent) => {
    dispatch(
      fetchMessages({ pageIndex: event.selected + 1, pageSize: pageSize })
    );
  };

  const loading = (
    <div className="flex justify-center pt-6 w-full">
      <KSpinner size={20} />
    </div>
  );

  const body = (
    <>
      {/* <div className="w-full lg:w-9/12">
        {messagesState.messages.map((item, index) => {
          return <MessagesItem key={index} {...item} />;
        })}
      </div> */}
    </>
  );

  return (
    <KCard className="border flex flex-col mb-6 px-12 !border-red">
      <div className="flex justify-center flex-wrap">
        {messagesState.isLoading && loading}
        {messagesState.messages.length > 0 && !messagesState.isLoading && body}
        {!!pageCount && pageCount > 1 && (
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
            containerClassName="flex gap-5  justify-center w-full"
            nextClassName="flex items-center"
            previousClassName="flex items-center"
            pageLinkClassName="p-1 block hover:text-primary2-400 transition-all ease-linear duration-75"
            nextLinkClassName="p-1 block hover:text-primary2-400 transition-all ease-linear duration-75"
            previousLinkClassName="p-1 block hover:text-primary2-400 transition-all ease-linear duration-75"
            breakClassName="p-1 block hover:text-primary2-400"
            activeClassName="text-primary2-500"
            pageClassName="text-base "
          />
        )}
      </div>
    </KCard>
  );
};

export default Messages;
