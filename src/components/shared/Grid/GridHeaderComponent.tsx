import {  ColHeader, ColSortChangeEvent, SortStateType } from "./grid.types";
import { FaSortUp, FaSortDown, FaSort } from "react-icons/fa";

interface GridHeaderProps {
  colHeader: ColHeader;
  onSortChange: (event: ColSortChangeEvent) => void;
}

const GridHeaderComponent: React.FC<GridHeaderProps> = ({
  colHeader:{col,sort},
  onSortChange,
}) => {
  const handleSortChange: React.MouseEventHandler<HTMLButtonElement> = () => {
    let nextState: SortStateType = "none";
    if (sort === "none") {
      nextState = "asc";
    }
    if (sort === "asc") {
      nextState = "desc";
    }
    onSortChange({ field: col.field, sort: nextState });
    return nextState;
  };
  return (
    <div className="flex items-center">
      {col.headerName}
      {col.sortable && (
        <button className="flex mr-1" onClick={handleSortChange}>
          {sort === "none" && <FaSort size="0.9rem" />}
          {sort === "asc" && (
            <FaSortUp size="0.9rem" color="rgb(6 182 212)" />
          )}
          {sort === "desc" && (
            <FaSortDown size="0.9rem" color="rgb(6 182 212)" />
          )}
        </button>
      )}
    </div>
  );
};

export default GridHeaderComponent;
