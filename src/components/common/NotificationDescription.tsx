import { useUpdateNotification } from "@/hooks";
import { formatDistanceToNow } from "date-fns";
import { useState, useRef, useEffect } from "react";

const NotificationDescription = ({
  description,
  lineClamp = "line-clamp-1",
  readAt,
  createdAt,
  noticationId,
}: {
  description: string;
  lineClamp?: string;
  readAt?: string | null;
  createdAt?: string;
  noticationId?: string;
}) => {
  const [expanded, setExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const { mutate, isSuccess } = useUpdateNotification();
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (el) {
      const isClamped = el.scrollHeight > el.clientHeight + 2;
      setIsOverflowing(isClamped);
    }
  }, [description]);

  const handleReadMore = () => {
    if (readAt === null) {
      mutate(noticationId as string);
    } else {
      setExpanded((prev) => !prev);
    }
  };

  useEffect(() => {
    if (readAt === null) {
      if (isSuccess) {
        setExpanded((prev) => !prev);
      }
    }
  }, [isSuccess]);

  return (
    <div>
      <div
        ref={textRef}
        className={`text-xs ${
          readAt === null ? "text-foreground/90" : "text-foreground/30"
        }  mb-1 transition-all ${!expanded ? `${lineClamp}` : ""}`}
        dangerouslySetInnerHTML={{ __html: description }}
      />
      <div className="flex w-full text-xs justify-between items-center">
        {isOverflowing && (
          <button
            type="button"
            onClick={handleReadMore}
            className="text-xs text-primary font-medium mt-1"
          >
            {expanded ? "See less" : "See more"}
          </button>
        )}
        <p className="text-[10px] text-red-500">
          {formatDistanceToNow(new Date(createdAt as string), {
            addSuffix: true,
          })}
        </p>
      </div>
    </div>
  );
};

export default NotificationDescription;
