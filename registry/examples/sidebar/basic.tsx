import { Sidebar } from "@/registry/items/sidebar";

export default function SidebarBasicDemo() {
  return (
    <div className="relative flex w-full h-[520px] rounded-lg border overflow-hidden bg-background">
      <Sidebar isEmbedded className="h-full" />
      <div className="flex-1 p-6 overflow-auto">
        <h2 className="text-xl font-bold tracking-tight mb-2">Dashboard Main Content</h2>
        <p className="text-sm text-muted-foreground">
          This is a live preview of the collapsible admin sidebar component. Click the toggle button on the top-right edge of the sidebar to collapse or expand!
        </p>
      </div>
    </div>
  );
}
