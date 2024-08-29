const KModalBody: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="max-h-[80vh] overflow-auto">
      {children}
    </div>
  );
};

export default KModalBody;