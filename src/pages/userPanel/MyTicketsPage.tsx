import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import SDCard from "../../components/shared/Card";
import Grid from "../../components/shared/Grid/Grid";
import { ColDef, GridGetData } from "../../components/shared/Grid/grid.types";
import MultiplePdfPrintButton from "../../components/shared/MultiplePdfPrintButton";
import PdfPrintButton from "../../components/shared/PdfPrintButton";
import useAPi from "../../hooks/useApi";
import { BaseResponse } from "../../models/shared.models";
import { UserTicket } from "../../models/tickets.models";

const MyTicketsPage: React.FC = () => {
  const { sendRequest } = useAPi<null, BaseResponse<UserTicket[]>>();
  const [selectedTicketsIds, setSelectedTicketsIds] = useState<string[]>();
  const [colDefs] = useState<ColDef<UserTicket>[]>([
    {
      field: "ticketNumber",
      headerName: "شماره بلیت",
    },
    {
      field: "date",
      headerName: "تاریخ رویداد",
    },
    {
      field: "flightNumber",
      headerName: "شماره پرواز",
    },
    {
      field: "eventLocation",
      headerName: "محل رویداد",
    },
    {
      field: "ticketType",
      headerName: "نوع بلیت",
    },
    {
      field: "",
      headerName: "قوانین و شرایط",
      cellRenderer: (item: UserTicket) => {
        return (
          <Link
            to={`/events/${item.skyDiveEventId}/terms`}
            target="_blank"
            className="text-cyan-600"
          >
            مشاهده
          </Link>
        );
      },
    },
    {
      field: "",
      headerName: "تصویر بلیت",
      cellRenderer: (item: UserTicket) => {
        const body = [item.id];
        return (
          <PdfPrintButton
            body={body}
            method="put"
            pdfUrl={`${import.meta.env.VITE_BASE_API_URL
              }/Reservations/PrintTicket`}
            fileName={`بلیت ${item.ticketNumber}`}
          />
        );
      },
    },
  ]);

  const fetchTickets = useCallback<GridGetData<UserTicket>>(
    (gridParams, setRows, fail) => {
      sendRequest(
        {
          url: "/reservations/myTickets",
          params: {
            pageSize: gridParams.pageSize,
            pageIndex: gridParams.pageIndex,
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
      <h1 className="text-center font-bold text-xl py-5">بلیت‌های من</h1>
      <div className="py-5 md:px-8">
        <MultiplePdfPrintButton
          body={selectedTicketsIds}
          pdfUrl={`${import.meta.env.VITE_BASE_API_URL
            }/Reservations/PrintTicket`}
          fileName={`لیست بلیت‌ها`}
          disable={!selectedTicketsIds?.length}
          className="mb-2"
        ></MultiplePdfPrintButton>
        <Grid<UserTicket>
          colDefs={colDefs}
          getData={fetchTickets}
          selectable={true}
          onSelectionChange={(items) =>
            setSelectedTicketsIds(items.map((item) => item.id))
          }
          rowActions={{
            edit: false,
            remove: false,
            otherActions: [
              {
                icon: (
                  <div className="text-red-600 font-semibold">درخواست کنسل</div>
                ),
                onClick: (item: UserTicket) => console.log(item),
                descriptions: "",
                showField: "voidable",
              },
            ],
          }}
        />
      </div>
    </SDCard>
  );
};

export default MyTicketsPage;
