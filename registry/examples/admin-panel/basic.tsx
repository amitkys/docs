"use client";

import { AdminPanelLayout } from "@/components/admin-panel/admin-panel-layout";
import { ContentLayout } from "@/components/admin-panel/content-layout";

export default function AdminPanelDemo() {
  return (
    <div className="relative w-full h-[540px] rounded-lg border overflow-hidden bg-background shadow-sm">
      <AdminPanelLayout isEmbedded>
        <ContentLayout title="Dashboard Overview">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">$45,231.89</p>
              </div>
              <div className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
                <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold">+2,350</p>
              </div>
              <div className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
                <p className="text-sm font-medium text-muted-foreground">Sales</p>
                <p className="text-2xl font-bold">+12,234</p>
              </div>
            </div>
            <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
              <h3 className="font-semibold text-lg mb-2">Welcome to your Admin Panel</h3>
              <p className="text-sm text-muted-foreground">
                This is a live preview of the complete modular Admin Panel system from shadcn-ui-sidebar. Test sidebar collapse toggle, navigation dropdown menus, user profile dropdown, and theme switcher in the navbar!
              </p>
            </div>
          </div>
        </ContentLayout>
      </AdminPanelLayout>
    </div>
  );
}
