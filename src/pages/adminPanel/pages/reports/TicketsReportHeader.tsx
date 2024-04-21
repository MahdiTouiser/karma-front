import React, { useCallback, useEffect, useState } from 'react';
import SDButton from '../../../../components/shared/Button';
import DateRangeFilter from '../../../../components/shared/DateRangeFilter';
import SearchInput from '../../../../components/shared/SearchInput';
import SDSelect from '../../../../components/shared/Select';
import SDSpinner from '../../../../components/shared/Spinner';
import SDTooltip from '../../../../components/shared/Tooltip';
import useAPi from '../../../../hooks/useApi';
import { BaseResponse } from '../../../../models/shared.models';
import { SkyDiveEvent } from '../../../../models/skyDiveEvents.models';

interface TicketsReportHeaderProps {
  onGetReport: (id: string, searchTerm: string) => void;
}

const TicketsReportHeader: React.FC<TicketsReportHeaderProps> = ({ onGetReport }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [minDate, setMinDate] = useState<string>('');
  const [maxDate, setMaxDate] = useState<string>('');
  const [titles, setTitles] = useState<string[]>([]);
  const [ids, setIds] = useState<string[]>([]);
  const [selectedOptionId, setSelectedOptionId] = useState<string>('');

  const handleGetReport = () => {
    onGetReport(selectedOptionId, searchTerm);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTitle = event.target.value;
    const selectedIndex = titles.indexOf(selectedTitle);
    if (selectedIndex !== -1) {
      const selectedId = ids[selectedIndex];
      setSelectedOptionId(selectedId);
    }
  };




  const isDateSelected = minDate !== '' && maxDate !== '';

  const onSearchTermChange = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  const { sendRequest, isPending } = useAPi<null, BaseResponse<SkyDiveEvent[]>>();

  useEffect(() => {
    const fetchEvents = () => {
      if (isDateSelected) {
        sendRequest(
          {
            url: '/SkyDiveEvents',
            params: {
              start: minDate,
              end: maxDate,
            },
          },
          response => {
            const eventTitles = response.content.map(event => event.title);
            const eventIds = response.content.map(event => event.id);
            setTitles(eventTitles);
            setIds(eventIds);
          }
        );
      }
    };
    fetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minDate, maxDate, sendRequest]);

  return (
    <>
      <div className='border-b border-b-gray'>
        <div className="flex justify-between gap-4 xl:basis-11/12">
          <div className="flex flex-wrap">
            <DateRangeFilter
              label="تاریخ"
              fromDate={minDate}
              toDate={maxDate}
              onChangeFromDate={setMinDate}
              onChangeToDate={setMaxDate}
            />
          </div>
          <div className="flex">
            <div className="mr-4 flex items-center pb-2">
              <label className="pl-1 text-sm"> عنوان رویداد :</label>
              <div className="mr-1">
                {isPending ? (
                  <div className="flex justify-center">
                    <SDSpinner size={5} color="blue"></SDSpinner>
                  </div>
                ) : (
                  <SDSelect
                    disabled={!isDateSelected}
                    onChange={handleSelectChange}
                  >
                    <option>همه</option>
                    {titles.map((title, index) => (
                      <option key={index} value={title}>
                        {title}
                      </option>
                    ))}
                  </SDSelect>

                )}
              </div>
            </div>
            <div className="mr-4 flex items-center justify-center pb-2">
              <label htmlFor="search" className="pl-1 text-sm">
                جستجو:
              </label>
              <SDTooltip
                content="نام رویداد ، تاریخ پرواز ، شماره بلیت ، نوع بلیت ، نام و نام خانوادگی ، کد ملی ، کد کاربر"
                trigger="hover"
                placement="bottom"
                className="flex self-end"
              >
                <div className="mr-1 w-60">
                  <SearchInput
                    id="search"
                    onSubmit={onSearchTermChange}
                    searchTerm={searchTerm}
                    placeholder="نام رویداد ، تاریخ پرواز ، شماره بلیت ، نوع بلیت ، نام و نام خانوادگی ، کد ملی ، کد کاربر "
                  />
                </div>
              </SDTooltip>
            </div>
            <div className="flex items-center justify-center mr-8 mb-2">
              <SDButton color="primary" onClick={handleGetReport} disabled={!isDateSelected || isPending}>
                تهیه گزارش
              </SDButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TicketsReportHeader;
