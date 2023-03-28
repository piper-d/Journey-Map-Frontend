import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, TextField } from '@mui/material';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';


const TitleUpdateButton: React.FunctionComponent<any> = (trip) => {
    const tripData = trip.trip;
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const token = sessionStorage.getItem("accessToken") || localStorage.getItem("accessToken")

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const PutUserData = async (token: any, data: { title: string }) => {
        try {
            const response = await axios.put(`/trips/${tripData.id}`,
                {
                    ...data
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then((response) => {
                    handleClose();
                    navigate('/home');
                });
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = () => {
        const data = {
            title: title
        }
        PutUserData(token, data)
    }

    return (
        <>
            <Button variant="contained" sx={{ marginTop: 2 }} startIcon={<EditIcon />}  onClick={handleOpen}>
                Edit
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Change Title</DialogTitle>
                <TextField label="Title" value={title} onChange={handleTitleChange} />
                <Button onClick={handleSubmit}>Submit</Button>
            </Dialog>
        </>
    );
};

export default TitleUpdateButton;
