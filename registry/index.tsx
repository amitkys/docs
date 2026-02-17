import * as React from "react"
import HelloWorld from "@registry/hello-world/hello-world"

// This maps the string "name" you use in MDX to the actual component
export const registry: Record<string, React.ComponentType<any>> = {
    "hello-world": HelloWorld,
    // Add new components here as you build them
}

