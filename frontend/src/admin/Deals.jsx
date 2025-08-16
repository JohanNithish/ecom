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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

// =========================
// Memoized Dialog Component
// =========================
const DealsDialog = React.memo(({ open, onClose, onSubmit, control, editingId }) => (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" keepMounted>
        <DialogTitle>{editingId ? 'Edit Deals' : 'Create New Deals'}</DialogTitle>
        <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
                <Controller
                    name="deals"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <TextField {...field} label="Deals" fullWidth required />
                    )}
                />
                <Controller
                    name="description"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <TextField {...field} label="Description" fullWidth required />
                    )}
                />
            </Stack>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onSubmit} variant="contained" color="primary">
                {editingId ? 'Update' : 'Submit'}
            </Button>
        </DialogActions>
    </Dialog>
));

const Deals = () => {
    const [categories, setCategories] = useState([]);
    const [open, setOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);

    // Fetch categories
    const fetchCategories = useCallback(async () => {
        try {
            const res = await api.get('/dealmaster');
            if (res.data.success) {
                setCategories(res.data.data || []);
            } else {
                toast.error('Failed to fetch categories');
            }
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Error fetching categories');
        }
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    // React Hook Form
    const { control, handleSubmit, reset, setValue } = useForm({
        defaultValues: { deals: '', description: '' }
    });

    // Submit handler
    const onSubmit = async (data) => {
        try {
            if (editingId) {
                const res = await api.put(`/dealmaster/${editingId}`, data);
                if (res.data.success) {
                    toast.success('Deals updated!');
                    setCategories(prev =>
                        prev.map(c => c._id === editingId ? { ...c, ...data } : c)
                    );
                } else {
                    toast.error('Update failed');
                }
            } else {
                const res = await api.post('/dealmaster', data);
                if (res.data.success) {
                    toast.success('Deals created!');
                    setCategories(prev => [...prev, res.data.data]);
                } else {
                    toast.error('Insert failed');
                }
            }
            handleClose();
        } catch (err) {
            toast.error((editingId ? 'Update' : 'Insert') + ' failed: ' + err.message);
        }
    };

    // Handle dialog open for new deals
    const handleNew = () => {
        reset({ deals: '', description: '' });
        setEditingId(null);
        setOpen(true);
    };

    // Handle edit by ID
    const handleEditById = useCallback((id) => {
        const row = categories.find(c => c._id === id);
        if (row) {
            setValue('deals', row.deals);
            setValue('description', row.description);
            setEditingId(row._id);
            setOpen(true);
        }
    }, [categories, setValue]);

    // Handle delete by ID
    const handleDelete = useCallback(async (id) => {
        if (!window.confirm('Are you sure you want to delete this deals?')) return;
        try {
            const res = await api.delete(`/dealmaster/${id}`);
            if (res.data.success) {
                toast.success('Deals Deleted!');
                setCategories(prev => prev.filter(c => c._id !== id));
            } else {
                toast.error('Delete failed');
            }
        } catch (err) {
            toast.error('Delete failed: ' + err.message);
        }
    }, []);

    // Close dialog
    const handleClose = () => {
        setOpen(false);
        setEditingId(null);
        reset({ deals: '', description: '' });
    };

    // DataGrid columns
    const columns = useMemo(() => [
        { field: 'deals', headerName: 'Deals', flex: 1, minWidth: 150 },
        { field: 'description', headerName: 'Description', flex: 1, minWidth: 200 },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 0.5,
            minWidth: 120,
            sortable: false,
            filterable: false,
            renderCell: ({ id }) => (
                <div className="d-flex gap-2 align-items-center">
                    <div role="button">
                        <FontAwesomeIcon className="btn-action" onClick={() => handleEditById(id)} icon={faEdit} />
                    </div>
                    <div role="button">
                        <FontAwesomeIcon className="btn-trash" onClick={() => handleDelete(id)} icon={faTrashAlt} />
                    </div>
                </div>
            )
        }
    ], [handleEditById, handleDelete]);

    // Rows for DataGrid
    const rows = useMemo(
        () => categories.map(c => ({ ...c, id: c._id })),
        [categories]
    );

    return (
        <>
            <AdminHeader page="Deals" />

            <div className="text-end" style={{ marginBottom: 16 }}>
                <Button
                    variant="outlined"
                    color="inherit"
                    startIcon={<AddIcon />}
                    onClick={handleNew}
                >
                    New Deals
                </Button>
            </div>

            {/* Dialog for Create/Edit */}
            <DealsDialog
                open={open}
                onClose={handleClose}
                onSubmit={handleSubmit(onSubmit)}
                control={control}
                editingId={editingId}
            />

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
                    sx={{
                        '.MuiDataGrid-columnHeader': {
                            backgroundColor: '#6c7fd8',
                            color: '#fff',
                            fontWeight: '700',
                        }
                    }}
                />
            </div>
        </>
    );
};

export default Deals;
