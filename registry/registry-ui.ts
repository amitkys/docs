export type RegistryItem = {
    name: string
    dependencies?: string[]
    registryDependencies?: string[]
    files: string[]
    type: "components:ui" | "components:example"
}

export const registry: Record<string, RegistryItem> = {
    "button": {
        name: "button",
        type: "components:ui",
        dependencies: ["@radix-ui/react-slot", "class-variance-authority"],
        files: ["registry/items/button.tsx"],
    },
}
