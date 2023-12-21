import clsx from 'clsx';
import Button from 'features/app/ui/form/button';
import './view-edit.scss';

interface Props {
  mode: 'view' | 'edit';
  setMode: (mode: Props['mode']) => void;
}

export default function ViewEditSwitch(props: Props) {
  return (
    <div className="view-edit-switch">
      <Button
        onClick={() => props.setMode('view')}
        className={clsx({ active: props.mode === 'view' })}
        content="View"
      />
      <Button
        onClick={() => props.setMode('edit')}
        className={clsx({ active: props.mode === 'edit' })}
        content="Edit"
      />
    </div>
  );
}
