const KCard: React.FC<{ children: React.ReactNode, className?: string }> = (props) => {
  return (
    <div className={`${props.className || ''} block p-6 bg-white rounded-lg shadow-md dark:bg-gray-800`}>
      {props.children}
    </div>
  );
};
export default KCard;
