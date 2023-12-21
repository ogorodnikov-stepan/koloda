/* eslint-disable no-param-reassign */
import { RenderLeafProps } from 'slate-react';

function EditorLeaf({ leaf, attributes, children }: RenderLeafProps) {
  if (leaf.bold) children = <strong>{children}</strong>;
  if (leaf.italic) children = <em>{children}</em>;
  if (leaf.underline) children = <u>{children}</u>;

  return (
    <span {...attributes}>{children}</span>
  );
}

export default function renderLeaf(props: RenderLeafProps) {
  return <EditorLeaf {...props} />;
}
