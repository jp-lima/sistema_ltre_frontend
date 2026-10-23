import katex from "katex";
import { cn } from "cn";

export function Latex({ children, className, block = false }) {
  const html = katex.renderToString(children, {
    throwOnError: false,
    displayMode: block,
  });

  return (
    <span
      className={cn("inline-block", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
