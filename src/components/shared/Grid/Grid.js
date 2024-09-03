import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table } from "flowbite-react";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import ReactPaginate from "react-paginate";
import KSpinner from "../Spinner";
import GridHeaderComponent from "./GridHeaderComponent";
import GridRow from "./GridRow";
import { GridRowModel, } from "./grid.types";
function MainGrid({ data, colDefs, 
// fetchData,
onDoubleClick, onEditRow, onRemoveRow, getData, rowActions = {
    edit: true,
    remove: true,
    otherActions: [],
    moreActions: [],
}, pageSize: defaultPageSize = 10, onPagination, multiSortable = false, selectable = false, onSelectionChange, idField = "id", theme = "primary", sorts = [] }, ref) {
    const [gridRows, setGridRows] = useState([]);
    const [colHeaders, setColHeaders] = useState([]);
    const [pageCount, setPageCount] = useState();
    const [selectedPage, setSelectedPage] = useState(0);
    const [pageSize, setPageSize] = useState(defaultPageSize);
    const [isPending, setIsPending] = useState(false);
    const [gridSorts, setGridSorts] = useState(sorts);
    const selectedItemsRef = useRef();
    const makeGridRows = useCallback((items, colDefs, selectedItem) => {
        const rows = items.map((item) => {
            const row = new GridRowModel(item, colDefs);
            const castedIdField = idField;
            const wasSelected = selectedItem.some(selected => selected[castedIdField] === item[castedIdField]);
            row.isSelected = wasSelected;
            return row;
        });
        setGridRows(rows);
    }, [idField]);
    const loadGrid = useCallback((gridParams, selectedItems) => {
        if (data) {
            makeGridRows(data, colDefs, selectedItems || []);
        }
        else if (getData) {
            setIsPending(true);
            const isRefreshing = gridParams === undefined;
            const params = isRefreshing
                ? {
                    pageIndex: 1,
                    pageSize: pageSize === null ? 100000 : pageSize,
                    sorts: sorts,
                }
                : gridParams;
            getData(params, (items, total) => {
                makeGridRows(items, colDefs, selectedItems || []);
                if (pageSize && total) {
                    setPageCount(Math.ceil(total / pageSize));
                }
                if (isRefreshing) {
                    setSelectedPage(0);
                }
                setIsPending(false);
            }, (error) => {
                console.log(error);
                setIsPending(false);
            });
        }
    }, [data, colDefs, makeGridRows, getData, pageSize]);
    const onRowDobuleClick = (item) => {
        if (onDoubleClick) {
            onDoubleClick(item);
        }
    };
    const handlePageClick = (event) => {
        if (pageSize !== null) {
            setSelectedPage(event.selected);
            if (onPagination) {
                onPagination({
                    pageIndex: event.selected,
                    pageSize: pageSize,
                    sorts: gridSorts,
                });
                return;
            }
            if (getData) {
                setIsPending(true);
                loadGrid({
                    pageIndex: event.selected + 1,
                    pageSize: pageSize,
                    sorts: gridSorts,
                }, selectedItemsRef.current);
            }
        }
    };
    const onSortChange = ({ field, sort }) => {
        setGridSorts((sorts) => {
            let newSorts = [];
            if (sort === "none") {
                newSorts = sorts.filter((item) => item.field !== field);
            }
            else {
                const itemIndex = sorts.findIndex((item) => item.field === field);
                if (itemIndex === -1) {
                    if (multiSortable) {
                        newSorts = [...sorts, { field, sort }];
                    }
                    else {
                        newSorts = [{ field, sort }];
                    }
                }
                else {
                    newSorts = sorts.map((item, index) => {
                        if (index === itemIndex) {
                            return { field: item.field, sort: sort };
                        }
                        return { ...item };
                    });
                }
            }
            loadGrid({
                pageIndex: selectedPage + 1,
                pageSize: pageSize === null ? 100000 : pageSize,
                sorts: newSorts,
            }, selectedItemsRef.current);
            return newSorts;
        });
    };
    const onRowSelectedChange = (row, checked) => {
        row.isSelected = checked;
        // setSelectedItems((prev) => {
        const newItems = selectedItemsRef.current ? [...selectedItemsRef.current] : [];
        const index = newItems.findIndex((item) => item[idField] === row.data[idField]);
        if (checked && index === -1) {
            newItems.push(row.data);
        }
        if (!checked && index !== -1) {
            newItems.splice(index, 1);
        }
        onSelectionChange && onSelectionChange(newItems);
        selectedItemsRef.current = newItems;
        // });
    };
    useEffect(() => {
        const headers = colDefs.map((col) => {
            const sortItem = gridSorts.find((item) => item.field === col.field);
            const sort = sortItem ? sortItem.sort : "none";
            return {
                col: col,
                sort: sort,
            };
        });
        setColHeaders(headers);
    }, [gridSorts, colDefs]);
    useEffect(() => {
        loadGrid(undefined, selectedItemsRef.current);
    }, [loadGrid]);
    useEffect(() => {
        setPageSize(defaultPageSize);
    }, [defaultPageSize]);
    useImperativeHandle(ref, () => ({
        refresh() {
            loadGrid();
        },
        getSelection() {
            return selectedItemsRef.current || [];
        }
    }));
    {
        return (_jsxs("div", { className: "border border-gray-300", children: [_jsx("div", { className: "overflow-x-auto w-full", children: _jsx("div", { children: _jsxs(Table, { hoverable: true, className: "text-right", children: [_jsxs(Table.Head, { children: [selectable && (_jsx(Table.HeadCell, { className: "w-5 px-3 pl-0" })), colHeaders.map((header, index) => (_jsx(Table.HeadCell, { children: _jsx(GridHeaderComponent, { colHeader: header, onSortChange: onSortChange }) }, index))), rowActions && _jsx(Table.HeadCell, { children: "\u0639\u0645\u0644\u06CC\u0627\u062A" })] }), _jsxs(Table.Body, { className: "divide-y", children: [isPending && (_jsx(Table.Row, { children: _jsx(Table.Cell, { colSpan: colDefs.length + Number(Boolean(rowActions)), children: _jsx("div", { className: "flex justify-center py-12", children: _jsx(KSpinner, { color: "blue", size: 28 }) }) }) })), !isPending &&
                                            gridRows.map((row, index) => (_jsx(GridRow, { row: row, theme: theme, selectable: selectable, onSelectedChange: onRowSelectedChange, rowActions: rowActions, onEditRow: onEditRow, onRemoveRow: onRemoveRow, onRowDobuleClick: onDoubleClick ? onRowDobuleClick : undefined }, index)))] })] }) }) }), !!pageCount && pageCount > 1 && (_jsx(ReactPaginate, { breakLabel: "...", forcePage: selectedPage, nextLabel: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "w-5 h-5", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15.75 19.5L8.25 12l7.5-7.5" }) }), onPageChange: handlePageClick, pageRangeDisplayed: 3, pageCount: pageCount, previousLabel: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "w-5 h-5", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M8.25 4.5l7.5 7.5-7.5 7.5" }) }), renderOnZeroPageCount: null, containerClassName: "flex gap-5  justify-end bg-gray-50 py-2 pl-4", nextClassName: "flex items-center", previousClassName: "flex items-center", pageLinkClassName: "p-1 block hover:text-cyan-400 transition-all ease-linear duration-75", nextLinkClassName: "p-1 block hover:text-cyan-400 transition-all ease-linear duration-75", previousLinkClassName: "p-1 block hover:text-cyan-400 transition-all ease-linear duration-75", breakClassName: "p-1 block hover:text-cyan-400", activeClassName: "text-cyan-500", pageClassName: "text-base " }))] }));
    }
}
const Grid = forwardRef(MainGrid);
export default Grid;
