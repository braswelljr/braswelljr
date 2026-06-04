import * as React from 'react';
import {
  CaretDownIcon,
  CodeIcon,
  DividerHorizontalIcon,
  PlusIcon,
  QuoteIcon
} from '@radix-ui/react-icons';
import type { Editor } from '@tiptap/react';
import type { VariantProps } from 'class-variance-authority';
import type { toggleVariants } from '../../../toggle';
import type { FormatAction } from '../../types';
import { ImageEditDialog } from '../image/image-edit-dialog';
import { LinkEditPopover } from '../link/link-edit-popover';
import { ToolbarSection } from '../toolbar-section';

type InsertElementAction = 'codeBlock' | 'blockquote' | 'horizontalRule';
interface InsertElement extends FormatAction {
  value: InsertElementAction;
}

const formatActions: InsertElement[] = [
  {
    value: 'codeBlock',
    label: 'Code block',
    icon: <CodeIcon className="size-4" />,
    action: (editor) => editor.chain().focus().toggleCodeBlock().run(),
    isActive: (editor) => editor.isActive('codeBlock'),
    canExecute: (editor) => editor.can().chain().focus().toggleCodeBlock().run(),
    shortcuts: ['mod', 'alt', 'C']
  },
  {
    value: 'blockquote',
    label: 'Blockquote',
    icon: <QuoteIcon className="size-4" />,
    action: (editor) => editor.chain().focus().toggleBlockquote().run(),
    isActive: (editor) => editor.isActive('blockquote'),
    canExecute: (editor) => editor.can().chain().focus().toggleBlockquote().run(),
    shortcuts: ['mod', 'shift', 'B']
  },
  {
    value: 'horizontalRule',
    label: 'Divider',
    icon: <DividerHorizontalIcon className="size-4" />,
    action: (editor) => editor.chain().focus().setHorizontalRule().run(),
    isActive: () => false,
    canExecute: (editor) => editor.can().chain().focus().setHorizontalRule().run(),
    shortcuts: ['mod', 'alt', '-']
  }
];

interface SectionFiveProps extends VariantProps<typeof toggleVariants> {
  editor: Editor;
  activeActions?: InsertElementAction[];
  mainActionCount?: number;
  showLink?: boolean;
  showImage?: boolean;
}

export const SectionFive: React.FC<SectionFiveProps> = ({
  editor,
  activeActions = formatActions.map((action) => action.value),
  mainActionCount = 0,
  showLink = true,
  showImage = true,
  size,
  variant
}) => {
  return (
    <>
      {showLink && (
        <LinkEditPopover
          editor={editor}
          size={size}
          variant={variant}
        />
      )}
      {showImage && (
        <ImageEditDialog
          editor={editor}
          size={size}
          variant={variant}
        />
      )}
      {activeActions.length > 0 && (
        <ToolbarSection
          editor={editor}
          actions={formatActions}
          activeActions={activeActions}
          mainActionCount={mainActionCount}
          dropdownIcon={
            <>
              <PlusIcon className="size-4" />
              <CaretDownIcon className="size-4" />
            </>
          }
          dropdownTooltip="Insert elements"
          size={size}
          variant={variant}
        />
      )}
    </>
  );
};

SectionFive.displayName = 'SectionFive';

export default SectionFive;
