// This example is for an Editor with `ReactEditor` and `HistoryEditor`
import { BaseEditor, Text, Descendant } from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';
import escapeHtml from 'escape-html';

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

export type FormattedText = {
  text: string;
  bold?: true;
  italic?: true;
  underline?: true;
};

export type CustomText = FormattedText;

export type ParagraphElement = {
  type: 'p';
  children: CustomText[];
};

export type ListElement = {
  type: 'ol' | 'ul';
  children: CustomText[];
};

export type ListItemElement = {
  type: 'li';
  children: CustomText[];
};

// export type HeadingElement = {
//   type: 'heading';
//   level: 1 | 2 | 3 | 4 | 5 | 6;
//   children: CustomText[];
// };

export type CustomElement = ParagraphElement | ListElement | ListItemElement;

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

export function serialize(node: Descendant) {
  if (Text.isText(node)) return serializeText(node);

  const children: string = node.children.map((n: Descendant) => serialize(n)).join('');

  return serializeElement(node, children);
}

export function serializeText(node: CustomText) {
  let string = escapeHtml(node.text);
  if (node.bold) string = `<strong>${string}</strong>`;
  if (node.italic) string = `<em>${string}</em>`;
  if (node.underline) string = `<u>${string}</u>`;
  return string;
}

export function serializeElement(node: CustomElement, children: string) {
  switch (node.type) {
    case 'p':
      return `<p>${children}</p>`;
    case 'ol':
      return `<ol>${children}</ol>`;
    case 'ul':
      return `<ul>${children}</ul>`;
    case 'li':
      return `<li>${children}</li>`;
    default:
      return children;
  }
}

// export function deserialize(source: string) {

// }
