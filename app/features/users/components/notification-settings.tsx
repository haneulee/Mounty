import { Card, CardContent, CardHeader } from "~/common/components/ui/card";

import { Button } from "~/common/components/ui/button";
import { Separator } from "~/common/components/ui/separator";

export function NotificationSettings() {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold">Notification Settings</h2>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-medium">Email Notifications</h3>
              <p className="text-sm text-muted-foreground">
                Receive email notifications for new followers and comments
              </p>
            </div>
            <Button variant="outline" className="w-full sm:w-auto">
              Enable
            </Button>
          </div>
          <Separator />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-medium">Push Notifications</h3>
              <p className="text-sm text-muted-foreground">
                Receive push notifications for new messages and mentions
              </p>
            </div>
            <Button variant="outline" className="w-full sm:w-auto">
              Enable
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
