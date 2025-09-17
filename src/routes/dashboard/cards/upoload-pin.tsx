import { Button, DocumentUpload } from "@/components";
import { useUploadPin } from "@/hooks";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const UploadPin = () => {
  const [uploadedPin, setUploadedPin] = useState<File | null>(null);
  const { mutate, isSuccess, isPending } = useUploadPin();
  const handleVerify = () => {
    if (!uploadedPin) {
      toast.error("Please upload a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", uploadedPin);

    console.log(formData);

    mutate(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      setUploadedPin(null);
    }
  }, [isSuccess]);
  return (
    <div className="p-4 flex flex-col gap-10">
      <DocumentUpload
        title="Upload File"
        setUploadedFile={setUploadedPin}
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      />

      <Button
        size="sm"
        onClick={handleVerify}
        disabled={isPending}
        className="text-xs cursor-pointer"
      >
        {isPending ? "Uploading..." : "Upload File"}
      </Button>
    </div>
  );
};

export default UploadPin;
