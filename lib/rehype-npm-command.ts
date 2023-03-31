import { visit } from 'unist-util-visit'
import { UnistNode, UnistTree } from 'types/unist'

export function rehypeNpmCommand() {
  return (tree: UnistTree) => {
    visit(tree, (node: UnistNode) => {
      if (node.type !== 'element' || node?.tagName !== 'pre') {
        return
      }

      // We'll only deal with the npm install command for now.
      if (
        node.properties?.['__rawString__']?.startsWith('npm install') ||
        node.properties?.['__rawString__']?.startsWith('npm i') ||
        node.properties?.['__rawString__']?.startsWith('yarn add') ||
        node.properties?.['__rawString__']?.startsWith('pnpm add')
      ) {
        const npmCommand = node.properties?.['__rawString__']

        // npm install command
        if (npmCommand.startsWith('npm install') || npmCommand.startsWith('npm i')) {
          node.properties['__npmCommand__'] = npmCommand
          node.properties['__yarnCommand__'] = npmCommand.replace('npm install', 'yarn add')
          node.properties['__pnpmCommand__'] = npmCommand.replace('npm install', 'pnpm add')
        }

        // yarn add command
        if (npmCommand.startsWith('yarn add')) {
          node.properties['__npmCommand__'] = npmCommand.replace('yarn add', 'npm install')
          node.properties['__yarnCommand__'] = npmCommand
          node.properties['__pnpmCommand__'] = npmCommand.replace('yarn add', 'pnpm add')
        }

        // pnpm add command
        if (npmCommand.startsWith('pnpm add')) {
          node.properties['__npmCommand__'] = npmCommand.replace('pnpm add', 'npm install')
          node.properties['__yarnCommand__'] = npmCommand.replace('pnpm add', 'yarn add')
          node.properties['__pnpmCommand__'] = npmCommand
        }
      }

      // npm create command
      if (node.properties?.['__rawString__']?.startsWith('npm init')) {
        const npmCommand = node.properties?.['__rawString__']
        node.properties['__npmCommand__'] = npmCommand
        node.properties['__yarnCommand__'] = npmCommand.replace('npm init', 'yarn create')
        node.properties['__pnpmCommand__'] = npmCommand.replace('npm init', 'pnpm create')
      }

      // npm run command
      if (node.properties?.['__rawString__']?.startsWith('npm run')) {
        const npmCommand = node.properties?.['__rawString__']
        node.properties['__npmCommand__'] = npmCommand
        node.properties['__yarnCommand__'] = npmCommand.replace('npm run', 'yarn')
        node.properties['__pnpmCommand__'] = npmCommand.replace('npm run', 'pnpm run')
      }
    })
  }
}
