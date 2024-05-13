import { useEffect, useState } from "react";
import pdfIcon from "../../assets/pdf-icon.jpg";
import { axiosIntance } from "../../hooks/useApi";
import KSpinner from "./Spinner";

const FileViewer: React.FC<{ fileId: string; alt?: string }> = ({
  fileId,
  alt = "",
}) => {
  const imageLink = fileId
    ? `${import.meta.env.VITE_BASE_API_URL}/file/${fileId}`
    : "";
  const [fileContent, setFileContent] = useState<string | undefined>();
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isImage, setIsImage] = useState<boolean>(false);
  useEffect(() => {
    const fetchFile = async (address: string) => {
      setIsPending(true);
      try {
        const response = await axiosIntance.get(address, {
          responseType: "blob",
        });
        const blob = response.data;

        const contentType = response.headers["content-type"];
        const isImage = contentType?.startsWith("image/") ?? false;
        setIsImage(isImage);
        if (isImage) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setFileContent(reader.result as string);
          };
          reader.readAsDataURL(blob);
        } else {
          setFileContent(pdfIcon);
        }
      } catch (error) {
        console.error("Error fetching file:", error);
      } finally {
        setIsPending(false);
      }
    };
    if (fileId) {
      fetchFile(imageLink);
    }
  }, [fileId, imageLink]);
  return (
    <>
      <a href={imageLink} target="_blank" className="block relative">
        {isPending ? (
          <KSpinner color="blue" size={10} />
        ) : (
          <>
            <img
              src={fileContent}
              alt={alt}
              className={isImage ? "" : "w-36 opacity-50"}
            />
            {!isImage && (
              <p className="absolute top-1/2 w-full text-center -translate-y-1/2 font-bold text-xl text-blue-950">
                دانلود
              </p>
            )}
          </>
        )}
      </a>
    </>
  );
};

export default FileViewer;
