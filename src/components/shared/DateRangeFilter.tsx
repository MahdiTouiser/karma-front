import KDatepicker from "./DatePicker";
interface DateRangeFilterProps {
  label: string;
  fromDate: string;
  toDate: string;
  onChangeFromDate: (value: string) => void;
  onChangeToDate: (value: string) => void;
}
const DateRangeFilter: React.FC<DateRangeFilterProps> = (props) => {
  return (
    <div className="flex items-center flex-wrap pb-2">
      <p className="pl-4 text-sm"> {props.label}: </p>

      <div className="flex">
        <KDatepicker
          name="expireDate"
          required={true}
          placeholder="از :"
          onOpenPickNewDate={false}
          value={props.fromDate}
          onChange={props.onChangeFromDate}
        ></KDatepicker>
        <KDatepicker
          containerClassName="mr-1"
          name="expireDate"
          required={true}
          placeholder="تا :"
          onOpenPickNewDate={false}
          value={props.toDate}
          onChange={props.onChangeToDate}
        ></KDatepicker>
      </div>
    </div>
  );
};

export default DateRangeFilter;
