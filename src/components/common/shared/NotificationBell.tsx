import { useState } from "react";
import { Bell } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { useGetNotifications } from "@/hooks";
import type { Notification } from "@/types";
import NotificationDescription from "../NotificationDescription";

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const { data } = useGetNotifications();
  const unreadCount = data?.data?.filter((n) => n.readAt === null)?.length;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="relative p-2 rounded-full bg-muted hover:bg-muted/80 shadow transition-colors cursor-pointer">
          <Bell className="w-5 h-5 text-primary" />
          {(unreadCount as number) > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-background" />
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-[380px] p-0">
        <div className="border-b px-4 py-3 text-sm font-medium">
          Notifications
        </div>

        <Tabs defaultValue="all" className="w-full px-2 py-4">
          <TabsList className="flex px-4 gap-2">
            <TabsTrigger value="all" className="flex-1 justify-between">
              All <Badge variant="outline">{data?.data?.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="unread" className="flex-1 justify-between">
              Unread <Badge variant="destructive">{unreadCount}</Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <ScrollArea className="h-64">
              {data?.data.map((notif: Notification) => (
                <Card
                  key={notif.id}
                  className="rounded-none border-0 border-b last:border-0 cursor-pointer"
                >
                  <CardContent className="px-2 py-2 space-y-1">
                    <p className="text-sm font-medium text-foreground/90">
                      {notif.title}
                    </p>
                    <p className="text-sm text-muted-foreground leading-snug">
                      <NotificationDescription
                        description={notif.message}
                        lineClamp="line-clamp-1"
                        readAt={notif.readAt as string}
                        createdAt={notif.createdAt as string}
                        noticationId={notif.id}
                      />
                    </p>
                    {/* <p className="text-xs text-red-500">
                      {formatDistanceToNow(new Date(notif.readAt as string), {
                        addSuffix: true,
                      })}
                    </p> */}
                  </CardContent>
                </Card>
              ))}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="unread">
            <ScrollArea className="h-64">
              {unreadCount ? (
                data?.data
                  .filter((n) => n.readAt === null)
                  .map((notif: Notification) => (
                    <Card
                      key={notif.id}
                      className="rounded-none border-0 border-b last:border-0 cursor-pointer"
                    >
                      <CardContent className="px-4 py-4 space-y-1">
                        <p className="text-sm font-medium text-foreground/90">
                          {notif.title}
                        </p>
                        <p className="text-sm text-muted-foreground leading-snug">
                          <NotificationDescription
                            description={notif.message}
                            lineClamp="line-clamp-1"
                            readAt={notif.readAt as string}
                            createdAt={notif.createdAt as string}
                            noticationId={notif.id}
                          />
                        </p>
                        {/* <p className="text-xs text-red-500">
                          {formatDistanceToNow(
                            new Date(notif.readAt as string),
                            {
                              addSuffix: true,
                            }
                          )}
                        </p> */}
                      </CardContent>
                    </Card>
                  ))
              ) : (
                <p className="px-4 py-12 text-center text-sm text-muted-foreground">
                  No unread notifications
                </p>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}
