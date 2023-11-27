import React, { useCallback, useMemo, useState } from 'react';
import * as Yup from 'yup';
import { FormikHelpers } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { AuthRepository } from '../../stores/auth-repository';
import { Button, Checkbox } from '@org/ui-kit';
import { CommonStorageStore } from '../../stores/common-storage-store';
import { Form, FormButton, InputField, FormLayout } from '../../components/Form';
import { analytics } from '../../lib/analytics';
import { useStore } from '../../core/hooks/use-store';

import { ReactComponent as LogoIcon } from './assets/logo.svg';

interface LogInFormValues {
  username: string;
  password: string;
}

export function LogIn(): React.ReactElement {
  const [isRememberMe, setIsRememberMe] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const authStore = useStore(AuthRepository);
  const username = useStore(CommonStorageStore).get('username') ?? 'admin@chat.io';
  const { enqueueSnackbar } = useSnackbar();

  const { pathname: from = '/' } = location.state?.from || {};

  const onSubmit = useCallback(
    (values: LogInFormValues, formHelpers: FormikHelpers<LogInFormValues>) => {
      return authStore
        .logIn(values)
        .then(() => {
          // Send them back to the page they tried to visit when they were
          // redirected to the login page. Use { replace: true } so we don't create
          // another entry in the history stack for the login page.  This means that
          // when they get to the protected page and click the back button, they
          // won't end up back on the login page, which is also really nice for the
          // user experience.
          analytics.event('login', { method: 'onsite' });
          navigate(from, { replace: true });
        })
        .catch(err => {
          let message = '';
          switch (err.code) {
            case 'unauthorized': {
              message = 'Invalid username or password';
              break;
            }
            default:
              message = err.message;
          }
          enqueueSnackbar(message, { variant: 'error' });

          // On error from backend we clear-up password field without validation
          formHelpers.setFieldValue('password', '', false);
          throw err;
        });
    },
    [authStore, enqueueSnackbar, from, navigate]
  );

  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        username: Yup.string().required('Please enter your e-mail').email('Invalid e-mail address'),
        password: Yup.string().required('Please enter your password'),
      }),
    []
  );

  const isThereUsername = Boolean(username);
  return (
    <div className="flex flex-col bg-white pb-12 pt-24">
      <div className="container flex items-center justify-center">
        <div className="Content flex w-full max-w-sm flex-col items-center justify-start gap-8">
          <div className="Header flex h-36 flex-col items-center justify-start gap-6 self-stretch">
            <div className="h-16 w-16">
              <LogoIcon className="h-full w-full" />
            </div>
            <div className="TextAndSupportingText flex h-20 flex-col items-start justify-start gap-3 self-stretch">
              <div className="Text self-stretch text-center text-3xl font-semibold text-gray-900">Welcome back</div>
              <div className="SupportingText self-stretch text-center text-slate-600">
                Welcome back! Please enter your details.
              </div>
            </div>
          </div>

          <Form<LogInFormValues>
            onSubmit={onSubmit}
            initialValues={{ username, password: '' }}
            validationSchema={validationSchema}
            name="log-in"
          >
            <FormLayout>
              <InputField name="username" type="email" label="E-mail" autoFocus={!isThereUsername} />
              <InputField
                name="password"
                type="password"
                label="Password"
                autoFocus={isThereUsername}
                autoComplete="current-password"
              />

              <div className="Row inline-flex w-full items-center justify-between">
                <Checkbox value={isRememberMe} onChange={setIsRememberMe}>
                  Remember me
                </Checkbox>
                <Button variant="linkColor" href="/reset-password">
                  Forgot password
                </Button>
              </div>

              <FormButton type="submit" variant="primary" size="lg" isIgnoreValidation>
                Log in
              </FormButton>
            </FormLayout>
          </Form>

          <div className="Row inline-flex justify-center gap-1 self-stretch">
            <div className="Text text-sm text-slate-600">Don’t have an account?</div>
            <Button variant="linkColor" href="/sign-up">
              Sign up
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
