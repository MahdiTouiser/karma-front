import { useCallback, useState } from "react";
import SDCard from "../../components/shared/Card";
import useAPi from "../../hooks/useApi.tsx";

import { BaseResponse } from "../../models/shared.models";
import { ColDef, GridGetData } from "../../components/shared/Grid/grid.types";
import Grid from "../../components/shared/Grid/Grid";
import PdfPrintButton from "../../components/shared/PdfPrintButton";
import { UserTransaction } from "../../models/transactions.models.tsx";

const MyTransactionsPage: React.FC = () => {
  const { sendRequest } = useAPi<null, BaseResponse<UserTransaction[]>>();

  const [colDefs] = useState<ColDef<UserTransaction>[]>([
    {
      field: "date",
      headerName: "تاریخ پرداخت",
      sortable: true,
    },
    {
      field: "ticketNumber",
      headerName: "شماره بلیت",
    },
    {
      field: "eventName",
      headerName: "نام رویداد",
    },
    {
      field: "paymentInformation",
      headerName: "اطلاعات پرداخت",
    },
    {
      field: "amount",
      headerName: "مبلغ",
    },
    {
      field: "type",
      headerName: "نوع",
      cellRenderer: (item: UserTransaction) => {
        const displayText = item.type === "Confirmed" ? "تأیید" : "ابطال";
        return <span>{displayText}</span>;
      },
    },
    {
      field: "invoiceNumber",
      headerName: "شماره فاکتور",
      cellRenderer: (item: UserTransaction) => {
        if (
          String(item.paymentInformation) === "شارژ کیف پول" ||
          String(item.paymentInformation) === "برداشت از کیف پول"
        ) {
          return null;
        }
        return item.invoiceNumber;
      },
    },
    {
      field: "",
      headerName: "فاکتور",
      cellRenderer: (item: UserTransaction) => {
        if (
          String(item.paymentInformation) === "شارژ کیف پول" ||
          String(item.paymentInformation) === "برداشت از کیف پول"
        ) {
          return null;
        }
        return (
          <PdfPrintButton
            pdfUrl={`${import.meta.env.VITE_BASE_API_URL}/transactions/Print/${
              item.id
            }`}
            fileName={`فاکتور ${item.ticketNumber}`}
          />
        );
      },
    },
  ]);

  const fetchTickets = useCallback<GridGetData<UserTransaction>>(
    (gridParams, setRows, fail) => {
      sendRequest(
        {
          url: "/transactions",
          params: {
            pageSize: gridParams.pageSize,
            pageIndex: gridParams.pageIndex,
            orderby: gridParams.sorts
              .map((item) => `${item.field} ${item.sort}`)
              .join(","),
          },
        },
        (response) => {
          setRows(response.content, response.total);
        },
        (error) => fail(error)
      );
    },
    [sendRequest]
  );

  return (
    <SDCard>
      <h1 className="text-center font-bold text-xl py-5">تراکنش های من</h1>
      <div className="py-5 md:px-8">
        <Grid<UserTransaction>
          colDefs={colDefs}
          getData={fetchTickets}
          rowActions={null}
        />
      </div>
    </SDCard>
  );
};

export default MyTransactionsPage;
