import { jsx as _jsx } from "react/jsx-runtime";
export class GridRowModel {
    constructor(data, colDefs) {
        Object.defineProperty(this, "data", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_cells", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "_isSelected", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "_colDefs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.data = data;
        this._colDefs = colDefs;
        colDefs.forEach((col) => {
            let cell;
            if (col.field) {
                cell =
                    col.field === 'amount'
                        ? this.formatAmount(data)
                        : this.data[col.field];
            }
            if (col.template) {
                cell = col.template;
            }
            if (col.onClick) {
                cell = (_jsx("button", { type: "button", onClick: () => col.onClick && col.onClick(this.data), className: "font-medium text-cyan-600 dark:text-cyan-500", children: cell }));
            }
            if (col.cellRenderer) {
                cell = col.cellRenderer(data);
            }
            this._cells.push(cell);
        });
    }
    formatAmount(data) {
        const amount = data['amount'];
        if (typeof amount === 'number') {
            return amount.toLocaleString(); // Format as a thousand separator
        }
        return amount;
    }
    get cells() {
        return [...this._cells];
    }
    set isSelected(select) {
        this._isSelected = select;
    }
    get isSelected() {
        return this._isSelected;
    }
    copyRow() {
        return new GridRowModel(this.data, this._colDefs);
    }
}
