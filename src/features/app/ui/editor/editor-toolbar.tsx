import { forwardRef, Ref } from 'react';
import { BasicProps } from 'features/app/app-types';

interface Props extends BasicProps {
  className: string;
  [key: string]: unknown;
}

const EditorToolbar = forwardRef(
  (
    { className, ...props }: Props,
    ref: Ref<HTMLUListElement>,
  ) => (
    <div
      className="editor__toolbar"
    >
      <ul
        {...props}
        className="editor__toolbar-items"
        ref={ref}
      />
    </div>
  ),
);

export default EditorToolbar;
