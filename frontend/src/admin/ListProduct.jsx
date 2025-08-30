import React, { useState, useEffect, useCallback, useMemo } from 'react';
import AdminHeader from '../comp/AdminHeader';
import { toast } from 'react-toastify';
import api from '../api/axios';
import { DataGrid } from '@mui/x-data-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTags, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { Tooltip } from '@mui/material';

const ListProduct = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const ImgSrc = import.meta.env.VITE_IMG;
  // Fetch products
  const fetchProducts = useCallback(async () => {
    try {
      const res = await api.get('/products');
      if (res.data.success) {
        setProducts(res.data.data || []);
      } else {
        toast.error('Failed to fetch products');
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Error fetching products');
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Delete product
  const handleDelete = useCallback(
    async (id) => {
      if (window.confirm('Are you sure you want to delete this product?')) {
        try {
          const res = await api.delete(`/products/${id}`);
          if (res.data.success) {
            toast.success(res.data.message);
            fetchProducts();
          } else {
            toast.error(res.data.message || 'Deletion failed');
          }
        } catch (err) {
          toast.error(err?.response?.data?.message || 'Error deleting product');
        }
      }
    },
    [fetchProducts]
  );

  // Edit product
  const handleEditById = useCallback((id) => {
    window.location.href = `/admin/addproduct?id=${id}`;
  }, []);


  // Columns
  const columns = useMemo(
    () => [
      {
        field: 'image',
        headerName: 'Image',
        flex: 0.5,
        minWidth: 80,
        sortable: false,
        renderCell: (params) => {
          const images = params.row.images;
          const dealIcon =
            params.row.isdeal == 1 && (
              <Tooltip title="It's a Deal" placement="top">
              <FontAwesomeIcon icon={faTags} style={{ marginLeft: 8, color: "#519d28" }} /></Tooltip>
            ) ;
          if (images && images.length > 0) {
            // Replace backslashes with forward slashes for URL
            const firstImage = images[0].replace(/\\/g, '/');
            return (<>
              <img
                src={`${ImgSrc + firstImage}`}
                alt="Product"
                style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 4 }}
              />
              {dealIcon}
            </>);
          } else {
            return <><span>No Image</span>{dealIcon}</>;
          }
        },
      },
      { field: 'productname', headerName: 'Product Name', flex: 1, minWidth: 150 },
      { field: 'category', headerName: 'Category', flex: 1, minWidth: 150 },
      { field: 'sku', headerName: 'SKU', flex: 1, minWidth: 120 },
      { field: 'url', headerName: 'URL', flex: 1, minWidth: 120 },
      {
        field: 'actions',
        headerName: 'Actions',
        flex: 0.5,
        minWidth: 120,
        sortable: false,
        filterable: false,
        renderCell: (params) => (
          <div className="d-flex gap-2 align-items-center">
            <div role="button" onClick={() => navigate(`/admin/addproduct`, { state: { id: params.id.toString() } })}>
              <FontAwesomeIcon className="btn-action" icon={faEdit} />
            </div>
            <div role="button" onClick={() => handleDelete(params.id)}>
              <FontAwesomeIcon className="btn-trash" icon={faTrashAlt} />
            </div>
          </div>
        ),
      },
    ],
    [handleEditById, handleDelete]
  );

  // Rows
  const rows = useMemo(
    () =>
      products.map((p) => ({
        ...p,
        id: p._id,
      })),
    [products]
  );

  return (
    <>
      <AdminHeader page="Products" />

      <div className="text-end" style={{ marginBottom: 16 }}>
        <Link to="/admin/addproduct" className="btn btn-primary">
          New Product
        </Link>
      </div>

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

export default ListProduct;
