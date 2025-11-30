import {
  rehypeCodeDefaultOptions,
  rehypeToc,
  remarkCodeTab,
  remarkDirectiveAdmonition,
  remarkGfm,
  remarkMdxFiles,
  remarkNpm
} from 'fumadocs-core/mdx-plugins';
import { remarkTypeScriptToJavaScript } from 'fumadocs-docgen/remark-ts2js';
import { defineConfig, defineDocs, frontmatterSchema, metaSchema, remarkInclude } from 'fumadocs-mdx/config';
import { transformerTwoslash } from 'fumadocs-twoslash';
import rehypePreLanguage from 'rehype-pre-language';
import rehypeSlug from 'rehype-slug';
import codeImport from 'remark-code-import';
import remarkDirective from 'remark-directive';
import { z } from 'zod';
import { rehypeComponent } from './lib/rehype-component';

const blogSchema = z.object({
  title: z.string().describe('The title of the post'),
  date: z.coerce.date().describe('The date of the post'),
  description: z.string().describe('The description of the post'),
  published: z.boolean().describe('Whether the post is published or not').default(true).optional(),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().default(false).optional(),
  cover: z
    .any()
    .refine((file) => file?.size <= 5000000, `Max image size is 5MB.`)
    .refine(
      (file) => ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file?.type as string),
      'Only .jpg, .jpeg, .png and .webp formats are supported.'
    )
    .optional(),
  resources: z
    .array(
      z.object({
        title: z.string().describe('Title of the resource'),
        url: z.url().describe('URL of the resource'),
        description: z.string().describe('Resource description').optional()
      })
    )
    .optional()
});

export const blog = defineDocs({
  dir: 'content/blog',
  docs: {
    schema: frontmatterSchema.and(blogSchema),
    postprocess: {
      includeProcessedMarkdown: true
    }
  },
  meta: {
    schema: metaSchema.and(blogSchema)
  }
});

export default defineConfig({
  mdxOptions: {
    rehypeCodeOptions: {
      themes: {
        light: 'github-light-default',
        dark: 'github-dark-default'
      },
      langs: ['js', 'javascript', 'ts', 'tsx', 'css', 'html', 'json', 'bash', 'diff', 'go', 'rust', 'java'],
      tab: true,
      transformers: [
        ...(rehypeCodeDefaultOptions.transformers ?? []),
        //  ,transformerTwoslash()
        transformerTwoslash()
      ]
    },
    remarkPlugins: [
      remarkGfm,
      codeImport,
      [remarkNpm, { persist: { id: 'package-manager' } }],
      [remarkTypeScriptToJavaScript, { persist: { id: 'ts2js' } }],
      remarkInclude,
      remarkMdxFiles,
      remarkDirectiveAdmonition,
      [remarkCodeTab, { parseMdx: true }],
      remarkDirective
    ],
    rehypePlugins: [rehypeToc, rehypeSlug, rehypeComponent, [rehypePreLanguage, 'data-language']]
  }
});
