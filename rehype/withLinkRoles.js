module.exports = function withLinkRoles() {
  return tree => {
    import('unist-util-visit').then(visit => {
      visit(tree, 'element', element => {
        if (['ol', 'ul'].includes(element.tagName)) {
          element.properties.role = 'list'
        }
      })
    })
  }
}
