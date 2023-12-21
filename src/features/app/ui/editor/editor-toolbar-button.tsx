import { forwardRef, Ref } from 'react';
import { useSlate } from 'slate-react';
import { BasicProps } from 'features/app/app-types';
import {
  isBlockActive, isMarkActive, toggleBlock, toggleMark, BlockFormat, MarkFormat,
} from './editor-utility';

interface ButtonProps extends BasicProps {
  format: string;
  active: boolean;
  reversed?: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = forwardRef(
  (
    { format, active, reversed, ...props }: ButtonProps,
    ref: Ref<HTMLButtonElement>,
  ) => (
    <button
      {...props}
      ref={ref}
      className="editor__toolbar-button"
      data-format={format}
      data-is-active={active}
      data-is-reversed={reversed}
    />
  ),
);

interface BlockButtonProps {
  format: BlockFormat;
}

export function EditorToolbarBlockButton({ format }: BlockButtonProps) {
  const editor = useSlate();

  return (
    <Button
      format={format}
      active={isBlockActive(editor, format)}
      onClick={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    />
  );
}

interface MarkButtonProps {
  format: MarkFormat;
}

export function EditorToolbarMarkButton({ format }: MarkButtonProps) {
  const editor = useSlate();

  return (
    <Button
      format={format}
      active={isMarkActive(editor, format)}
      onClick={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    />
  );
}
