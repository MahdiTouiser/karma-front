import { AiFillPrinter } from "react-icons/ai";
import useAPi from "../../hooks/useApi";
import { printResponse } from "../../utils/shared";
import SDButton from "./Button";
import SDSpinner from "./Spinner";

interface MultiplePdfPrintButtonProps {
  pdfUrl: string;
  fileName: string;
  body?: string[];
  color?: "primary2" | "primary2";
  disable?: boolean;
  className?: string;
}

const MultiplePdfPrintButton: React.FC<MultiplePdfPrintButtonProps> = ({
  pdfUrl,
  fileName,
  body,
  color = "primary2",
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
    <SDButton
      onClick={handlePrint}
      color={color}
      className={className}
      disabled={disable || isPending}
    >
      {isPending ? (
        <SDSpinner
          size={6}
          color={color === "primary2" ? "primary2" : "blue"}
        ></SDSpinner>
      ) : (
        <span className="ml-2">
          <AiFillPrinter size="1.5rem"></AiFillPrinter>
        </span>
      )}
      چاپ گروهی
    </SDButton>
  );
};

export default MultiplePdfPrintButton;
