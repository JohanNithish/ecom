import React, { useState, useEffect, useCallback, useMemo } from 'react';
import AdminHeader from '../comp/AdminHeader';
import { toast } from 'react-toastify';
import api from '../api/axios';
import { DataGrid } from '@mui/x-data-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const ListUser = () => {
  const [users, setUsers] = useState([]);

  // Fetch users
  const fetchUsers = useCallback(async () => {
    try {
      const res = await api.get('/user'); // <-- adjust API endpoint
      if (res.data.success) {
        setUsers(res.data.data || []);
      } else {
        toast.error('Failed to fetch users');
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Error fetching users');
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Delete user
  const handleDelete = useCallback(
    async (id) => {
      if (window.confirm('Are you sure you want to delete this user?')) {
        try {
          const res = await api.delete(`/users/${id}`); // <-- adjust API endpoint
          if (res.data.success) {
            toast.success(res.data.message);
            fetchUsers();
          } else {
            toast.error(res.data.message || 'Deletion failed');
          }
        } catch (err) {
          toast.error(err?.response?.data?.message || 'Error deleting user');
        }
      }
    },
    [fetchUsers]
  );

  // Columns according to your schema
  const columns = useMemo(
    () => [
      { field: 'firstName', headerName: 'First Name', flex: 1, minWidth: 150 },
      { field: 'lastName', headerName: 'Last Name', flex: 1, minWidth: 150 },
      { field: 'email', headerName: 'Email', flex: 1.5, minWidth: 200 },
      { field: 'phoneNumber', headerName: 'Phone Number', flex: 1, minWidth: 150 },
      { field: 'address', headerName: 'Address', flex: 1.5, minWidth: 200 },
      { field: 'country', headerName: 'Country', flex: 1, minWidth: 120 },
      { field: 'state', headerName: 'State', flex: 1, minWidth: 120 },
      { field: 'city', headerName: 'City', flex: 1, minWidth: 120 },
      { field: 'postCode', headerName: 'Post Code', flex: 1, minWidth: 120 },
      {
        field: 'actions',
        headerName: 'Actions',
        flex: 0.5,
        minWidth: 100,
        sortable: false,
        filterable: false,
        renderCell: (params) => (
          <div className="d-flex gap-2 align-items-center">
            <div role="button" onClick={() => handleDelete(params.id)}>
              <FontAwesomeIcon className="btn-trash" icon={faTrashAlt} />
            </div>
          </div>
        ),
      },
    ],
    [handleDelete]
  );

  // Rows
  const rows = useMemo(
    () =>
      users.map((u) => ({
        ...u,
        id: u._id, // important for DataGrid
      })),
    [users]
  );

  return (
    <>
      <AdminHeader page="Users" />

      <div>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          disableSelectionOnClick
          autoHeight
          density="comfortable"
          sx={{
            '.MuiDataGrid-columnHeader': {
              backgroundColor: '#6c7fd8',
              color: '#fff',
              fontWeight: '700',
            },
          }}
        />
      </div>
    </>
  );
};

export default ListUser;
