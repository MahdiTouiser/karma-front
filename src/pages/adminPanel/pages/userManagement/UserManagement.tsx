import React, { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SDButton from "../../../../components/shared/Button";
import DateRangeFilter from "../../../../components/shared/DateRangeFilter";
import Grid from "../../../../components/shared/Grid/Grid";
import {
  ColDef,
  GridGetData,
} from "../../../../components/shared/Grid/grid.types";
import SearchInput from "../../../../components/shared/SearchInput";
import SDSelect from "../../../../components/shared/Select";
import useAPi from "../../../../hooks/useApi";
import {
  BaseResponse,
  UserStatusesPersianMap,
} from "../../../../models/shared.models";
import { UserListItem } from "../../../../models/usermanagement.models";

const UserManagement: React.FC = () => {
  const { sendRequest, errors } = useAPi<null, BaseResponse<UserListItem[]>>();
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [minDate, setMinDate] = useState<string>("");
  const [maxDate, setMaxDate] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [colDefs] = useState<ColDef<UserListItem>[]>([
    {
      field: "code",
      headerName: "کد",
      sortable: true,
    },
    {
      field: "nationalCode",
      headerName: "کد ملی",
      sortable: true,
    },
    {
      field: "firstName",
      headerName: "نام",
      sortable: true,
    },
    {
      field: "lastName",
      headerName: "نام خانوادگی",
      sortable: true,
    },
    {
      field: "userType",
      headerName: "نوع",
      sortable: true,
    },
    {
      field: "phone",
      headerName: "موبایل",
      sortable: true,
    },
    {
      field: "birthDate",
      headerName: "تاریخ تولد",
      sortable: true,
    },
    {
      field: "username",
      headerName: "نام کاربری",
      sortable: true,
    },
    {
      field: "email",
      headerName: "ایمیل",
      sortable: true,
    },
    {
      field: "statusDisplay",
      headerName: "وضعیت",
      sortable: true,
    },
  ]);
  const navigate = useNavigate();

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };

  const onSearchTermChange = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  function goToDetail(user: UserListItem) {
    navigate(`${user.id}`);
  }

  function goToEdit(user: UserListItem) {
    navigate(`${user.id}/edit`);
  }

  const fetchUsers = useCallback<GridGetData<UserListItem>>(
    (gridParams, setRows, fail) => {
      sendRequest(
        {
          url: "/Admin/GetUsers",
          params: {
            pagesize: gridParams.pageSize,
            pageindex: gridParams.pageIndex,
            userStatus: selectedValue,
            minDate: minDate,
            maxDate: maxDate,
            orderby: gridParams.sorts
              .map((item) => `${item.field} ${item.sort}`)
              .join(","),
            search: searchTerm,
          },
        },
        (response) => {
          const result = response.content;
          // setResult(result);
          setRows(result, response.total);
        },
        (error) => fail(error)
      );
    },
    [sendRequest, selectedValue, minDate, maxDate, searchTerm]
  );

  if (errors) {
    return <div>Error: {errors.message}</div>;
  }

  return (
    <>
      <div className="flex  mt-12 flex-wrap">
        <div className=" basis-full mb-4 xl:mb-0 xl:basis-1/12">
          <Link to="create" className="w-full">
            <SDButton color="primary2">+ جدید</SDButton>
          </Link>
        </div>
        <div className="flex flex-wrap justify-between xl:basis-11/12 gap-4">
          <div className="flex flex-wrap">
            <div className="flex items-center justify-center pb-2 ml-8">
              <label htmlFor="status" className="pl-1 text-sm">
                وضعیت:
              </label>

              <div className="mr-1">
                <SDSelect
                  id="status"
                  onChange={handleSelectChange}
                  value={selectedValue}
                >
                  <option value="">همه</option>
                  {Array.from(UserStatusesPersianMap.entries()).map(
                    ([key, value]) => (
                      <option key={key} value={key} className="text-right">
                        {value}
                      </option>
                    )
                  )}
                </SDSelect>
              </div>
            </div>
            <div className="flex items-center justify-center pb-2">
              <label htmlFor="search" className="pl-1 text-sm">
                جستجو:
              </label>
              <div className="mr-1">
                <SearchInput
                  id="search"
                  onSubmit={onSearchTermChange}
                  searchTerm={searchTerm}
                  placeholder="نام، نام خانوادگی، کد ملی"
                />
              </div>
            </div>
          </div>
          <DateRangeFilter
            label="تاریخ ثبت نام"
            fromDate={minDate}
            toDate={maxDate}
            onChangeFromDate={setMinDate}
            onChangeToDate={setMaxDate}
          />
        </div>
      </div>
      <div className="mt-3">
        <Grid<UserListItem>
          getData={fetchUsers}
          onDoubleClick={goToDetail}
          colDefs={colDefs}
          rowActions={{ edit: true, remove: false }}
          onEditRow={goToEdit}
        />
      </div>
    </>
  );
};

export default UserManagement;
