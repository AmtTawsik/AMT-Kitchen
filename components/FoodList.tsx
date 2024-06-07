'use client'

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import FoodItemCard from './FoodItemCard';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { addItem, editItem } from '../store/store';
import { FoodItem } from '../types/types';
import toast from 'react-hot-toast';

const FoodList: React.FC = () => {
    const items = useSelector((state: RootState) => state.food.items);
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<FoodItem | null>(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleAdd = () => {
        setEditingItem(null);
        setName('');
        setDescription('');
        setOpen(true);
    };

    const handleEdit = (item: FoodItem) => {
        setEditingItem(item);
        setName(item.name);
        setDescription(item.description);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const isFormValid = name.trim() !== '' && description.trim() !== '';
    const handleSave = () => {
        if (editingItem) {
            dispatch(editItem({ ...editingItem, name, description }));
            toast.success(`Item Updated Successfully`);
        } else {
            const newItem: FoodItem = {
                id: Math.max(0, ...items.map(i => i.id)) + 1,
                name,
                description,
            };
            dispatch(addItem(newItem));
            toast.success(`${name} added Successfully`);
        }
        setOpen(false);
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleAdd} className="mb-4">
                Add New Item
            </Button>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5'>
                {items.map(item => (
                    <FoodItemCard key={item.id} item={item} onEdit={handleEdit} />
                ))}
            </div>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{editingItem ? 'Edit Item' : 'Add New Item'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name"
                        type="text"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        type="text"
                        fullWidth
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary" disabled={!isFormValid}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default FoodList;
