const NotifBadge: React.FC<{ value?: number; className?: string }> = ({
  value,
  className = '',
}) => {
  return (
    <div
      className={`${className} bg-red-500 text-white rounded-full w-5 h-5 text-sm flex items-center justify-center  shadow`}
    >
      {value}
    </div>
  );
};

export default NotifBadge;
