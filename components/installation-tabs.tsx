"use client"

import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock"
import { usePackageManager, type PackageManager } from "@/lib/use-package-manager"

interface InstallationTabsProps {
    items: string[]
    installCommands: Record<string, string>
    files: { path: string, content: string }[]
    dependencyCommands: Record<string, string>
    registryDependencies?: string[]
}

export function InstallationTabs({
    items,
    installCommands,
    files,
    dependencyCommands,
    registryDependencies,
}: InstallationTabsProps) {
    const { packageManager, setPackageManager } = usePackageManager()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <Tabs defaultValue="cli" className="relative w-full border rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-4 bg-muted/50 border-b">
                <TabsList className="bg-transparent p-0 h-10 w-auto gap-2">
                    <TabsTrigger
                        value="cli"
                        className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-2 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                    >
                        CLI
                    </TabsTrigger>
                    <TabsTrigger
                        value="manual"
                        className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-2 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                    >
                        Manual
                    </TabsTrigger>
                </TabsList>
            </div>

            <TabsContent value="cli" className="p-4 bg-background border-none m-0">
                <Tabs value={mounted ? packageManager : "npm"} onValueChange={(value) => setPackageManager(value as PackageManager)} className="relative w-full">
                    <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0 mb-4">
                        <TabsTrigger value="npm" className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-2 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none">npm</TabsTrigger>
                        <TabsTrigger value="pnpm" className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-2 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none">pnpm</TabsTrigger>
                        <TabsTrigger value="yarn" className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-2 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none">yarn</TabsTrigger>
                        <TabsTrigger value="bun" className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-2 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none">bun</TabsTrigger>
                    </TabsList>
                    {Object.entries(installCommands).map(([manager, command]) => (
                        <TabsContent key={manager} value={manager} className="mt-0">
                            <DynamicCodeBlock
                                lang="bash"
                                code={command}
                                codeblock={{
                                    title: "Terminal",
                                    allowCopy: true
                                }}
                            />
                        </TabsContent>
                    ))}
                </Tabs>
            </TabsContent>

            <TabsContent value="manual" className="p-4 bg-background space-y-6 border-none m-0">
                {items?.length > 1 && (
                    <div className="space-y-2">
                        <p className="font-medium text-sm">Components to install:</p>
                        <div className="flex flex-wrap gap-2">
                            {items.map((item) => (
                                <code key={item} className="bg-muted px-2 py-1 rounded text-sm">
                                    {item}
                                </code>
                            ))}
                        </div>
                    </div>
                )}

                {registryDependencies && registryDependencies.length > 0 && (
                    <div className="space-y-2">
                        <h4 className="font-medium text-sm">Dependencies</h4>
                        <p className="text-sm text-muted-foreground">
                            This component depends on the following components:
                        </p>
                        <ul className="list-disc pl-4 space-y-1">
                            {registryDependencies.map((dep) => (
                                <li key={dep} className="text-sm">
                                    {dep}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {Object.values(dependencyCommands).some(cmd => cmd) && (
                    <div className="space-y-2">
                        <h4 className="font-medium text-sm">Install dependencies</h4>
                        <Tabs value={mounted ? packageManager : "npm"} onValueChange={(value) => setPackageManager(value as PackageManager)} className="relative w-full">
                            <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0 mb-4">
                                <TabsTrigger value="npm" className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-2 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none">npm</TabsTrigger>
                                <TabsTrigger value="pnpm" className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-2 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none">pnpm</TabsTrigger>
                                <TabsTrigger value="yarn" className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-2 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none">yarn</TabsTrigger>
                                <TabsTrigger value="bun" className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-2 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none">bun</TabsTrigger>
                            </TabsList>
                            {Object.entries(dependencyCommands).map(([manager, command]) => (
                                command && (
                                    <TabsContent key={manager} value={manager} className="mt-0">
                                        <DynamicCodeBlock
                                            lang="bash"
                                            code={command}
                                            codeblock={{
                                                title: "Terminal",
                                                allowCopy: true
                                            }}
                                        />
                                    </TabsContent>
                                )
                            ))}
                        </Tabs>
                    </div>
                )}

                <div className="space-y-4">
                    <h4 className="font-medium text-sm">Copy the source code</h4>
                    {files.map((file) => (
                        <div key={file.path} className="space-y-2">
                            <DynamicCodeBlock
                                lang="tsx"
                                code={file.content}
                                codeblock={{
                                    title: file.path,
                                    allowCopy: true
                                }}
                            />
                        </div>
                    ))}
                </div>
            </TabsContent>
        </Tabs>
    )
}