import { useCallback, useState, useMemo } from 'react';
import { ConfirmationModal, GenericTable } from '@packages/organisms';
import {
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
} from '@mui/x-data-grid';
import TableSearch from '@packages/organisms/src/search/table-search';
import { IUser } from '@packages/common';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { useAppNavigate, useDashboardAlert } from '../../../hooks';
import { BoxLoading } from '@packages/molecules';
import { DashboardPaths } from '../../../types';
import { useDeleteUserMutation, useGetUsersQuery } from '../../auth';

export function UserListContainer() {
  useDashboardAlert();
  const { navigateToPage } = useAppNavigate();
  const { data: users, isLoading } = useGetUsersQuery(undefined, {
    refetchOnMountOrArgChange: 1, // fresh after two minutes after the last fetch
  });
  const [deleteUser] = useDeleteUserMutation();

  const [searchString, setSearchString] = useState('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);

  const handleSearchString = useCallback((value: string) => {
    setSearchString(value);
  }, []);

  const filteredUsers = useMemo(() => {
    if (!users) {
      return [];
    }

    if (!searchString) {
      return users;
    }

    const lowerCaseSearchString = searchString.toLowerCase();

    return users.filter(
      (user) =>
        user.username.toLowerCase().includes(lowerCaseSearchString) ||
        user.first_name.toLowerCase().includes(lowerCaseSearchString) ||
        user.last_name.toLowerCase().includes(lowerCaseSearchString),
    );
  }, [searchString, users]);

  const handleButtonClick = useCallback(() => {
    navigateToPage(
      DashboardPaths.USER_DETAIL,
      'Create User',
      DashboardPaths.USER,
      'User List',
      'new',
    );
  }, [navigateToPage]);

  const handleEditClick = useCallback(
    (params: GridRowParams | GridRenderCellParams) => {
      const item = params.row as IUser;

      navigateToPage(
        DashboardPaths.USER_DETAIL,
        'Edit User',
        DashboardPaths.USER,
        'User List',
        item.id,
      );
    },
    [navigateToPage],
  );

  const handleDeleteClick = useCallback((params: GridRenderCellParams) => {
    const item = params.row as IUser;
    setSelectedDeleteId(item?.id ?? null);
    setIsOpen(true);
  }, []);

  const handleSubmitDelete = useCallback(async () => {
    if (selectedDeleteId) {
      await deleteUser(selectedDeleteId).unwrap();
    }
    setIsOpen(false);
  }, [deleteUser, selectedDeleteId]);

  const columns: GridColDef[] = useMemo(
    () => [
      { field: 'id', headerName: 'ID', width: 90 },
      {
        field: 'first_name',
        headerName: 'First Name',
        width: 150,
      },
      {
        field: 'last_name',
        headerName: 'First Name',
        width: 150,
      },
      {
        field: 'username',
        headerName: 'Username',
        flex: 1,
        sortable: true,
      },
      {
        field: 'role',
        headerName: 'Role',
        width: 150,
      },
      {
        field: 'actions',
        headerName: 'Actions',
        headerAlign: 'center',
        width: 150,
        renderCell: (params) => (
          <>
            <IconButton
              color="primary"
              onClick={() => handleEditClick(params)}
              sx={{ fontSize: '14px' }}
            >
              <EditIcon sx={{ fontSize: 18 }} /> Edit
            </IconButton>
            <IconButton
              color="secondary"
              onClick={() => handleDeleteClick(params)}
              sx={{ fontSize: '14px' }}
            >
              <DeleteIcon sx={{ fontSize: 18 }} /> Delete
            </IconButton>
          </>
        ),
      },
    ],
    [handleEditClick, handleDeleteClick],
  );

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
      <TableSearch
        searchString={searchString}
        handleSearchString={handleSearchString}
        placeholder="Search by address, phone or email"
        buttonText="Create User"
        handleButtonClick={handleButtonClick}
      />

      <GenericTable columns={columns} rows={filteredUsers ?? []} />

      {isOpen && (
        <ConfirmationModal
          title={'Confirm Delete User'}
          message={
            'By clicking confirm, this user will be removed permanently. If you are sure, press confirm.'
          }
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          handleAction={handleSubmitDelete}
        />
      )}
    </Box>
  );
}
