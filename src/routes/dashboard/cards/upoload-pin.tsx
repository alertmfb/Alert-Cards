import { Button, DocumentUpload } from "@/components";
import { useState } from "react";

const UploadPin = () => {
  const [uploadedPin, setUploadedPin] = useState<File | null>();
  const isPending = false;
  const handleVerify = () => {
    const formData = new FormData();
    console.log(uploadedPin);
    formData.append("file", uploadedPin as File);

    console.log(formData);
  };

  return (
    <div className="p-4 flex flex-col gap-10">
      <DocumentUpload title="Upload File" setUploadedFile={setUploadedPin} />

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
