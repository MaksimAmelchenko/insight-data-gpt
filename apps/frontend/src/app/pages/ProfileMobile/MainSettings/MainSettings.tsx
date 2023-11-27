import React, { useCallback, useMemo } from 'react';
import * as Yup from 'yup';
import clsx from 'clsx';
import { observer } from 'mobx-react-lite';
import { useSnackbar } from 'notistack';

import { Form, FormBody, FormButton, InputField, SelectNativeField } from '../../../components/Form';
import { ProfileRepository } from '../../../stores/profile-repository';
import { UpdateProfileChanges } from '../../../types/profile';
import { getPatch } from '../../../lib/core/get-patch';
import { useStore } from '../../../core/hooks/use-store';

import styles from '../ProfileMobileContent.module.scss';

const selectThemeOptions = [
  { value: 'system', label: 'System' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
];

interface IFormValues {
  name: string;
  email: string;
  theme: string;
}

export const MainSettings = observer(() => {
  const profileRepository = useStore(ProfileRepository);
  const { enqueueSnackbar } = useSnackbar();

  const { profile } = profileRepository;

  const onSubmit = useCallback(
    ({ name }: IFormValues) => {
      if (!profile) {
        return;
      }
      const changes: UpdateProfileChanges = getPatch({ name: profile.name }, { name });

      return profileRepository.updateProfile(changes).then(() => {
        enqueueSnackbar('Profile has been updated', { variant: 'success' });
      });
    },
    [profile, profileRepository, enqueueSnackbar]
  );

  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        name: Yup.string().required('Please enter name'),
      }),
    []
  );

  if (!profile) {
    return null;
  }

  const { name, email } = profile;

  return (
    <div className={styles.section}>
      <div className={clsx(styles.section__header, styles.header)}>
        <h2 className={styles.header__title}>Main settings</h2>
      </div>

      <Form<IFormValues>
        onSubmit={onSubmit}
        initialValues={{ name, email, theme: 'light' }}
        validationSchema={validationSchema}
        name="profile-settings-mobile"
      >
        <FormBody>
          <SelectNativeField name="theme" label="Theme" options={selectThemeOptions} />
          <InputField name="email" type="email" label="E-mail" readOnly disabled />
          <InputField name="name" type="text" label="Name" />
        </FormBody>

        <footer className={styles.section__footer}>
          <FormButton type="submit" variant="primary" size="sm" isIgnoreValidation>
            Update profile settings
          </FormButton>
        </footer>
      </Form>
    </div>
  );
});
