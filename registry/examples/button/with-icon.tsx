import { Button } from "@registry/items/button";
import { Camera } from "lucide-react";

export default function ButtonWithIcon() {
  return (
    <div className="flex gap-2">
      <Button variant="default" prefix={<Camera />}>
        Camera
      </Button>
      <Button variant="default" postfix={<Camera />}>
        Camera
      </Button>
    </div>
  );
}
