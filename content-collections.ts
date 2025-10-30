import { defineCollection, defineConfig } from '@content-collections/core';
import { compileMDX } from '@content-collections/mdx';
import { rehypeCode, remarkAdmonition, remarkCodeTab, remarkGfm, remarkMdxFiles, remarkNpm, type RehypeCodeOptions } from 'fumadocs-core/mdx-plugins';
import { remarkTypeScriptToJavaScript } from 'fumadocs-docgen/remark-ts2js';
import { remarkInclude } from 'fumadocs-mdx/config';
// import { transformerTwoslash } from 'fumadocs-twoslash';
// import { createFileSystemTypesCache } from 'fumadocs-twoslash/cache-fs';
import readingTime from 'reading-time';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePreLanguage from 'rehype-pre-language';
import rehypeSlug from 'rehype-slug';
import { codeImport } from 'remark-code-import';
import remarkDirective from 'remark-directive';
import { visit } from 'unist-util-visit';
import { z } from 'zod';
import { rehypeComponent } from './lib/rehype-component';

const blogs = defineCollection({
  name: 'blogs',
  directory: 'content/blog',
  include: '**/*.md(x)?',
  schema: z.object({
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
          url: z.string().url().describe('URL of the resource'),
          description: z.string().describe('Resource description').optional()
        })
      )
      .optional()
  }),
  transform: async (document, ctx) => {
    const body = await compileMDX(ctx, document, {
      remarkPlugins: [
        remarkGfm,
        codeImport,
        [remarkNpm, { persist: { id: 'package-manager' } }],
        [remarkTypeScriptToJavaScript, { persist: { id: 'ts2js' } }],
        remarkInclude,
        remarkMdxFiles,
        remarkAdmonition,
        [remarkCodeTab, { parseMdx: true }],
        remarkDirective
      ],
      rehypePlugins: [
        rehypeSlug,
        rehypeComponent,
        [rehypePreLanguage, 'data-language'],
        [
          rehypeCode,
          {
            themes: {
              light: 'github-light-default',
              dark: 'github-dark-default'
            },
            tab: true,
            inline: 'tailing-curly-colon'
            // transformers: [transformerTwoslash({ typesCache: createFileSystemTypesCache() })]
          } as RehypeCodeOptions
        ],
        () => (tree) => {
          visit(tree, (node) => {
            if (node?.type === 'element' && node?.tagName === 'pre') {
              const [codeEl] = node.children;
              if (codeEl.tagName !== 'code') {
                return;
              }

              if (codeEl.data?.meta) {
                // Extract event from meta and pass it down the tree.
                const regex = /event="([^"]*)"/;
                const match = codeEl.data?.meta.match(regex);
                if (match) {
                  node.__event__ = match ? match[1] : null;
                  codeEl.data.meta = codeEl.data.meta.replace(regex, '');
                }
              }

              node.__rawString__ = codeEl.children?.[0].value;
              node.__src__ = node.properties?.__src__;
              node.__style__ = node.properties?.__style__;
            }
          });
        },

        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ['subheading-anchor'],
              ariaLabel: 'Link to section'
            }
          }
        ]
      ]
    });

    // Normalize to forward slashes for easier processing (eg. Windows using \\)
    const resolvedPath = document._meta.filePath.replace(/\\/g, '/');

    // Remove trailing /index.mdx
    const params = resolvedPath.replace(/\/index\.mdx$/, '');
    // Prepend a forward slash if not already present
    let slug = !params.startsWith('/') ? '/' + params : params;

    slug = `/blog` + slug;

    return {
      ...document,
      body,
      slug,
      params,
      readingTime: readingTime(document.content).text,
      _id: document._meta.filePath
    };
  }
});

export default defineConfig({
  collections: [blogs],
  mdx: {}
});
