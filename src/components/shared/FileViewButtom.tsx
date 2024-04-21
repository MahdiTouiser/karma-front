import { useState } from "react";
import SDModal from "./Modal/Modal";
import FileViewer from "./FileViewer";

const FileViewButton: React.FC<{ fileId: string; alt?: string }> = ({
  fileId,
  alt = "",
}) => {
  const [showView, setShowView] = useState<boolean>(false);
  return (
    <>
      <SDModal show={showView} onClose={() => setShowView(false)} containerClass="!p-3">
        <FileViewer fileId={fileId} alt={alt} />
      </SDModal>
      <button className="text-cyan-600" onClick={() => setShowView(true)}>
        مشاهده
      </button>
    </>
  );
};

export default FileViewButton;
