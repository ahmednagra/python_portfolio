/**
 * Ambient module declaration for the case-study MDX files this agent owns
 * (src/content/case-studies/*.mdx). `@next/mdx` compiles each `.mdx` file
 * into a default-exported component; `export const frontmatter = {...}` in
 * the MDX body (see mdx.md's "Frontmatter" section — `@next/mdx` has no
 * built-in YAML frontmatter support, but does allow plain JS exports) is
 * re-exported alongside it. This declaration is scoped to this directory's
 * own content only (the `@/content/case-studies/*.mdx` wildcard), so it
 * cannot collide with the profile agent's `@/content/articles/*.mdx` files.
 */
declare module "@/content/case-studies/*.mdx" {
  import type { MDXComponents } from "mdx/types";
  import type { CaseStudyFrontmatter } from "@/components/work/case-study-types";

  export const frontmatter: CaseStudyFrontmatter;

  export default function MDXContent(props: { components?: MDXComponents }): JSX.Element;
}
