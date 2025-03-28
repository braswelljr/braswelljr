import path from 'path'
import { defineDocumentType, defineNestedType, makeSource } from 'contentlayer/source-files'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import { codeImport } from 'remark-code-import'
import remarkGfm from 'remark-gfm'
import { getHighlighter, loadTheme } from 'shiki'
import { UnistNode, UnistTree } from 'types/unist'
import { visit } from 'unist-util-visit'
import { rehypeComponent } from './lib/rehype-component'
import { rehypeNpmCommand } from './lib/rehype-npm-command'

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields: import('contentlayer/source-files').ComputedFields = {
  slug: {
    type: 'string',
    resolve: post => `/${post._raw.flattenedPath}`
  },
  slugAsParams: {
    type: 'string',
    resolve: post => post._raw.flattenedPath.split('/').slice(1).join('/')
  }
}

const BlogProperties = defineNestedType(() => ({
  name: 'BlogProperties',
  fields: {
    link: {
      type: 'string'
    },
    api: {
      type: 'string'
    }
  }
}))

const BlogLinksAndResources = defineNestedType(() => ({
  name: 'BlogLinksAndResources',
  fields: {
    title: { type: 'string', required: true },
    url: { type: 'string', required: true },
    description: { type: 'string', required: false }
  }
}))

export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: `blog/**/*.{mdx,md}`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true
    },
    date: {
      type: 'date',
      description: 'The date of the post',
      required: false
    },
    description: {
      type: 'string',
      description: 'The description of the post',
      required: true
    },
    published: {
      type: 'boolean',
      description: 'Whether the post is published or not',
      required: false,
      default: true
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
      description: 'The tags of the post',
      required: false
    },
    blog: {
      type: 'nested',
      of: BlogProperties
    },
    featured: {
      type: 'boolean',
      default: false,
      required: false
    },
    coverImage: {
      type: 'image',
      required: false
    },
    linksAndResources: {
      type: 'list',
      of: BlogLinksAndResources,
      required: false
    }
  },
  computedFields
}))

export default makeSource({
  contentDirPath: './content',
  documentTypes: [Blog],
  mdx: {
    remarkPlugins: [remarkGfm, codeImport as () => void],
    rehypePlugins: [
      rehypeSlug,
      rehypeComponent,
      () => tree => {
        visit(tree, node => {
          if (node?.type === 'element' && node?.tagName === 'pre') {
            const [codeEl] = node.children
            if (codeEl.tagName !== 'code') {
              return
            }

            node.__rawString__ = codeEl.children?.[0].value
            node.__src__ = node.properties?.__src__
          }
        })
      },
      [
        rehypePrettyCode,
        {
          getHighlighter: async () => {
            const theme = await loadTheme(path.join(process.cwd(), 'lib/vscode-theme.json'))
            return await getHighlighter({ theme })
          },
          onVisitLine(node: UnistTree) {
            // Prevent lines from collapsing in `display: grid` mode, and allow empty
            // lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{ type: 'text', value: ' ' }]
            }
          },
          onVisitHighlightedLine(node: UnistNode) {
            node.properties?.className?.push('line--highlighted')
          },
          onVisitHighlightedWord(node: UnistNode) {
            node.properties?.className?.push('word--highlighted')
          }
        }
      ],
      () => tree => {
        visit(tree, node => {
          if (node?.type === 'element' && node?.tagName === 'div') {
            if (!('data-rehype-pretty-code-fragment' in node.properties)) {
              return
            }

            const preElement = node.children.at(-1)
            if (preElement.tagName !== 'pre') {
              return
            }

            preElement.properties['__withMeta__'] = node.children.at(0).tagName === 'div'

            preElement.properties['__rawString__'] = node.__rawString__

            // get the filename
            if (node.children.at(0).tagName === 'div') {
              preElement.properties['__filename__'] = node.children.at(0).children.at(0).value
            }

            // remove the element with `data-rehype-pretty-code-title` attribute
            node.children = node.children.filter(
              (
                child: UnistNode & {
                  properties: {
                    'data-rehype-pretty-code-title'?: string
                  }
                }
              ) => {
                return !('data-rehype-pretty-code-title' in child.properties)
              }
            )

            if (node.__src__) {
              preElement.properties['__src__'] = node.__src__
            }

            if (node.__event__) {
              preElement.properties['__event__'] = node.__event__
            }

            if (node.__style__) {
              preElement.properties['__style__'] = node.__style__
            }
          }
        })
      },
      rehypeNpmCommand,
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
  }
})
