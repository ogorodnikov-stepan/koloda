import app from 'features/app/app-schema.json';
import auth from 'features/auth/auth-schema.json';
import srs from 'features/srs/srs-schema.json';

const domains = {
  app,
  auth,
  srs,
};

const config = {
  allErrors: true,
  verbose: true,
  removeAdditional: true,
  coerceTypes: true,
  $data: true,
};

export { domains, config };
