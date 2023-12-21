import appBackend from 'features/app/app-backend-requests';
import appStorage from 'features/app/app-storage-requests';
import authBackend from 'features/auth/auth-backend-requests';
import authStorage from 'features/auth/auth-storage-requests';
import srsBackend from 'features/srs/srs-backend-requests';
import srsStorage from 'features/srs/srs-storage-requests';
import { TOKEN_KEY } from 'features/auth/auth-constants';

const CONTENT_TYPE = 'application/json';

const requests = {
  backend: {
    app: appBackend,
    auth: authBackend,
    srs: srsBackend,
  },
  storage: {
    app: appStorage,
    auth: authStorage,
    srs: srsStorage,
  },
};

const config = {
  headers: () => {
    const token = sessionStorage.getItem(TOKEN_KEY) || localStorage.getItem(TOKEN_KEY);
    return {
      'content-type': CONTENT_TYPE,
      authorization: token ? `Bearer ${token}` : undefined,
    };
  },
};

export { requests, config };
