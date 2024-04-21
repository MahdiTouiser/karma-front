/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ColDef<T = any> {
  field: string;
  headerName: string;
  sortable?: boolean;
  onClick?: (item: T) => void;
  template?: React.ReactNode | string;
  cellRenderer?: (item: T) => React.ReactNode | string;
}



export type SortStateType = "asc" | "desc" | "none";
export interface ColHeader {
  col: ColDef;
  sort: SortStateType;
}
export class GridRowModel<T = any> {
  data: T;
  private _cells: (React.ReactNode | string)[] = [];
  private _isSelected = false;
  private _colDefs : ColDef[];

  constructor(data: T, colDefs: ColDef[]) {
    this.data = data;
    this._colDefs = colDefs;
    colDefs.forEach((col) => {
      let cell: React.ReactNode | string;
      if (col.field) {
        cell =
          col.field === 'amount'
            ? this.formatAmount(data)
            : (this.data as any)[col.field];
      }
      if (col.template) {
        cell = col.template;
      }
      if (col.onClick) {
        cell = (
          <button
            type="button"
            onClick={() => col.onClick && col.onClick(this.data)}
            className="font-medium text-cyan-600 dark:text-cyan-500"
          >
            {cell}
          </button>
        );
      }
      if (col.cellRenderer) {
        cell = col.cellRenderer(data);
      }
      this._cells.push(cell);
    });
  }

  private formatAmount(data: T): string | number {
    const amount = (data as any)['amount'];
    if (typeof amount === 'number') {
      return amount.toLocaleString(); // Format as a thousand separator
    }
    return amount;
  }

  get cells() {
    return [...this._cells];
  }

  set isSelected(select: boolean) {
    this._isSelected = select;
  }

  get isSelected() {
    return this._isSelected;
  }

  copyRow():GridRowModel<T>{
    return new GridRowModel(this.data,this._colDefs)
  }

  //   get rowData() {
  //     return this._rowData;
  //   }
}

export interface GridRowActions<T> {
  edit?: boolean;
  remove?: boolean;
  otherActions?: GridRowOtherAction<T>[];
  moreActions?: GridRowOtherAction<T>[];
}



export interface GridRowActions<T>{
    edit?: boolean,
    remove?: boolean,
    otherActions?: GridRowOtherAction<T>[],
    moreActions?:GridRowOtherAction<T>[]
}

export interface GridRowOtherAction<T> {
  icon: React.ReactNode;
  descriptions: string;
  showField?: string;
  disableField?: string;
  onClick: (item: T) => void;
}

export interface ColSortChangeEvent {
  field: string;
  sort: SortStateType;
}

export interface GridSortItem {
  field: string;
  sort: SortStateType;
}

export interface GridParams {
  pageIndex: number;
  pageSize: number;
  sorts: GridSortItem[];
}

export type GridGetData<T> = (
  gridParams: GridParams,
  setRows: (items: T[], total?: number) => void,
  fail: (error: unknown) => void
) => void;

export interface GridRef<T=any> {
  refresh: () => void;
  getSelection:()=>T[]
}
