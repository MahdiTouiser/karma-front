import { FormEvent, useState } from "react";
import useApi from "../../hooks/useApi";
import KSpinner from "./Spinner";

interface LabeledFileInputProps {
  acceptFiles?: string;
  title: string;
  field?: string;
  url?: string;
  onUpload: (id: string) => void;
  onRemove?: () => void;
  disabled?: boolean;
  maxSize?: number;
}
const LabeledFileInput: React.FC<LabeledFileInputProps> = ({
  acceptFiles = "",
  title,
  field = "file",
  url = "/file",
  onUpload,
  onRemove,
  disabled = false,
  maxSize,
}) => {
  const { sendRequest, isPending } = useApi<FormData, string>();
  const [uploadedFile, setUploadedFile] = useState<File | null>();
  const [error, setError] = useState<string>("");
  function onChange(event: FormEvent) {
    setError("");
    const files = (event.target as HTMLInputElement).files;
    if (!files || !files.length) {
      return;
    }
    const file: File = files[0];
    if (maxSize !== undefined && file.size > maxSize * 1024) {
      setError(`حداکثر سایز فایل ${maxSize}KB است.`);
      return;
    }
    const formData = new FormData();
    formData.append(field, file);
    if (!maxSize) {
      formData.append("ignoreFileSizeLimitation", "true");
    }
    sendRequest(
      {
        url: url,
        data: formData,
        method: "post",
      },
      (response) => {
        setUploadedFile(file);
        onUpload(response);
      },
      (error) => {
        setError(error?.message || "خطا در بارگذاری");
      }
    );
  }

  function resetUploadedFile() {
    setUploadedFile(null);
    onRemove && onRemove();
  }

  return (
    <div>
      {!(isPending || uploadedFile) && (
        <label
          htmlFor={title}
          className={`text-blue-700 font-semibold ${disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer"
            }`}
        >
          بارگذاری فایل
        </label>
      )}
      {isPending && <KSpinner size={8}></KSpinner>}
      {error && <p className="text-red-600">{error}</p>}
      {uploadedFile && (
        <span className="flex">
          <button
            className="text-red-600 ml-2 block translate-y-[2px]"
            onClick={resetUploadedFile}
          >
            X
          </button>
          <a
            className="text-blue-700 inline-block max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap ltr"
            href={URL.createObjectURL(uploadedFile)}
            download={uploadedFile.name}
          >
            {uploadedFile.name}
          </a>
        </span>
      )}
      <input
        type="file"
        id={title}
        className="hidden"
        accept={acceptFiles}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
};

export default LabeledFileInput;
