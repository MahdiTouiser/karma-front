import { Table } from "flowbite-react";
import { useCallback, useState } from "react";
import SDTooltip from "../Tooltip";
import GridRowOtherActionComponent from "./GridOtherRowActionComponent";
import GridRowMoreActionComponent from "./GridRowMoreActionsComponent";
import { GridRowActions, GridRowModel } from "./grid.types";

interface GridRowProps<T> {
  row: GridRowModel<T>;
  onRowDobuleClisk?: (item: T) => void;
  rowActions: GridRowActions<T> | null;
  onEditRow?: (item: T) => void;
  onRemoveRow?: (item: T) => void;
  selectable?: boolean;
  onSelectedChange?: (row: GridRowModel<T>, selected: boolean) => void;
  theme?: "primary2" | "primary2";
}

function GridRow<T>({
  onRowDobuleClisk,
  row,
  rowActions,
  onEditRow,
  onRemoveRow,
  selectable = false,
  onSelectedChange,
  theme = "primary2",
}: GridRowProps<T>) {
  const [lastTouched, setLastTouched] = useState<number>(0);
  const handleTouchEnd = useCallback(
    (e: React.TouchEvent, row: GridRowModel<T>) => {
      e.stopPropagation();
      // e.preventDefault();
      if (!onRowDobuleClisk) {
        return;
      }
      const currentTime = new Date().getTime();
      const tapLength = currentTime - lastTouched;
      setLastTouched(currentTime);

      if (tapLength < 300 && tapLength > 0) {
        e.preventDefault();
        onRowDobuleClisk(row.data);
      }
    },
    [lastTouched, onRowDobuleClisk],
  );

  return (
    <Table.Row
      onDoubleClick={(event) => {
        event.stopPropagation();
        onRowDobuleClisk && onRowDobuleClisk(row.data);
      }}
      onTouchEnd={(e) => {
        handleTouchEnd(e, row);
      }}
      className={`${onRowDobuleClisk && "!cursor-pointer"
        } bg-white dark:border-gray-700 dark:bg-gray-800`}
    >
      {selectable && (
        <Table.Cell className="w-5 px-3 pl-0">
          <input
            type="checkbox"
            className={`ml-3 h-5 w-5 text-${theme}-500 rounded border-gray-300 bg-gray-100 focus:ring-${theme}-500 focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600`}
            checked={row.isSelected}
            onChange={(event) => {
              onSelectedChange && onSelectedChange(row, event.target.checked);
            }}
          />
        </Table.Cell>
      )}
      {row.cells.map((cell, index) => (
        <Table.Cell
          className="whitespace-nowrap font-medium text-gray-900 dark:text-white"
          key={index}
        >
          {cell}
        </Table.Cell>
      ))}
      {rowActions && (
        <Table.Cell>
          <div className="flex items-center gap-4">
            {rowActions.edit && (
              <SDTooltip content="ویرایش" trigger="hover" placement="bottom">
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    onEditRow && onEditRow(row.data);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6 text-cyan-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                </button>
              </SDTooltip>
            )}
            {rowActions.remove && (
              <SDTooltip
                content="حذف"
                trigger="hover"
                placement="bottom"
                className="flex"
              >
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    onRemoveRow && onRemoveRow(row.data);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6 text-red-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </SDTooltip>
            )}
            {rowActions.otherActions &&
              rowActions.otherActions.map((action, index) => {
                return (
                  <GridRowOtherActionComponent
                    key={index}
                    action={action}
                    row={row}
                  />
                );
              })}
            {rowActions.moreActions && rowActions.moreActions.length > 0 && (
              <GridRowMoreActionComponent
                actions={rowActions.moreActions}
                row={row}
              />
            )}
          </div>
        </Table.Cell>
      )}
    </Table.Row>
  );
}

export default GridRow;
