import { BasicProps } from 'features/app/app-types';

export default function FeatureFooter({ children }: BasicProps) {
  return (
    <header
      className="feature__footer"
    >
      {children}
    </header>
  );
}
