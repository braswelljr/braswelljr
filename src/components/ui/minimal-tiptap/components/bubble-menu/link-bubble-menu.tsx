import * as React from 'react';
import type { Editor } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';
import type { ShouldShowProps } from '../../types';
import { LinkEditBlock } from '../link/link-edit-block';
import { LinkPopoverBlock } from '../link/link-popover-block';

interface LinkBubbleMenuProps {
  editor: Editor;
}

interface LinkAttributes {
  href: string;
  target: string;
}

export const LinkBubbleMenu: React.FC<LinkBubbleMenuProps> = ({ editor }) => {
  const [showEdit, setShowEdit] = React.useState(false);
  const [linkAttrs, setLinkAttrs] = React.useState<LinkAttributes>({
    href: '',
    target: ''
  });
  const [selectedText, setSelectedText] = React.useState('');

  const updateLinkState = React.useCallback(() => {
    const { from, to } = editor.state.selection;
    const { href, target } = editor.getAttributes('link');
    const text = editor.state.doc.textBetween(from, to, '');

    setLinkAttrs({ href, target });
    setSelectedText(text);
  }, [editor]);

  const shouldShow = React.useCallback(
    ({ editor, from, to }: ShouldShowProps) => {
      if (from === to) {
        return false;
      }
      const { href } = editor.getAttributes('link');

      if (!editor.isActive('link') || !editor.isEditable) {
        return false;
      }

      if (href) {
        updateLinkState();
        return true;
      }
      return false;
    },
    [updateLinkState]
  );

  const handleEdit = React.useCallback(() => {
    setShowEdit(true);
  }, []);

  const onSetLink = React.useCallback(
    (url: string, text?: string, openInNewTab?: boolean) => {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .insertContent({
          type: 'text',
          text: text || url,
          marks: [
            {
              type: 'link',
              attrs: {
                href: url,
                target: openInNewTab ? '_blank' : ''
              }
            }
          ]
        })
        .setLink({ href: url, target: openInNewTab ? '_blank' : '' })
        .run();
      setShowEdit(false);
      updateLinkState();
    },
    [editor, updateLinkState]
  );

  const onUnsetLink = React.useCallback(() => {
    editor.chain().focus().extendMarkRange('link').unsetLink().run();
    setShowEdit(false);
    updateLinkState();
  }, [editor, updateLinkState]);

  return (
    <BubbleMenu
      editor={editor}
      shouldShow={shouldShow}
      options={{
        placement: 'bottom-start',
        onHide: () => setShowEdit(false)
      }}
    >
      {showEdit ? (
        <LinkEditBlock
          defaultUrl={linkAttrs.href}
          defaultText={selectedText}
          defaultIsNewTab={linkAttrs.target === '_blank'}
          onSave={onSetLink}
          className="w-full min-w-80 rounded-md border border-neutral-200 bg-white p-4 text-neutral-950 shadow-md outline-hidden dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-50"
        />
      ) : (
        <LinkPopoverBlock
          onClear={onUnsetLink}
          url={linkAttrs.href}
          onEdit={handleEdit}
        />
      )}
    </BubbleMenu>
  );
};
