import React, { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import AdminHeader from '../comp/AdminHeader';
import { toast } from 'react-toastify';
import axios from 'axios';

// Joy UI imports
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import ModalClose from '@mui/joy/ModalClose';
import IconButton from '@mui/joy/IconButton';

// Icons
import Add from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ category: '', description: '' });
  const [editingId, setEditingId] = useState(null);

  // Table columns
  const columns = useMemo(
    () => [
      { accessorKey: 'category', header: 'Category', size: 250 },
      { accessorKey: 'description', header: 'Description', size: 200 },
      {
        accessorKey: 'action',
        header: 'Action',
        size: 100,
        Cell: ({ row }) => (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <IconButton
              size="sm"
              color="primary"
              onClick={() => handleEdit(row.original)}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              size="sm"
              color="danger"
              onClick={() => handleDelete(row.original._id)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({ columns, data: categories });

  // Form change handler
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/v1/master/');
      if (res.data.success) {
        setCategories(res.data.data || []);
      } else {
        toast.error('Failed to fetch categories');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error fetching categories');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Add or update category
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (editingId) {
        // UPDATE
        const res = await axios.put(`http://localhost:8000/api/v1/master/${editingId}`, {
          category: formData.category,
          description: formData.description,
          modifieBy: 1,
          modifiedAt: new Date(),
        });
        if (res.data.success) {
          toast.success('Category updated successfully!');
        } else {
          toast.error('Update failed');
        }
      } else {
        // CREATE
        const res = await axios.post('http://localhost:8000/api/v1/master/', {
          category: formData.category,
          description: formData.description,
          createdBy: 1,
          modifieBy: 1,
        });
        if (res.data.success) {
          toast.success('Category inserted successfully!');
        } else {
          toast.error('Insert failed');
        }
      }

      setOpen(false);
      setFormData({ category: '', description: '' });
      setEditingId(null);
      fetchCategories();
    } catch (err) {
      console.error(err);
      toast.error((editingId ? 'Update' : 'Insert') + ' failed: ' + err.message);
    }
  };

  // Edit button click
  const handleEdit = (category) => {
    setFormData({
      category: category.category,
      description: category.description,
    });
    setEditingId(category._id);
    setOpen(true);
  };

  // Delete category
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        const res = await axios.delete(`http://localhost:8000/api/v1/master/${id}`);
        if (res.data.success) {
          toast.success('Category deleted successfully');
          fetchCategories();
        } else {
          toast.error('Delete failed');
        }
      } catch (err) {
        console.error(err);
        toast.error('Delete failed: ' + err.message);
      }
    }
  };

  return (
    <>
      <AdminHeader page="Category" />

      <div className="text-end">
        <Button
          variant="soft"
          color="neutral"
          startDecorator={<Add />}
          onClick={() => {
            setFormData({ category: '', description: '' });
            setEditingId(null);
            setOpen(true);
          }}
          sx={{ mb: 2 }}
        >
          New Category
        </Button>
      </div>

      {/* Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>{editingId ? 'Edit Category' : 'Create New Category'}</DialogTitle>
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <DialogContent>
            {editingId
              ? 'Update the information of the category.'
              : 'Fill in the information of the category.'}
          </DialogContent>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Category Name</FormLabel>
                <Input
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  autoFocus
                  required
                />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </FormControl>
              <Button type="submit">
                {editingId ? 'Update' : 'Submit'}
              </Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>

      {/* Table */}
      <MaterialReactTable table={table} />
    </>
  );
};

export default Category;
