import { FormEvent, useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks/reduxHooks";
import {
  AggregatedTicket,
  BasketTicketModel,
} from "../../../models/shared.models";
import SDButton from "../Button";
import SDModal from "../Modal/Modal";

interface AddTicketModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (tickets: BasketTicketModel[]) => void;
  aggregatedTicket: AggregatedTicket;
}

const RemoveTicketModal: React.FC<AddTicketModalProps> = ({
  show,
  onClose,
  onSubmit,
  aggregatedTicket,
}) => {
  const [showModal, setShowModal] = useState<boolean>(show);
  const [selectedTickets, setSelectedTickets] = useState<BasketTicketModel[]>(
    []
  );

  const userCode = useAppSelector((state) => state.auth.code);

  useEffect(() => {
    setShowModal(show);
  }, [show]);

  const onChangeCheckbox: React.ChangeEventHandler<HTMLInputElement> = (
    evnet
  ) => {
    const checked = evnet.target.checked;
    const value = +evnet.target.value;
    const foundTicket = aggregatedTicket.ticketMembers.find(
      (ticket) => ticket.userCode == value
    );
    const selectedTicketsTemp = [...selectedTickets];
    if (foundTicket) {
      if (checked) {
        selectedTicketsTemp.push(foundTicket);
      } else {
        const index = selectedTicketsTemp.findIndex(
          (ticket) => ticket.userCode == value
        );
        selectedTicketsTemp.splice(index, 1);
      }
    }
    setSelectedTickets(selectedTicketsTemp);
  };

  function closeModal() {
    setShowModal(false);
    setSelectedTickets([]);
    onClose();
  }

  function onsubmit(event: FormEvent) {
    event.preventDefault();
    setSelectedTickets([]);
    onSubmit(selectedTickets);
    onClose();
  }

  return (
    <SDModal show={showModal} containerClass="!pb-2" onClose={closeModal}>
      <SDModal.Header>حذف بلیت از سبد</SDModal.Header>
      <SDModal.Body>
        <form onSubmit={onsubmit}>
          <div className="p-5 w-80">
            {aggregatedTicket.ticketMembers.map((item, index) => {
              return (
                <div key={index} className="flex items-center mb-4">
                  <input
                    id={item.userCode.toString()}
                    type="checkbox"
                    value={item.userCode}
                    onChange={onChangeCheckbox}
                    className="ml-3 w-5 h-5 text-primary2-500 bg-gray-100 border-gray-300 rounded focus:ring-primary2-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor={item.userCode.toString()}
                    className="ml-2  font-medium text-slate-600 dark:text-gray-300"
                  >
                    بلیت{" "}
                    {!item.userCode || item.userCode == userCode
                      ? `شما`
                      : `کاربر با کد ${item.userCode}`}
                  </label>
                </div>
              );
            })}
          </div>
          <div className="flex justify-end px-3">
            <SDButton
              type="submit"
              color="primary2"
              disabled={selectedTickets.length === 0}
            >
              حذف
            </SDButton>
          </div>
        </form>
      </SDModal.Body>
    </SDModal>
  );
};

export default RemoveTicketModal;
