import { toc } from 'mdast-util-toc';
import { remark } from 'remark';
import { UnistNode } from 'types/unist';
import { visit } from 'unist-util-visit';

const textTypes = ['text', 'emphasis', 'strong', 'inlineCode'];

function flattenNode(node: UnistNode) {
  const p: (string | undefined)[] = [];
  visit(node, node => {
    if (!textTypes.includes(node.type)) return;
    p.push(node.value);
  });
  return p.join(``);
}

interface Item {
  title: string;
  url: string;
  items?: Item[];
}

function getItems(node: UnistNode, current: Item): Item | undefined {
  if (!node) {
    return undefined;
  }

  if (node.type === 'paragraph') {
    visit(node, item => {
      if (item.type === 'link') {
        current.url = item?.url || '';
        current.title = flattenNode(node);
      }

      if (item.type === 'text') {
        current.title = flattenNode(node);
      }
    });

    return current;
  }

  if (node.type === 'list' && node.children) {
    current.items = node.children.map(i => getItems(i, {} as Item)).filter(Boolean) as Item[];

    return current;
  } else if (node.type === 'listItem' && node.children) {
    const heading = getItems(node.children[0], {} as Item);

    if (node.children && node.children.length > 1) {
      getItems(node.children[1], heading as Item);
    }

    return heading;
  }

  return undefined;
}

const getToc = () => (node: any, file: any) => {
  const table = toc(node);
  file.data = getItems(table.map as UnistNode, {} as Item);
};

export type TableOfContents = {
  items?: Item[];
};

export async function getTableOfContents(content: string): Promise<TableOfContents> {
  const result = await remark().use(getToc).process(content);

  return result.data as TableOfContents;
}
