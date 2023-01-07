/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const fm = require('front-matter')
const redent = require('redent')
const visit = require('unist-util-visit')

const unified = require('unified')
const markdown = unified().use(require('remark-parse'))

// Abusing the front-matter plugin to parse the Yaml, so that we don't have to
// load another yaml tool. Shush, don't tell anyone!
function yaml(input) {
  return fm(['---', input, '---'].join('\n')).attributes
}

function md(input) {
  // The regex replace will deduce two or more \n to a single \n
  return markdown.parse(redent(input).replace(/^\n+/gm, '\n')).children
}

function joinAsSpeech(words, separator = ' and ') {
  let all = words.slice()
  let last = all.pop()

  return [all.join(', '), last].filter(Boolean).join(separator)
}

function escapeRegex(input) {
  return input.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
}

function diff(blob, changes) {
  // Re-indent with 2 spaces, so that we have breathing room for the - and + signs.
  let next = blob
    .split('\n')
    .map(line => `  ${line}`)
    .join('\n')

  for (let [needle, replacement] of changes) {
    next = next
      .replace(
        new RegExp(`([  ]*)${escapeRegex(needle)}`),
        [
          needle
            .split('\n')
            .map(line => `- $1${line}`)
            .join('\n'),
          replacement
            .split('\n')
            .map(line => `+ $1${line}`)
            .join('\n')
        ].join('\n')
      )
      // $1 contained 2 spaces to many
      .replace(/^([-+])\s{3}/gm, '$1 ')
  }

  return next
}

function quote(char = "'") {
  return line => char + line + char
}

function indent(amount = 2) {
  return line => ' '.repeat(amount) + line
}

function code(language, contents, { file = null, indent = 8 } = {}) {
  let diffIndentation = language.includes('diff-') ? '  ' : ''
  let comment = {
    js: data => `// ${data}`,
    css: data => `/* ${data} */`,
    html: data => `<!-- ${data} -->`,
    php: data =>
      file && file.endsWith('.blade.php') ? `{{-- ${data} --}}` : `// ${data}`
  }

  return [
    '```' + language,
    file && diffIndentation + comment[language.replace('diff-', '')](file),
    contents.trimEnd(),
    '```'
  ]
    .filter(Boolean)
    .join('\n')
    .split('\n')
    .map((line, idx) => (idx === 0 ? line : `${' '.repeat(indent)}${line}`))
    .join('\n')
}

function codeBlock(language, contents, { file = null, indent = 8 } = {}) {
  return md(code(language, contents, { file, indent }))
}

function codeBlockWithDiff(blob, changes, { file = null, indent = 8 } = {}) {
  return codeBlock(`diff-${file.split('.').pop()}`, diff(blob, changes), {
    file,
    indent
  })
}
