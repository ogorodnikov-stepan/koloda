import isHotkey from 'is-hotkey';
import { Editor, Element, Transforms } from 'slate';
import { CustomEditor } from 'config/slate';

export const INITIAL_VALUE = [{ type: 'p', children: [{ text: '' }] }];

const HOTKEYS: Record<string, MarkFormat> = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
};

const LIST_TYPES = ['ol', 'ul'];

export type MarkFormat = 'bold' | 'italic' | 'underline';
export type BlockFormat = typeof LIST_TYPES[number];

export function toggleBlock(editor: CustomEditor, format: any) {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: ((n) => (
      !Editor.isEditor(n)
      && Element.isElement(n)
      && LIST_TYPES.some((x) => (x === n.type))
    )),
    split: true,
  });

  Transforms.setNodes(editor, { type: isActive ? 'p' : 'li' });
  if (!isActive && isList) Transforms.wrapNodes(editor, { type: format, children: [] });
}

export function toggleMark(editor: CustomEditor, format: MarkFormat) {
  if (isMarkActive(editor, format)) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
}

export function isBlockActive(editor: CustomEditor, format: BlockFormat) {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: ((n) => (
        !Editor.isEditor(n)
        && Element.isElement(n)
        && n.type === format
      )),
    }),
  );

  return !!match;
}

export function isMarkActive(editor: CustomEditor, format: MarkFormat) {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
}

export function onKeyDown(event: KeyboardEvent, editor: CustomEditor) {
  Object.keys(HOTKEYS).forEach((hotkey) => {
    if (isHotkey(hotkey, event as any)) {
      event.preventDefault();
      const mark: MarkFormat = HOTKEYS[hotkey];
      toggleMark(editor, mark);
    }
  });

  // if (event.key === 'Backspace') {}
}

// export function decorate(editor: CustomEditor, node: Node, path: Path) {
//   if (editor.selection != null) {
//     if (
//       !Editor.isEditor(node)
//       && Editor.string(editor, [path[0]]) === ''
//       && Range.includes(editor.selection, path)
//       && Range.isCollapsed(editor.selection)
//       && Element.isElement(node)
//       && node.type === 'p'
//     ) {
//       return [{ ...editor.selection, placeholder: true }];
//     }
//   }
//   return [];
// }
