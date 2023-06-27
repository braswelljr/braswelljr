type Node = import('unist').Node

export interface UnistNode extends Node {
  url?: string
  type: string
  name?: string
  tagName?: string
  value?: string
  properties?: {
    __rawString__?: string
    __className__?: string
    __filename__?: string
    className?: string[]
    [key: string]: unknown
  } & TerminalCommands
  attributes?: {
    name: string
    value: unknown
    type?: string
  }[]
  children?: UnistNode[]
}

export interface UnistTree extends Node {
  children: UnistNode[]
}

export interface TerminalCommands {
  __npmCommand__?: string
  __yarnCommand__?: string
  __pnpmCommand__?: string
}
