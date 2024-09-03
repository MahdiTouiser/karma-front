import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useRef, useState } from "react";
import { AiOutlinePrinter } from "react-icons/ai";
import { ReactToPrint } from "react-to-print";
import useApi from "../../hooks/useApi";
import { printResponse } from "../../utils/shared";
import KButton from "./Button";
import Grid from "./Grid/Grid";
import KSpinner from "./Spinner";
const PdfPrintButton = ({ pdfUrl, method = "get", body, fileName = "", useKButton = false, inputText = "چاپ", }) => {
    const { sendRequest, isPending } = useApi();
    const [gridData, setGridData] = useState([]);
    const componentRef = useRef(null);
    const [colDefs] = useState([
        {
            field: 'eventCode',
            headerName: 'کد رویداد',
        },
        {
            field: 'eventTitle',
            headerName: 'نام رویداد',
        },
        {
            field: 'eventDate',
            headerName: 'تاریخ رویداد',
        },
        {
            field: 'flightName',
            headerName: 'نام پرواز',
        },
        {
            field: 'flightStatus',
            headerName: 'وضعیت پرواز',
        },
        {
            field: 'flightDate',
            headerName: 'تاریخ پرواز',
        },
        {
            field: 'flightNumber',
            headerName: 'شماره پرواز',
        },
        {
            field: 'ticketNumber',
            headerName: 'شماره بلیت',
        },
        {
            field: 'ticketType',
            headerName: 'نوع بلیت',
        },
        {
            field: 'fullName',
            headerName: 'نام و نام خانوادگی',
        },
        {
            field: 'nationalCode',
            headerName: 'کد ملی',
        },
        {
            field: 'phoneNumber',
            headerName: 'شماره موبایل',
        },
        {
            field: 'weight',
            headerName: 'وزن',
        },
        {
            field: 'height',
            headerName: 'قد',
        },
    ]);
    const handlePrint = () => {
        sendRequest({
            url: pdfUrl,
            responseType: "json",
            method: method,
            data: body,
        }, (response) => { if (useKButton) {
            setGridData(response.content);
        }
        else {
            printResponse(fileName, response);
        } });
    };
    return (_jsxs(_Fragment, { children: [useKButton ? (_jsx(ReactToPrint, { trigger: () => (_jsx("div", { className: "flex justify-center items-center text-center", children: isPending ? (_jsx(KSpinner, { color: "blue" })) : (_jsxs(KButton, { onClick: handlePrint, color: "primary", className: "py-1/2", children: [_jsx("span", { className: "ml-2", children: _jsx(AiOutlinePrinter, { size: "1.5rem" }) }), inputText] })) })), content: () => componentRef.current, onBeforeGetContent: async () => {
                    if (gridData.length === 0) {
                        await new Promise((resolve) => {
                            handlePrint();
                            setTimeout(resolve, 1000);
                        });
                    }
                } })) : (_jsx("div", { children: _jsx("button", { onClick: handlePrint, className: "text-cyan-600", children: inputText }) })), _jsx("div", { style: { display: "none" }, children: _jsxs("div", { ref: componentRef, className: "rtl m-10", children: [_jsx("h1", { className: "font-bold mb-5", children: "\u06AF\u0632\u0627\u0631\u0634 \u0628\u0644\u06CC\u062A \u0647\u0627" }), _jsx(Grid, { data: gridData, colDefs: colDefs, rowActions: null })] }) })] }));
};
export default PdfPrintButton;
