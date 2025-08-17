import React, { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Upload, Trash2 } from "lucide-react";

interface ChangeAvatarProps {
  name: string;
}

const ChangeAvatar: React.FC<ChangeAvatarProps> = ({ name }) => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = () => {
    setAvatarUrl(null);
  };

  return (
    <div className="flex items-center gap-4">
      <Avatar className="h-20 w-20 border">
        <AvatarImage src={avatarUrl || ""} alt={name} />
        <AvatarFallback className="text-xl">{initials}</AvatarFallback>
      </Avatar>

      <div className="flex flex-col gap-2">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={handleUploadClick}
            className="gap-2"
          >
            <Upload className="h-4 w-4" />
            Upload
          </Button>

          <Button
            variant="destructive"
            onClick={handleDelete}
            className="gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChangeAvatar;
