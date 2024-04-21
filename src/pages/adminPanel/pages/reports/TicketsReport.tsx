import { useState } from 'react';
import TicketsReportGrid from './TicketsReportGrid';
import TicketsReportHeader from './TicketsReportHeader';

const TicketsReport = () => {
  const [showReportGrid, setShowReportGrid] = useState(false);
  const [selectedId, setSelectedId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');


  const getReport = (id: string, searchTerm: string) => {
    setSelectedId(id);
    setSearchTerm(searchTerm)
    setShowReportGrid(true);
  };

  return (
    <>
      <TicketsReportHeader onGetReport={getReport} />
      {showReportGrid && <TicketsReportGrid selectedId={selectedId} searchTerm={searchTerm} />}
    </>
  );
};

export default TicketsReport;
