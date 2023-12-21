import { BasicProps } from 'features/app/app-types';
import './feature-toolbar.scss';

export default function FeatureToolbar({ children }: BasicProps) {
  return (
    <div className="feature__toolbar">
      {children}
    </div>
  );
}
