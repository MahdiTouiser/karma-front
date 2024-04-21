interface SkydiveEventFieldProp {
  title: string;
  value: string;
}

const SkydiveEventField: React.FC<SkydiveEventFieldProp> = ({ title, value }) => {
  return (
    <div className="flex gap-6">
      <p className="font-bold">{title}</p>
      <p>{value}</p>
    </div>
  );
};


export default SkydiveEventField