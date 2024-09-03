import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import KCard from "../../components/shared/Card";
import KSpinner from "../../components/shared/Spinner";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { fetchMessages } from "../../store/messages";
const Messages = () => {
    const pageSize = 10;
    const messagesState = useAppSelector((state) => state.messages);
    const dispatch = useAppDispatch();
    const [pageCount, setPageCount] = useState();
    useEffect(() => {
        setPageCount(Math.ceil(messagesState.total / pageSize));
    }, [messagesState]);
    const handlePageClick = (event) => {
        dispatch(fetchMessages({ pageIndex: event.selected + 1, pageSize: pageSize }));
    };
    const loading = (_jsx("div", { className: "flex justify-center pt-6 w-full", children: _jsx(KSpinner, { size: 20 }) }));
    const body = (_jsx(_Fragment, {}));
    return (_jsx(KCard, { className: "border flex flex-col mb-6 px-12 !border-red", children: _jsxs("div", { className: "flex justify-center flex-wrap", children: [messagesState.isLoading && loading, messagesState.messages.length > 0 && !messagesState.isLoading && body, !!pageCount && pageCount > 1 && (_jsx(ReactPaginate, { breakLabel: "...", nextLabel: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "w-5 h-5", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15.75 19.5L8.25 12l7.5-7.5" }) }), onPageChange: handlePageClick, pageRangeDisplayed: 5, pageCount: pageCount, previousLabel: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "w-5 h-5", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M8.25 4.5l7.5 7.5-7.5 7.5" }) }), renderOnZeroPageCount: null, containerClassName: "flex gap-5  justify-center w-full", nextClassName: "flex items-center", previousClassName: "flex items-center", pageLinkClassName: "p-1 block hover:text-primary-400 transition-all ease-linear duration-75", nextLinkClassName: "p-1 block hover:text-primary-400 transition-all ease-linear duration-75", previousLinkClassName: "p-1 block hover:text-primary-400 transition-all ease-linear duration-75", breakClassName: "p-1 block hover:text-primary-400", activeClassName: "text-primary-500", pageClassName: "text-base " }))] }) }));
};
export default Messages;
