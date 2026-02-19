"use client";

import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import { Loader2 } from "lucide-react";

interface ComponentPreviewClientProps {
  componentName: string;
  exampleName: string;
  componentCode: string;
  exampleCode: string;
  children: React.ReactNode; // The live component passed from the server
}

export function ComponentPreviewClient({
  componentName,
  exampleName,
  componentCode,
  exampleCode,
  children,
}: ComponentPreviewClientProps) {
  return (
    <div className="group relative my-4 flex flex-col space-y-2 w-full">
      <Tabs defaultValue="preview" className="relative mr-auto w-full">
        <TabsList variant={"line"} className="w-fit grid grid-cols-3">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>

          {/* <TabsTrigger value="source">Source</TabsTrigger> */}
        </TabsList>

        <TabsContent
          value="preview"
          className="relative rounded-md border mt-2"
        >
          <div className="flex items-center justify-center p-10 min-h-64">
            {children}
          </div>
        </TabsContent>

        <TabsContent value="code" className="mt-2">
          <div className="flex flex-col space-y-4">
            <CodeBlock
              code={exampleCode}
              title={`${exampleName || componentName}.tsx`}
            />
          </div>
        </TabsContent>

        {/* we currently do not want to expose the source code   */}

        {/* <TabsContent value="source" className="mt-2">
                    <div className="flex flex-col space-y-4">
                        <CodeBlock code={componentCode} title={`${componentName}.tsx`} />
                    </div>
                </TabsContent> */}
      </Tabs>
    </div>
  );
}

function CodeBlock({ code, title }: { code: string; title: string }) {
  return (
    <React.Suspense
      fallback={
        <div className="flex w-full items-center justify-center p-10 text-muted-foreground bg-muted/40 rounded-md border border-input">
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
          <span>Loading code...</span>
        </div>
      }
    >
      <DynamicCodeBlock
        lang="tsx"
        code={code}
        codeblock={{
          title: title,
          allowCopy: true,
        }}
        wrapInSuspense={false}
      />
    </React.Suspense>
  );
}
