import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FaSortUp, FaSortDown, FaSort } from "react-icons/fa";
const GridHeaderComponent = ({ colHeader: { col, sort }, onSortChange, }) => {
    const handleSortChange = () => {
        let nextState = "none";
        if (sort === "none") {
            nextState = "asc";
        }
        if (sort === "asc") {
            nextState = "desc";
        }
        onSortChange({ field: col.field, sort: nextState });
        return nextState;
    };
    return (_jsxs("div", { className: "flex items-center", children: [col.headerName, col.sortable && (_jsxs("button", { className: "flex mr-1", onClick: handleSortChange, children: [sort === "none" && _jsx(FaSort, { size: "0.9rem" }), sort === "asc" && (_jsx(FaSortUp, { size: "0.9rem", color: "rgb(6 182 212)" })), sort === "desc" && (_jsx(FaSortDown, { size: "0.9rem", color: "rgb(6 182 212)" }))] }))] }));
};
export default GridHeaderComponent;
