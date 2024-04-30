import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { UserMessage } from "../../../models/messages.models";
import { readMessage } from "../../../store/messages";
import SDButton from "../../shared/Button";
import SDCard from "../../shared/Card";
import SDSpinner from "../../shared/Spinner";

const MessagesItem: React.FC<UserMessage> = (props) => {
  const [isFullTextShown, setIsFullTextShown] = useState(false);
  const changingMessageId = useAppSelector(
    (state) => state.messages.changingMessageid
  );

  const maxLength = 80;

  const handleMoreClick = () => {
    setIsFullTextShown(true);
  };

  const displayedText = isFullTextShown
    ? props.text
    : `${props.text.substring(0, maxLength)}`;

  const shouldShowMoreButton =
    !isFullTextShown && props.text.length > maxLength;

  const textClass = props.visited ? "text-black-400" : "text-blue-400";

  const dispatch = useAppDispatch();

  const markAsRead = () => {
    dispatch(readMessage(props.id));
  };

  return (
    <SDCard className="mb-2 !border">
      <div
        className={`flex gap-11 items-center   pb-6 ${props.visited ? "read" : "unread"
          }`}
      >
        <div className="hidden sm:block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-16 h-w-16"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
            />
          </svg>
        </div>
        <div className="flex flex-grow">
          <div className="flex flex-col flex-grow">
            <div className="flex mb-5 items-center">
              <p className="text-green-400 text-sm">در {props.createdAt}</p>
            </div>
            <div className="flex mb-5 items-center">
              <p className="text-black-400 font-bold">{props.title}</p>
            </div>
            <div className="flex mb-5 items-center">
              <p className={textClass}>
                {displayedText.length > maxLength ? +"..." : displayedText}
              </p>
              {shouldShowMoreButton && (
                <button onClick={handleMoreClick} className="text-blue-500">
                  بیشتر
                </button>
              )}
            </div>
            {!props.visited && (
              <div className="flex items-center ">
                <SDButton
                  onClick={markAsRead}
                  color="primary2"
                  disabled={changingMessageId === props.id}
                >
                  <span className="flex items-center">
                    {changingMessageId === props.id && <SDSpinner />}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 inline-block mr-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    علامت‌گذاری به عنوان خوانده شده
                  </span>
                </SDButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </SDCard>
  );
};

export default MessagesItem;
