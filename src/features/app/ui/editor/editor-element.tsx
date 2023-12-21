import { RenderElementProps } from 'slate-react';

function EditorElement({ element, children }: RenderElementProps) {
  switch (element.type) {
    case 'ul':
      return <ul>{children}</ul>;

    case 'ol':
      return <ol>{children}</ol>;

    case 'li':
      return <li>{children}</li>;

    default:
      return <p>{children}</p>;
  }
}

export default function renderElement(props: RenderElementProps) {
  return <EditorElement {...props} />;
}
