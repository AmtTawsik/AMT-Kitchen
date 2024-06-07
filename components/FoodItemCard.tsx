import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useDispatch } from 'react-redux';
import { deleteItem } from '../store/store';
import { FoodItem } from '../types/types';
import toast from 'react-hot-toast';

interface FoodItemCardProps {
    item: FoodItem;
    onEdit: (item: FoodItem) => void;
}

const FoodItemCard: React.FC<FoodItemCardProps> = ({ item, onEdit }) => {
    const dispatch = useDispatch();
    const [openDialog, setOpenDialog] = useState(false);

    const handleDelete = () => {
        dispatch(deleteItem(item.id));
        toast.success(`Item Deleted Successfully`);
        setOpenDialog(false);
    }

    const handleOpenDialog = () => {
        setOpenDialog(true);
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    return (
        <Card className="mb-4">
            <CardContent>
                <Typography variant="h5" component="div">
                    {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {item.description}
                </Typography>
                <div className="mt-4">
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => onEdit(item)}
                        className="mr-2"
                    >
                        Edit
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleOpenDialog}
                    >
                        Delete
                    </Button>
                </div>
            </CardContent>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Delete this Item?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this item?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="secondary" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
};

export default FoodItemCard;
