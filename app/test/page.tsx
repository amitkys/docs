"use client";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";

export default function Page() {
  return (
    <div>
      <Tabs items={["Tab 1", "Tab 2"]}>
        <Tab value="Tab 1">Content for Tab 1</Tab>
        <Tab value="Tab 2">Content for Tab 2</Tab>
      </Tabs>
    </div>
  );
}
