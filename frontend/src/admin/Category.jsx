import React, { useState, useEffect, useCallback, useMemo } from 'react';
import AdminHeader from '../comp/AdminHeader';
import { toast } from 'react-toastify';
import api from "../api/axios";

// MUI Core
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';

// MUI X DataGrid
import { DataGrid } from '@mui/x-data-grid';

// React Hook Form
import { useForm, Controller } from 'react-hook-form';
import debounce from 'lodash.debounce';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    try {
      const res = await api.get('/master');
      if (res.data.success) setCategories(res.data.data || []);
      else toast.error('Failed to fetch categories');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Error fetching categories');
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // React Hook Form
  const { control, handleSubmit, reset } = useForm({
    defaultValues: { category: '', description: '' }
  });

  // Debounced update
  const debouncedChange = useCallback(debounce((field, value) => {}, 200), []);

  // Submit handler
  const onSubmit = async (data) => {
    try {
      if (editingId) {
        const res = await api.put(`/master/${editingId}`, data);
        if (res.data.success) {
          toast.success('Category updated!');
          setCategories(prev => prev.map(c => c._id === editingId ? { ...c, ...data } : c));
        } else toast.error('Update failed');
      } else {
        const res = await api.post('/master', data);
        if (res.data.success) {
          toast.success('Category created!');
          setCategories(prev => [...prev, res.data.data]);
        } else toast.error('Insert failed');
      }
      setOpen(false);
      reset({ category: '', description: '' });
      setEditingId(null);
    } catch (err) {
      toast.error((editingId ? 'Update' : 'Insert') + ' failed: ' + err.message);
    }
  };

  // Edit
  const handleEdit = useCallback((row) => {
    reset({ category: row.category, description: row.description });
    setEditingId(row._id);
    setOpen(true);
  }, [reset]);

  // Delete
  const handleDelete = useCallback(async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    try {
      const res = await api.delete(`/master/${id}`);
      if (res.data.success) {
        toast.success('Category Deleted!');
        setCategories(prev => prev.filter(c => c._id !== id));
      } else toast.error('Delete failed');
    } catch (err) {
      toast.error('Delete failed: ' + err.message);
    }
  }, []);

  // DataGrid columns
  const columns = useMemo(() => [
    { field: 'category', headerName: 'Category', flex: 1, minWidth: 150 },
    { field: 'description', headerName: 'Description', flex: 1, minWidth: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 0.5,
      minWidth: 120,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <div className="d-flex gap-2 align-items-center">
          <div role="button">
          <FontAwesomeIcon className="btn-action"  onClick={() => handleEdit(params.row)} icon={faEdit} />  
          </div>
          <div role="button">
          <FontAwesomeIcon className="btn-trash" onClick={() => handleDelete(params.row.id)} icon={faTrashAlt} />
            </div>
        </div>
      )
    }
  ], [handleEdit, handleDelete]);

  // Rows with unique `id` for DataGrid
  const rows = useMemo(() => categories.map(c => ({ ...c, id: c._id })), [categories]);

  return (
    <>
      <AdminHeader page="Category" />

      <div className="text-end" style={{ marginBottom: 16 }}>
        <Button
        variant="outlined"
  color="inherit"
           startIcon={<AddIcon />}
          onClick={() => { reset({ category: '', description: '' }); setEditingId(null); setOpen(true); }}
        >
          New Category
        </Button>
      </div>

      {/* Dialog for Create/Edit */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editingId ? 'Edit Category' : 'Create New Category'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Category Name"
                  fullWidth
                  required
                  onChange={(e) => {
                    field.onChange(e);
                    debouncedChange('category', e.target.value);
                  }}
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  fullWidth
                  required
                  onChange={(e) => {
                    field.onChange(e);
                    debouncedChange('description', e.target.value);
                  }}
                />
              )}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit(onSubmit)} variant="contained" color="primary">
            {editingId ? 'Update' : 'Submit'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* DataGrid Table */}
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          disableSelectionOnClick
          autoHeight
          density="comfortable"
        />
      </div>
    </>
  );
};

export default Category;
