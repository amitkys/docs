import { Loader } from "@/registry/items/loader";

export default function Component() {
  return (
    <div className="flex gap-6">
      <Loader variant="ring" />
      <Loader variant="spin" />
    </div>
  );
}
