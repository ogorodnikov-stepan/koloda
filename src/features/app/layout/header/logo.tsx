import { Link } from 'react-router-dom';
import { useStore, isDemoSelector } from 'features/app/app-store';
import urls from 'features/app/routing/urls';

export default function AppLogo() {
  const isDemo = useStore(isDemoSelector);

  return (
    <div className="app-logo">
      <Link
        className="app-logo__link"
        to={urls.home({ isDemo })}
      >
        koloda
      </Link>
    </div>
  );
}
