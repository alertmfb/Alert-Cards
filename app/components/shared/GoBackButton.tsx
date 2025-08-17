import { Button } from "~/components/ui/button";
import { Undo2 } from "lucide-react";
import { useNavigate } from "react-router";

const GoBackButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      variant="ghost"
      className="underline text-blue-500 flex items-center gap-1"
      onClick={() => navigate(-1)}
    >
      <Undo2 className="w-4 h-4" /> Go Back
    </Button>
  );
};

export default GoBackButton;
