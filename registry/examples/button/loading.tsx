"use client";

import { Button } from "@registry/items/button";
import { useState } from "react";

import { IconUsers } from "@tabler/icons-react";

export default function Loading() {
  const [isLoading, setIsLoading] = useState(false);

  // api call
  const getUser = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setIsLoading(false);
    alert("User fetched successfully");
  };

  return (
    <div className="">
      <Button
        variant={"secondary"}
        isLoading={isLoading}
        onClick={getUser}
        prefix={<IconUsers />}
      >
        Get User
      </Button>
    </div>
  );
}
