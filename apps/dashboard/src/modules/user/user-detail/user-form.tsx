import { FC, useMemo } from 'react';
import { FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { Box } from '@mui/material';
import { PrimaryButton } from '@packages/atoms';
import { IUser } from '@packages/common';
import { FormikTextField } from '@packages/molecules';
import { useDashboardAlert } from '../../../hooks';
import { useAddUserMutation, useUpdateUserMutation } from '../../auth';

interface UserFormProps {
  user: IUser | null;
}

export const UserForm: FC<UserFormProps> = ({ user }) => {
  useDashboardAlert();
  const [addUser, { isLoading: isAdding }] = useAddUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  console.log('user', user);
  const validationSchema = useMemo(() => {
    return Yup.object({
      username: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string().required('Required'),
      first_name: Yup.string().required('Required'),
      last_name: Yup.string().required('Required'),
      role: Yup.string().required('Required'),
    });
  }, []);

  const formik = useFormik({
    initialValues: {
      id: user?.id ?? 0,
      username: user?.username ?? '',
      password: user?.password ?? '',
      first_name: user?.first_name ?? '',
      last_name: user?.last_name ?? '',
      role: user?.role ?? 'admin',
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values: IUser) => {
      const rest = Object.assign({}, values);
      delete rest.id;
      if (values.id) {
        await updateUser(values).unwrap();
      } else {
        await addUser(rest).unwrap();
      }
    },
  });

  return (
    <Box display="flex" mt={3}>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <Box mb={2} sx={{ width: 500 }}>
            <FormikTextField name="username" label="Username" />
          </Box>
          <Box mb={2} sx={{ width: 500 }}>
            <FormikTextField name="password" label="Password" type="password" />
          </Box>
          <Box mb={2}>
            <FormikTextField name="first_name" label="First Name" />
          </Box>
          <Box mb={2}>
            <FormikTextField name="last_name" label="Last Name" />
          </Box>
          <Box mb={2}>
            <FormikTextField name="role" label="Last Name" disabled />
          </Box>
          <Box display="flex" justifyContent="flex-end">
            <PrimaryButton
              type="submit"
              disabled={formik.isSubmitting || !formik.isValid || !formik.dirty}
              loading={isAdding || isUpdating}
            >
              Submit
            </PrimaryButton>
          </Box>
        </form>
      </FormikProvider>
    </Box>
  );
};
