import * as React from "react";
import { promises as fs } from "fs";
import path from "path";
import { ComponentPreviewClient } from "@/components/component-preview-client";

interface ComponentPreviewProps {
  name: string;
}

export async function ComponentPreview({ name }: ComponentPreviewProps) {
  // 1. Parse name (expecting "component/example" or just "component")
  let componentName = name;
  let exampleName = "";

  if (name.includes("/")) {
    const parts = name.split("/");
    componentName = parts[0];
    exampleName = parts[1];
  }

  // 2. Read Component Source (from items)
  const itemsDir = path.join(process.cwd(), "registry", "items");
  const componentPath = path.join(itemsDir, `${componentName}.tsx`);

  let componentCode = "";
  try {
    componentCode = await fs.readFile(componentPath, "utf-8");
  } catch (error) {
    console.error(`Component source not found: ${componentPath}`, error);
    componentCode = `// Component source not found for ${componentName}\n// Please ensure registry/items/${componentName}.tsx exists.`;
  }

  // 3. Find Examples
  const examplesDir = path.join(
    process.cwd(),
    "registry",
    "examples",
    componentName,
  );

  const examples: {
    name: string;
    Component: React.ComponentType<any>;
    code: string;
  }[] = [];

  try {
    if (exampleName) {
      // Specific example
      const filePath = path.join(examplesDir, `${exampleName}.tsx`);
      const code = await fs.readFile(filePath, "utf-8");

      // Dynamic import
      const mod = await import(
        `@/registry/examples/${componentName}/${exampleName}`
      );

      examples.push({
        name: exampleName,
        Component: mod.default,
        code: code,
      });
    } else {
      // All examples in directory
      try {
        const files = await fs.readdir(examplesDir);
        for (const file of files) {
          if (file.endsWith(".tsx")) {
            const exName = file.replace(".tsx", "");
            const filePath = path.join(examplesDir, file);
            const code = await fs.readFile(filePath, "utf-8");
            const mod = await import(
              `@/registry/examples/${componentName}/${exName}`
            );

            examples.push({
              name: exName,
              Component: mod.default,
              code: code,
            });
          }
        }
      } catch (e) {
        console.error(`Modules not found in: ${examplesDir}`, e);
      }
    }
  } catch (error) {
    console.error(`Failed to load examples for ${name}`, error);
  }

  if (examples.length === 0) {
    return (
      <div className="text-sm text-muted-foreground p-4 border rounded-md bg-muted/20">
        Component "{name}" not found in registry.
        <br />
        Checked examples in: <code>registry/examples/{name}</code>
      </div>
    );
  }

  // Helper to convert 4-space indentation to 2-space
  const processCode = (code: string) => {
    return code.replace(/^(?:    )+/gm, (match) =>
      "  ".repeat(match.length / 4),
    );
  };

  // Optimize component code indentation
  componentCode = processCode(componentCode);

  return (
    <div className="flex flex-col gap-10">
      {examples.map((example) => (
        <ComponentPreviewClient
          key={example.name}
          componentName={componentName} // Main component name (e.g., "button")
          exampleName={example.name} // Example name (e.g., "basic")
          componentCode={componentCode}
          exampleCode={processCode(example.code)}
        >
          <example.Component />
        </ComponentPreviewClient>
      ))}
    </div>
  );
}
