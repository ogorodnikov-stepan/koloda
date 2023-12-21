import './label.scss';

interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {
  id?: string;
  className?: string;
  label: React.ReactNode;
  isError?: boolean;
}

export default function Label({ id, isError, className, label, ...props }: Props) {
  if (!label) return null;

  return (
    <label
      htmlFor={id}
      className={className}
      data-is-error={isError}
      {...props}
    >
      {label}
    </label>
  );
}
