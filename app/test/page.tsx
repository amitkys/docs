import { Button } from "@/registry/items/button";
import { Loader } from "@/registry/items/loader";
import { Camera } from "lucide-react";

export default function Page() {
  return (
    <div>
      <Button size={"lg"}>
        {/* <Loader /> */}
        <Camera /> Hi there
      </Button>
    </div>
  );
}
