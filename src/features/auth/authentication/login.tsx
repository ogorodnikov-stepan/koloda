import React, { useState, useCallback } from 'react';
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
  const { isLoading, isError, error, mutate } = useLoginMutation({});

  const handleChange = useCallback(({ target: { name, value, checked } }) => {
    setCredentials((prev) => (
      { ...prev, [name]: ((name === 'remember') ? !checked : value) }
    ));
  }, []);

  const handleSubmit = useCallback(() => {
    mutate(credentials);
  }, [credentials]);

  return (
    <form className="login-form">
      <TextInput
        className="login-form__login"
        name="login"
        label={t(`${PREFIX}.login.label`)}
        isError={!!error?.meta?.errors?.login}
        value={credentials.login || ''}
        onChange={handleChange}
      />
      <TextInput
        className="login-form__password"
        name="password"
        type="password"
        label={t(`${PREFIX}.password.label`)}
        isError={error?.meta?.errors?.password}
        value={credentials.password || ''}
        onChange={handleChange}
      />
      <Button
        className="login-form__submit"
        disabled={isLoading}
        onClick={handleSubmit}
        content={t(`${PREFIX}.submit.text`)}
      />
      { isLoading && (
        <div
          className="login-form__status"
          data-status="loading"
        >
          {t(`${PREFIX}.messages.loading`)}
        </div>
      )}
      { isError && (error?.status === 404) && (
        <div
          className="login-form__status"
          data-status="error"
        >
          {t(`${PREFIX}.messages.incorrect`)}
        </div>
      )}
    </form>
  );
}
