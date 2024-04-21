import SDButton from "../components/shared/Button";
import SDModal from "../components/shared/Modal/Modal";
import { useState } from "react";
let resolvePromise: (value: boolean | PromiseLike<boolean>) => void;

function useConfirm(
  message: string,
  title = "",
  confirmButton = "بله",
  rejectButton = "خیر"
): [React.FC, () => Promise<boolean>] {
  const [showModal, setShowModal] = useState<boolean>(false);
  const confirmation = () => {
    setShowModal(true);
    return new Promise<boolean>((resolve) => {
      resolvePromise = resolve;
    });
  };

  function handleConfirm() {
    resolvePromise(true);
    setShowModal(false);
  }

  function handleReject() {
    resolvePromise(false);
    setShowModal(false);
  }
  const ConfirmModal: React.FC = () => {
    return (
      <SDModal
        show={showModal}
        onClose={() => handleReject()}
        containerClass="!pb-2"
      >
        {title && (
          <SDModal.Header withClose={false} color="warning">
            <div className="flex gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 stroke-yellow-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
              <div className="text-yellow-600 font-semibold">{title}</div>
            </div>
          </SDModal.Header>
        )}
        <div className="px-5 mt-8">
          <p className="mb-8">{message}</p>
          <div className="flex justify-end gap-2">
            <SDButton
              onClick={handleReject}
              outline
              color="primary"
              className="!rounded-md"
            >
              {rejectButton}
            </SDButton>
            <SDButton
              onClick={handleConfirm}
              color="primary"
              className="!rounded-md"
            >
              {confirmButton}
            </SDButton>
          </div>
        </div>
      </SDModal>
    );
  };
  return [ConfirmModal, confirmation];
}

export default useConfirm;
