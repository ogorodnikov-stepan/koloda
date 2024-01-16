import { lazy, Suspense, StrictMode } from 'react';
import ReactDOM from 'react-dom';

const App = lazy(() => import('features/app/app'));

ReactDOM.render(
  <Suspense fallback={null}>
    <StrictMode>
      <App />
    </StrictMode>
  </Suspense>,
  document.getElementById('app'),
);
