import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AiFillPrinter } from "react-icons/ai";
import useApi from "../../hooks/useApi";
import { printResponse } from "../../utils/shared";
import KButton from "./Button";
import KSpinner from "./Spinner";
const MultiplePdfPrintButton = ({ pdfUrl, fileName, body, color = "primary", disable = false, className = "", }) => {
    const { sendRequest, isPending } = useApi();
    const handlePrint = () => {
        sendRequest({
            url: pdfUrl,
            responseType: "blob",
            method: "put",
            data: body,
        }, (response) => {
            printResponse(fileName, response);
        });
    };
    return (_jsxs(KButton, { onClick: handlePrint, color: color, className: className, disabled: disable || isPending, children: [isPending ? (_jsx(KSpinner, { size: 6, color: color === "primary" ? "primary" : "blue" })) : (_jsx("span", { className: "ml-2", children: _jsx(AiFillPrinter, { size: "1.5rem" }) })), "\u0686\u0627\u067E \u06AF\u0631\u0648\u0647\u06CC"] }));
};
export default MultiplePdfPrintButton;
