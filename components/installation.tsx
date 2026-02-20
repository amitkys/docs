import { promises as fs } from "fs";
import path from "path";
import registry from "@/registry.json";
import { InstallationTabs } from "@/components/installation-tabs";

interface InstallationProps {
  name: string;
}

export async function Installation({ name }: InstallationProps) {
  const item = registry.items.find((item) => item.name === name);

  if (!item) {
    return (
      <div className="p-4 border border-destructive/50 text-destructive rounded-md bg-destructive/10">
        Registry item "{name}" not found in registry.json configuration.
      </div>
    );
  }

  const files = await Promise.all(
    item.files.map(async (file) => {
      const filePath = path.join(process.cwd(), file.path);
      let content = "";
      try {
        content = await fs.readFile(filePath, "utf-8");
      } catch {
        content = `Error reading file: ${filePath}`;
      }
      return {
        path: path.basename(file.path),
        content,
      };
    }),
  );

  // Install commands for different package managers
  const installCommands = {
    npm: `npx shadcn@latest add https://maybedocs.id0.uk/ui/${name}.json`,
    pnpm: `pnpm dlx shadcn@latest add https://maybedocs.id0.uk/ui/${name}.json`,
    yarn: `yarn shadcn@latest add https://maybedocs.id0.uk/ui/${name}.json`,
    bun: `bunx --bun shadcn@latest add https://maybedocs.id0.uk/ui/${name}.json`,
  };

  // Dependency install commands
  const dependencyCommands = {
    npm: item.dependencies ? `npm install ${item.dependencies.join(" ")}` : "",
    pnpm: item.dependencies ? `pnpm add ${item.dependencies.join(" ")}` : "",
    yarn: item.dependencies ? `yarn add ${item.dependencies.join(" ")}` : "",
    bun: item.dependencies ? `bun add ${item.dependencies.join(" ")}` : "",
  };

  return (
    <div className="mt-6 mb-12">
      <InstallationTabs
        items={[name]}
        installCommands={installCommands}
        files={files}
        dependencyCommands={dependencyCommands}
        registryDependencies={(item as any).registryDependencies || []}
      />
    </div>
  );
}
