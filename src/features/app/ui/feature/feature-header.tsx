import { BasicProps } from 'features/app/app-types';

export default function FeatureHeader({ children }: BasicProps) {
  return (
    <header
      className="feature__header"
    >
      {children}
    </header>
  );
}
