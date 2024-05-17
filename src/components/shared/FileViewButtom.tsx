import { useState } from "react";
import FileViewer from "./FileViewer";
import KModal from "./Modal/Modal";

const FileViewButton: React.FC<{ fileId: string; alt?: string }> = ({
  fileId,
  alt = "",
}) => {
  const [showView, setShowView] = useState<boolean>(false);
  return (
    <>
      <KModal show={showView} onClose={() => setShowView(false)} containerClass="!p-3">
        <FileViewer fileId={fileId} alt={alt} />
      </KModal>
      <button className="text-cyan-600" onClick={() => setShowView(true)}>
        مشاهده
      </button>
    </>
  );
};

export default FileViewButton;
