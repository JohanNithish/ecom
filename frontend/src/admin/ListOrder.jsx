import React, { useState, useEffect, useCallback, useMemo } from 'react';
import AdminHeader from '../comp/AdminHeader';
import { toast } from 'react-toastify';
import api from '../api/axios';
import { DataGrid } from '@mui/x-data-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const ListOrder = () => {
  const [orders, setOrders] = useState([]);

  // Fetch orders
  const fetchOrders = useCallback(async () => {
    try {
      const res = await api.get('/orders'); // <-- API endpoint
      if (res.data.success) {
        setOrders(res.data.data || []);
      } else {
        toast.error('Failed to fetch orders');
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Error fetching orders');
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Delete order
  const handleDelete = useCallback(
    async (id) => {
      if (window.confirm('Are you sure you want to delete this order?')) {
        try {
          const res = await api.delete(`/orders/${id}`);
          if (res.data.success) {
            toast.success(res.data.message);
            fetchOrders();
          } else {
            toast.error(res.data.message || 'Deletion failed');
          }
        } catch (err) {
          toast.error(err?.response?.data?.message || 'Error deleting order');
        }
      }
    },
    [fetchOrders]
  );

  // Columns
  const columns = useMemo(
    () => [
      { field: '_id', headerName: 'Order ID', flex: 1.5, minWidth: 220 },
      { field: 'customer', headerName: 'Customer', flex: 1, minWidth: 180 },
      { field: 'address', headerName: 'Address', flex: 2, minWidth: 250 },
      { field: 'payment_method', headerName: 'Payment', flex: 1, minWidth: 120 },
      { field: 'status', headerName: 'Status', flex: 1, minWidth: 120 },
      { field: 'createdAtFormatted', headerName: 'Created At', flex: 1, minWidth: 150 },
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

  // Rows → flatten userDetails + format dates
  const rows = useMemo(
    () =>
      orders.map((o) => {
        const { userDetails = {} } = o;

        const customer = `${userDetails.firstName || ''} ${userDetails.lastName || ''}`.trim();

        const address = [
          userDetails.address,
          userDetails.city,
          userDetails.state,
          userDetails.postCode,
          userDetails.country,
        ]
          .filter(Boolean)
          .join(', ');

        const createdAtFormatted = o.createdAt
          ? new Date(o.createdAt).toLocaleString()
          : '';

        return {
          ...o,
          id: o._id,
          customer,
          address,
          createdAtFormatted,
        };
      }),
    [orders]
  );

  return (
    <>
      <AdminHeader page="Orders" />

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
              backgroundColor: '#519d28',
              color: '#fff',
              fontWeight: '700',
            },
          }}
        />
      </div>
    </>
  );
};

export default ListOrder;
