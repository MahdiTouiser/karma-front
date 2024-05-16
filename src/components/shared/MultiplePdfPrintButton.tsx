import { AiFillPrinter } from "react-icons/ai";
import useAPi from "../../hooks/useApi";
import { printResponse } from "../../utils/shared";
import KButton from "./Button";
import KSpinner from "./Spinner";

interface MultiplePdfPrintButtonProps {
  pdfUrl: string;
  fileName: string;
  body?: string[];
  color?: "primary" | "primary";
  disable?: boolean;
  className?: string;
}

const MultiplePdfPrintButton: React.FC<MultiplePdfPrintButtonProps> = ({
  pdfUrl,
  fileName,
  body,
  color = "primary",
  disable = false,
  className = "",
}) => {
  const { sendRequest, isPending } = useAPi<string[], Blob>();
  const handlePrint = () => {
    sendRequest(
      {
        url: pdfUrl,
        responseType: "blob",
        method: "put",
        data: body,
      },
      (response) => {
        printResponse(fileName, response);
      },
    );
  };

  return (
    <KButton
      onClick={handlePrint}
      color={color}
      className={className}
      disabled={disable || isPending}
    >
      {isPending ? (
        <KSpinner
          size={6}
          color={color === "primary" ? "primary" : "blue"}
        ></KSpinner>
      ) : (
        <span className="ml-2">
          <AiFillPrinter size="1.5rem"></AiFillPrinter>
        </span>
      )}
      چاپ گروهی
    </KButton>
  );
};

export default MultiplePdfPrintButton;
