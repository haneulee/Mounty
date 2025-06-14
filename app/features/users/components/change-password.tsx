import { Card, CardContent, CardHeader } from "~/common/components/ui/card";

import { Button } from "~/common/components/ui/button";
import { Input } from "~/common/components/ui/input";

export function ChangePassword() {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold">Change Password</h2>
      </CardHeader>
      <CardContent>
        <form className="space-y-4 sm:space-y-6">
          <div className="space-y-2">
            <label htmlFor="currentPassword" className="text-sm font-medium">
              Current Password
            </label>
            <Input
              id="currentPassword"
              name="currentPassword"
              type="password"
              required
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="newPassword" className="text-sm font-medium">
              New Password
            </label>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              required
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium">
              Confirm New Password
            </label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              className="w-full"
            />
          </div>

          <Button type="submit" className="w-full">
            Change Password
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
