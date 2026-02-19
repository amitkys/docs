import { CodeBlock } from "@/components/infsh/code-block";

export default function Page() {
  const code = `export function hello() {
  console.log('Hello, world!')
}`;
  return (
    <div>
      <CodeBlock language="typescript">{code}</CodeBlock>
    </div>
  );
}
