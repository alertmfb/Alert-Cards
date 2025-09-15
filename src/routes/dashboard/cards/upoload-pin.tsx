import { Button, DocumentUpload } from "@/components";

const UploadPin = () => {
  const isPending = false;
  const handleVerify = () => {};
  return (
    <div className="p-4 flex flex-col gap-10">
      <DocumentUpload title="Upload File" />

      <Button
        size="sm"
        onClick={handleVerify}
        disabled={isPending}
        className="text-xs"
      >
        {isPending ? "Uploading..." : "Upload File"}
      </Button>
    </div>
  );
};

export default UploadPin;
