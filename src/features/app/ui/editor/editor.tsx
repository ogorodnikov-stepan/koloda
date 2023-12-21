import React, { useMemo, useCallback, useEffect } from 'react';
import clsx from 'clsx';
import { createEditor, Descendant, Transforms } from 'slate';
import { withHistory } from 'slate-history';
import { Slate, Editable, withReact } from 'slate-react';
import Label from 'features/app/ui/form/label';
import { onKeyDown } from './editor-utility';
import EditorToolbar from './editor-toolbar';
import renderElement from './editor-element';
import renderLeaf from './editor-leaf';
import renderPlaceholder from './editor-placeholder';
import { EditorToolbarMarkButton, EditorToolbarBlockButton } from './editor-toolbar-button';
import './editor.scss';

interface Props {
  className?: string;
  name: string;
  label?: React.ReactNode;
  placeholder?: string;
  readOnly?: boolean;
  autoFocus?: boolean;
  value: Descendant[];
  onChange: (value: any) => void;
}

export default function Editor(
  { className, name, label, readOnly, autoFocus, value, onChange, ...props }: Props,
) {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const handleKeyDown = useCallback((event) => { onKeyDown(event, editor); }, [editor]);

  const handleChange = (editorValue: any) => {
    if (editor.operations.some((o) => o.type !== 'set_selection')) {
      onChange({ target: { name, value: editorValue } });
    }
  };

  useEffect(() => {
    if (readOnly) {
      // TODO: proper way of discard changes for editors
      editor.children = value;
      Transforms.deselect(editor);
    }
  }, [editor, readOnly, value]);

  return (
    <div
      className={clsx(className, 'editor')}
      data-is-readonly={!!readOnly}
    >
      <Label
        className={`${className}-label editor__label label`}
        label={label}
      />
      <Slate
        editor={editor}
        value={value}
        onChange={handleChange}
      >
        { !readOnly && (
          <EditorToolbar>
            <EditorToolbarMarkButton format="bold" />
            <EditorToolbarMarkButton format="italic" />
            <EditorToolbarMarkButton format="underline" />
            <EditorToolbarBlockButton format="ol" />
            <EditorToolbarBlockButton format="ul" />
          </EditorToolbar>
        )}
        <Editable
          {...props}
          className="editor__input"
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          renderPlaceholder={renderPlaceholder}
          readOnly={readOnly}
          autoFocus={autoFocus}
          onKeyDown={handleKeyDown}
        />
      </Slate>
    </div>
  );
}
