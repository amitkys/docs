import * as React from "react"
import { promises as fs } from "fs"
import path from "path"
import { registry } from "@/registry/index"
import { ComponentPreviewClient } from "@/components/component-preview-client"

interface ComponentPreviewProps {
    name: string
}

export async function ComponentPreview({ name }: ComponentPreviewProps) {
    // 1. Resolve components
    const components: { name: string; Component: React.ComponentType<any>; filePath: string }[] = []

    // Check registry first (backward compatibility)
    if (registry[name]) {
        components.push({
            name,
            Component: registry[name],
            filePath: path.join(process.cwd(), "registry", name, `${name}.tsx`),
        })
    } else {
        const registryRoot = path.join(process.cwd(), "registry")
        const targetPath = path.join(registryRoot, name)

        try {
            // Check if directory
            const stats = await fs.stat(targetPath)
            if (stats.isDirectory()) {
                const files = (await fs.readdir(targetPath)).filter((file) => file.endsWith(".tsx"))

                for (const file of files) {
                    const componentName = file.replace(".tsx", "")
                    const importPath = `@/registry/${name}/${componentName}`
                    try {
                        const mod = await import(`@/registry/${name}/${componentName}`) // Dynamic import
                        components.push({
                            name: componentName,
                            Component: mod.default,
                            filePath: path.join(targetPath, file),
                        })
                    } catch (error) {
                        console.error(`Failed to dynamic import: ${importPath}`, error)
                    }
                }
            }
        } catch {
            // If not directory, check if file
            try {
                const filePath = `${targetPath}.tsx`
                await fs.stat(filePath)

                const mod = await import(`@/registry/${name}`)
                components.push({
                    name: path.basename(name),
                    Component: mod.default,
                    filePath,
                })
            } catch {
                // Not found
            }
        }
    }

    if (components.length === 0) {
        return (
            <div className="text-sm text-muted-foreground">
                Component "{name}" not found in registry.
            </div>
        )
    }

    // 2. Render previews
    return (
        <div className="flex flex-col gap-4">
            {await Promise.all(
                components.map(async ({ name: componentName, Component, filePath }) => {
                    let code = ""
                    try {
                        code = await fs.readFile(filePath, "utf-8")
                        code = code.replace(/from "@\/registry\/.*"/g, 'from "@/components/ui/..."')
                    } catch {
                        code = `Error reading file: ${filePath}`
                    }

                    return (
                        <ComponentPreviewClient key={filePath} componentName={componentName} code={code}>
                            <Component />
                        </ComponentPreviewClient>
                    )
                })
            )}
        </div>
    )
}
