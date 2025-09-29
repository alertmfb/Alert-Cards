// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "components/ui/card";
// import { Label } from "@/components/ui/label";
// import { Button } from "components/ui/button";
// import { CloudUpload } from "lucide-react";

// export function DocumentUpload() {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Customer Request Document</CardTitle>
//         <CardDescription className="text-sm text-muted-foreground">
//           Upload a document for the customer’s request.
//         </CardDescription>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         <div className="border border-dashed rounded-lg p-6 text-center cursor-pointer transition hover:bg-muted/50">
//           <div className="flex flex-col items-center justify-center space-y-2">
//             <CloudUpload className="w-10 h-10 text-muted-foreground" />
//             <p className="text-sm text-muted-foreground">
//               Drag and drop file here or
//             </p>
//             <Button size="sm">Browse Files</Button>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

// components/DocumentUpload.tsx
import { useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CloudUpload, File, X } from "lucide-react";
import { useCardRequestStore } from "@/store/slices/cardRequestStore";
import { toast } from "sonner";

interface DocumentProps {
  title?: string;
  request?: boolean;
  setUploadedFile?: any;
  accept?: string;
}
export function DocumentUpload({
  title = "Supporting Documents",
  request,
  setUploadedFile,
  accept = ".jpg,.jpeg,.png,.pdf",
}: DocumentProps) {
  const { draft, addDocument, removeDocument } = useCardRequestStore();
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<null | File>(null);
  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    Array.from(files).forEach((file) => {
      // Validate file type and size
      const maxSize = 5 * 1024 * 1024; // 5MB
      const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
      const excelAllowedTypes = ["text/csv"];

      if (request) {
        if (!allowedTypes.includes(file.type)) {
          toast.error(
            `${file.name}: Only JPEG, PNG, and PDF files are allowed`
          );
          return;
        }
      } else {
        if (!excelAllowedTypes.includes(file.type)) {
          toast.error(`${file.name}: Only CSV files are allowed`);
          return;
        }
      }

      if (file.size > maxSize) {
        toast.error(`${file.name}: File size must be less than 5MB`);
        return;
      }

      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result as string;
        setUploadedFile(base64String);
      };

      setSelectedFile(file);
      setUploadedFile(file);
      file;
      if (request) {
        addDocument(file);
      }
      toast.success(`${file.name} uploaded successfully`);
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleRemoveDocument = (index: number) => {
    toast.success("Document removed");
    // TODO: Implement remove document functionality in store
    removeDocument(index);
    setSelectedFile(null);
    setUploadedFile(null);
  };
  console.log(selectedFile);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <File className="h-5 w-5" />
          {title}
        </CardTitle>
        <CardDescription>
          Upload supporting documents for the card request (Max 5MB per file)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Upload Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
            isDragOver
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="flex flex-col items-center justify-center space-y-3">
            <CloudUpload
              className={`w-12 h-12 ${
                isDragOver ? "text-primary" : "text-muted-foreground"
              }`}
            />
            <div className="space-y-1">
              <p className="text-sm font-medium">
                {isDragOver ? "Drop files here" : "Drag and drop files here"}
              </p>
              <p className="text-xs text-muted-foreground">
                or click to browse files (JPEG, PNG, PDF)
              </p>
            </div>
            <Button size="sm" variant="outline">
              Browse Files
            </Button>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={accept}
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />

        {/* Uploaded Files */}
        {draft.documents.length > 0 ? (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">
              Uploaded Documents ({draft.documents.length})
            </h4>
            <div className="space-y-2">
              {draft.documents.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border"
                >
                  <div className="flex items-center gap-3">
                    <File className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveDocument(index);
                    }}
                    className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                    sdd
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {selectedFile !== null ? (
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Uploaded Document</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <File className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">
                          {selectedFile?.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {(selectedFile?.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFile(null);
                        setUploadedFile(null);
                      }}
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ) : null}
          </>
        )}
      </CardContent>
    </Card>
  );
}
