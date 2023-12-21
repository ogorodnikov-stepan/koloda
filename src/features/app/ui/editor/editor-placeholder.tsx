import { RenderPlaceholderProps } from 'slate-react';

export default function renderPlaceholder(
  { attributes: { style, ...attrs }, children }: RenderPlaceholderProps,
) {
  return (
    <span {...attrs}>
      {children}
    </span>
  );
}
