import { useParams } from 'react-router-dom';
import { UserForm } from './user-form';
import { Box, Typography } from '@mui/material';
import { BoxLoading } from '@packages/molecules';
import { IUser } from '@packages/common';
import { useEffect } from 'react';
import { useGetUserByIdQuery } from '../../auth';

const initialUser: IUser = {
  id: 0,
  username: '',
  password: '',
  first_name: '',
  last_name: '',
  role: 'admin',
};

export const UserDetailContainer = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: userData,
    isLoading,
    refetch,
  } = useGetUserByIdQuery(id as string, {
    skip: id === 'new',
  });

  const user = id === 'new' ? initialUser : (userData ?? null);

  useEffect(() => {
    if (id === 'new') {
      return;
    }

    refetch();
  }, [id, refetch]);

  if (isLoading) {
    return <BoxLoading />;
  }

  return (
    <Box
      p={2}
      sx={{
        backgroundColor: (theme) => theme.palette.background.paper,
        borderRadius: '10px',
        minHeight: '650px',
      }}
    >
      <Typography variant="h5" textAlign="left" gutterBottom>
        {id === 'new' ? 'Add New User' : 'Edit User'}
      </Typography>
      <UserForm user={user} />
    </Box>
  );
};
