import React, { useRef, useState } from "react";
import { AiOutlinePrinter } from "react-icons/ai";
import { ReactToPrint } from "react-to-print";
import useApi from "../../hooks/useApi";
import { TicketsReport } from "../../models/reports.models";
import { printResponse } from "../../utils/shared";
import SDButton from "./Button";
import Grid from "./Grid/Grid";
import { ColDef } from "./Grid/grid.types";
import SDSpinner from "./Spinner";

interface PdfPrintButtonProps {
  pdfUrl: string;
  method?: string;
  body?: string[];
  fileName?: string
  useSDButton?: boolean;
  inputText?: string;
}

const PdfPrintButton: React.FC<PdfPrintButtonProps> = ({
  pdfUrl,
  method = "get",
  body,
  fileName = "",
  useSDButton = false,
  inputText = "چاپ",
}) => {
  const { sendRequest, isPending } = useApi<string[], Blob>();
  const [gridData, setGridData] = useState<TicketsReport[]>([]);
  const componentRef = useRef<HTMLDivElement>(null);

  const [colDefs] = useState<ColDef<TicketsReport>[]>([
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
  ])

  const handlePrint = () => {
    sendRequest(
      {
        url: pdfUrl,
        responseType: "json",
        method: method,
        data: body,
      },
      (response: any) => { if (useSDButton) { setGridData(response.content) } else { printResponse(fileName, response) } }
    );
  };

  return (
    <>
      {useSDButton ? (
        <ReactToPrint
          trigger={() => (
            <div className="flex justify-center items-center text-center">
              {isPending ? (
                <SDSpinner color="blue" />
              ) : (
                <SDButton onClick={handlePrint} color="primary2" className="py-1/2">
                  <span className="ml-2">
                    <AiOutlinePrinter size="1.5rem"></AiOutlinePrinter>
                  </span>
                  {inputText}
                </SDButton>
              )}
            </div>
          )}
          content={() => componentRef.current}
          onBeforeGetContent={async (): Promise<void> => {
            if (gridData.length === 0) {
              await new Promise<void>((resolve) => {
                handlePrint();
                setTimeout(resolve, 1000);
              });
            }
          }}
        />
      ) : (
        <div>
          <button onClick={handlePrint} className="text-cyan-600">
            {inputText}
          </button>
        </div>
      )}
      <div style={{ display: "none" }}>
        <div ref={componentRef} className="rtl m-10">
          <h1 className="font-bold mb-5">گزارش بلیت ها</h1>
          <Grid data={gridData} colDefs={colDefs} rowActions={null} />
        </div>
      </div>
    </>
  );
};

export default PdfPrintButton;
