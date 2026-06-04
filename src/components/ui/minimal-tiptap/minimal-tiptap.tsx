import type { Content, Editor } from '@tiptap/react';
import { EditorContent, EditorContext } from '@tiptap/react';
import { cn } from 'lib/utils';
import { Separator } from '../separator';
import { LinkBubbleMenu } from './components/bubble-menu/link-bubble-menu';
import { MeasuredContainer } from './components/measured-container';
import { SectionFive } from './components/section/five';
import { SectionFour } from './components/section/four';
import { SectionOne } from './components/section/one';
import { SectionThree } from './components/section/three';
import { SectionTwo } from './components/section/two';
import type { UseMinimalTiptapEditorProps } from './hooks/use-minimal-tiptap';
import { useMinimalTiptapEditor } from './hooks/use-minimal-tiptap';
import { useTiptapEditor } from './hooks/use-tiptap-editor';
import type { ToolbarFeature } from './types';

export interface MinimalTiptapProps extends Omit<UseMinimalTiptapEditorProps, 'onUpdate'> {
  value?: Content;
  onChange?: (value: Content) => void;
  className?: string;
  editorContentClassName?: string;
  disable?: ToolbarFeature[];
}

const Toolbar = ({ editor, disable = [] }: { editor: Editor; disable?: ToolbarFeature[] }) => {
  const d = new Set(disable);

  const showHeading = !d.has('heading');
  const showColor = !d.has('color');

  const formattingActions = (
    ['bold', 'italic', 'underline', 'strikethrough', 'code', 'clearFormatting'] as const
  ).filter((a) => !d.has(a));
  const showFormatting = formattingActions.length > 0;

  const listActions = (['orderedList', 'bulletList'] as const).filter((a) => !d.has(a));
  const showLists = listActions.length > 0;

  const insertActions = (['codeBlock', 'blockquote', 'horizontalRule'] as const).filter(
    (a) => !d.has(a)
  );
  const showLink = !d.has('link');
  const showImage = !d.has('image');
  const showInsert = showLink || showImage || insertActions.length > 0;

  // Sections that are visible, for separator placement
  const sections = [showHeading, showFormatting, showColor, showLists, showInsert];
  const getSep = (index: number) => sections.slice(0, index).some(Boolean) && sections[index];

  return (
    <div className="flex h-12 shrink-0 overflow-x-auto border-b border-zinc-300 p-2 dark:border-zinc-700">
      <div className="flex w-max items-center gap-px">
        {showHeading && (
          <SectionOne
            editor={editor}
            activeLevels={[1, 2, 3, 4, 5, 6]}
          />
        )}

        {getSep(1) && (
          <Separator
            orientation="vertical"
            className="mx-2"
          />
        )}

        {showFormatting && (
          <SectionTwo
            editor={editor}
            activeActions={formattingActions}
            mainActionCount={3}
          />
        )}

        {getSep(2) && (
          <Separator
            orientation="vertical"
            className="mx-2"
          />
        )}

        {showColor && <SectionThree editor={editor} />}

        {getSep(3) && (
          <Separator
            orientation="vertical"
            className="mx-2"
          />
        )}

        {showLists && (
          <SectionFour
            editor={editor}
            activeActions={listActions}
            mainActionCount={0}
          />
        )}

        {getSep(4) && (
          <Separator
            orientation="vertical"
            className="mx-2"
          />
        )}

        {showInsert && (
          <SectionFive
            editor={editor}
            activeActions={insertActions}
            mainActionCount={0}
            showLink={showLink}
            showImage={showImage}
          />
        )}
      </div>
    </div>
  );
};

export const MinimalTiptapEditor = ({
  value,
  onChange,
  className,
  editorContentClassName,
  disable,
  ...props
}: MinimalTiptapProps) => {
  const editor = useMinimalTiptapEditor({
    value,
    onUpdate: onChange,
    ...props
  });

  if (!editor) {
    return null;
  }

  return (
    <EditorContext.Provider value={{ editor }}>
      <MainMinimalTiptapEditor
        editor={editor}
        className={className}
        editorContentClassName={editorContentClassName}
        disable={disable}
      />
    </EditorContext.Provider>
  );
};

MinimalTiptapEditor.displayName = 'MinimalTiptapEditor';

export default MinimalTiptapEditor;

export const MainMinimalTiptapEditor = ({
  editor: providedEditor,
  className,
  editorContentClassName,
  disable
}: MinimalTiptapProps & { editor: Editor }) => {
  const { editor } = useTiptapEditor(providedEditor);

  if (!editor) {
    return null;
  }

  return (
    <MeasuredContainer
      as="div"
      name="editor"
      className={cn(
        'flex w-full flex-col rounded-md border border-zinc-300 shadow-xs dark:border-zinc-700',
        'focus-within:border-zinc-400 focus-within:ring-1 focus-within:ring-zinc-400/30 dark:focus-within:border-zinc-500 dark:focus-within:ring-zinc-400/30',
        className
      )}
    >
      <Toolbar
        editor={editor}
        disable={disable}
      />
      <EditorContent
        editor={editor}
        className={cn(
          'minimal-tiptap-editor flex flex-1 flex-col overflow-y-auto p-4 *:flex *:flex-1 *:flex-col',
          editorContentClassName
        )}
      />
      <LinkBubbleMenu editor={editor} />
    </MeasuredContainer>
  );
};
