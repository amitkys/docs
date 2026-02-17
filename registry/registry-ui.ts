export type RegistryItem = {
    name: string
    dependencies?: string[]
    registryDependencies?: string[]
    files: string[]
    type: "components:ui" | "components:example"
}

export const registry: Record<string, RegistryItem> = {
    "hello-world": {
        name: "hello-world",
        type: "components:ui",
        dependencies: ["lucide-react"],
        files: ["registry/hello-world/hello-world.tsx"],
    },
}
