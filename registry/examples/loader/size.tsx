"use client";

import { Loader } from "@/registry/items/loader";

export default function Component() {
  return (
    <div className="flex gap-6">
      <Loader className="size-4" />
      <Loader className="size-6" />
      <Loader className="size-8" />
      <Loader className="size-10" />
    </div>
  );
}
