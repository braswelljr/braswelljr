module.exports.addImport = function addImport(tree, mod, name) {
  tree.children.unshift({
    type: 'import',
    value: `import { ${name} as _${name} } from '${mod}'`
  })
  return `_${name}`
}

module.exports.addDefaultImport = function addImport(tree, mod, name) {
  tree.children.unshift({
    type: 'import',
    value: `import _${name} from '${mod}'`
  })
  return `_${name}`
}

module.exports.addExport = function addExport(tree, name, value) {
  tree.children.push({
    type: 'export',
    value: `export const ${name} = ${JSON.stringify(value)}`
  })
}

module.exports.addDefaultExport = function addDefaultExport(tree, value) {
  tree.children.push({
    type: 'export',
    value: `export default ${JSON.stringify(value)}`
  })
}

module.exports.addVariable = function addVariable(tree, name, value) {
  tree.children.push({
    type: 'export',
    value: `const ${name} = ${JSON.stringify(value)}`
  })
}

module.exports.addDefaultVariable = function addDefaultVariable(tree, value) {
  tree.children.push({
    type: 'export',
    value: `const _default = ${JSON.stringify(value)}`
  })
}
