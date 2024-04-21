import SDDropdown, { DropDownItem } from "../Dropdown";
import { GridRowModel, GridRowOtherAction } from "./grid.types";
import { useState, useEffect } from "react";

function GridRowMoreActionComponent<T>(props: {
  actions: GridRowOtherAction<T>[];
  row: GridRowModel<T>;
}) {
  const [item, setItems] = useState<DropDownItem[]>([]);

  useEffect(() => {
    function getDisabled(action: GridRowOtherAction<T>, row: GridRowModel<T>) {
      let mustDisable = false;

      if (action.disableField !== undefined) {
        let field = action.disableField;
        const invert = field.includes("!");
        if (invert) {
          field = field.slice(1);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          mustDisable = (row.data as any)[field];
        } else {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          mustDisable = !(row.data as any)[field];
        }
      }
      return mustDisable;
    }

    const items: DropDownItem[] = props.actions
      .filter((action) => {
        let mustShow = true;
        if (action.showField !== undefined) {
          let field = action.showField;
          const invert = field.includes("!");
          if (invert) {
            field = field.slice(1);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            mustShow = !(props.row.data as any)[action.showField];
          } else {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            mustShow = !!(props.row.data as any)[action.showField];
          }
        }
        return mustShow;
      })
      .map((action) => {
        const disabled = getDisabled(action, props.row)
        return {
          title: action.descriptions,
          mode: "Button",
          onClick: () => {
            // event.stopPropagation();
            action.onClick(props.row.data);
          },
          icon: action.icon,
          disabled: disabled
        };
      });
    setItems(items);
  }, [props.actions, props.row]);

  return (
    <SDDropdown buttonClassName="!p-0 !h-auto" withChevron={false} items={item}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
        />
      </svg>
    </SDDropdown>
  );
}

export default GridRowMoreActionComponent;
