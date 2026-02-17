import { promises as fs } from "fs"
import path from "path"
import { registry } from "@/registry/registry-ui"
import { InstallationTabs } from "@/components/installation-tabs"

interface InstallationProps {
    registryItem: string
}

export async function Installation({ registryItem }: InstallationProps) {
    const item = registry[registryItem]

    if (!item) {
        return (
            <div className="p-4 border border-destructive/50 text-destructive rounded-md bg-destructive/10">
                Registry item "{registryItem}" not found in registry-ui configuration.
            </div>
        )
    }

    const files = await Promise.all(
        item.files.map(async (file) => {
            const filePath = path.join(process.cwd(), file)
            let content = ""
            try {
                content = await fs.readFile(filePath, "utf-8")
            } catch {
                content = `Error reading file: ${filePath}`
            }
            return {
                path: path.basename(file), // Show just filename or relative path? User showed "path/to/file.tsx"
                content
            }
        })
    )

    // Install commands for different package managers
    const installCommands = {
        npm: `npx sabnamui@latest add ${registryItem}`,
        pnpm: `pnpm dlx sabnamui@latest add ${registryItem}`,
        yarn: `npx sabnamui@latest add ${registryItem}`,
        bun: `bun x sabnamui@latest add ${registryItem}`,
    }

    // Dependency install commands
    const dependencyCommands = {
        npm: item.dependencies ? `npm install ${item.dependencies.join(" ")}` : "",
        pnpm: item.dependencies ? `pnpm add ${item.dependencies.join(" ")}` : "",
        yarn: item.dependencies ? `yarn add ${item.dependencies.join(" ")}` : "",
        bun: item.dependencies ? `bun add ${item.dependencies.join(" ")}` : "",
    }

    return (
        <div className="mt-6 mb-12">
            <InstallationTabs
                items={[registryItem]}
                installCommands={installCommands}
                files={files}
                dependencyCommands={dependencyCommands}
                registryDependencies={item.registryDependencies || []}
            />
        </div>
    )
}
