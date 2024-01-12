import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useLoginMutation } from 'features/auth/auth-queries';
import TextInput from 'features/app/ui/form/text-input';
import Button from 'features/app/ui/form/button';

const PREFIX = 'auth:authentication.login';
const REMEMBER_DEFAULT = true;

interface State {
  login?: string;
  password?: string;
  remember: boolean;
}

export default function LoginUsername() {
  const { t } = useTranslation();
  const [credentials, setCredentials] = useState<State>({ remember: REMEMBER_DEFAULT });
  const { status, isLoading, isError, error, mutate } = useLoginMutation({});

  const handleChange = useCallback(({ target: { name, value, checked } }) => {
    setCredentials((prev) => (
      { ...prev, [name]: ((name === 'remember') ? !checked : value) }
    ));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    mutate(credentials);
  }, [credentials]);

  return (
    <form
      className="login-form"
      onSubmit={handleSubmit}
    >
      <TextInput
        className="login-form__login"
        name="login"
        placeholder={t(`${PREFIX}.login.label`)}
        isError={!!error?.meta?.errors?.login?.login}
        errors={error?.meta?.errors?.login?.login}
        errorPrefix={`${PREFIX}.login.errors`}
        value={credentials.login || ''}
        onChange={handleChange}
      />
      <TextInput
        className="login-form__password"
        name="password"
        type="password"
        placeholder={t(`${PREFIX}.password.label`)}
        isError={!!error?.meta?.errors?.login?.password}
        errors={error?.meta?.errors?.login?.password}
        errorPrefix={`${PREFIX}.password.errors`}
        value={credentials.password || ''}
        onChange={handleChange}
      />
      <Button
        className="login-form__submit"
        type="submit"
        disabled={isLoading}
        onClick={handleSubmit}
        content={t(`${PREFIX}.submit.${isLoading ? 'loading' : 'text'}`)}
      />
      <span
        className="login-form__status"
        data-status={status}
      >
        {(isError && (error?.status === 404)) && t(`${PREFIX}.messages.404`)}
        {(isError && (error?.status > 500)) && t(`${PREFIX}.messages.5xx`)}
      </span>
    </form>
  );
}
