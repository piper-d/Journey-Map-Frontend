import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, Typography, Button, Box, Container, Grid, Dialog, DialogTitle, TextField } from '@mui/material';
import Map from './Map';
import { useNavigate } from 'react-router-dom';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ImageUploader from './ImageUploader';

import EditIcon from '@mui/icons-material/Edit';

interface CardData {
    title: string;
    details: any;
    id: any;
    point_coords: any;
    date: string;
    timestamp: any;
}

interface TripPageProps {
    card: CardData;
}

function formatDate(timestamp: any): string {
    if (typeof timestamp === 'object') {
        timestamp = timestamp._seconds
    } else {
        timestamp = timestamp / 1000
    }

    const date = new Date(timestamp * 1000);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();

    return `Time: ${formattedTime.toString()} ${formattedDate.toString()}`;
}

const TripPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { card }: TripPageProps = location.state;
    const token = sessionStorage.getItem("accessToken") || localStorage.getItem("accessToken")
    const [apiResponse, setApiResponse] = useState<string>('');
    const [isLoading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');

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
            const response = await axios.put(`/trips/${card.id}`,
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

    const handleExport = () => {
        setLoading(true)
        console.log(card.id)
        console.log(token)
        axios.get(`/trips/${card.id}/export`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response => {
                setLoading(false)
                console.log(response)
                setApiResponse(response.data.downloadLink);
            }))
            // .catch((error) => {
            //     console.error(error);
            // });
    };

    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete the trip "${card.title}"?`)) {
            axios.delete(`/trips/${card.id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then((response => {
                    console.log(response)
                    navigate('/home');
                }))
                .catch((error) => {
                    console.error(error);
                });
        }

    };

    return (
        <Box
            sx={{
                my: 5,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <Container maxWidth='lg'>
                <Card>
                    <CardContent>
                        <Map trip={card} />
                        <Typography gutterBottom variant="h5" component="h2" sx={{ marginTop: 1 }}>
                            {card.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Average Pace: {card.details.average_speed} / mile
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Duration: {Math.round(card.details.duration / 60)} minutes
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Distance Traveled: {Math.round(card.details.distance * 100) / 100} miles
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            {formatDate(card.details.start_time)}
                        </Typography>
                        <Grid container spacing={2} sx={{ marginTop: 2 }}>
                            <Grid item xs={4}>
                                <Button variant="contained" startIcon={<FileDownloadIcon />} fullWidth onClick={handleExport}>
                                    Export
                                </Button>
                            </Grid>
                            <Grid item xs={4}>
                                <Button variant="contained" startIcon={<EditIcon />} fullWidth onClick={handleOpen}>
                                    Edit
                                </Button>
                                <Dialog open={open} onClose={handleClose}>
                                    <DialogTitle>Change Title</DialogTitle>
                                    <TextField label="Title" value={title} onChange={handleTitleChange} />
                                    <Button onClick={handleSubmit}>Submit</Button>
                                </Dialog>
                            </Grid>
                            <Grid item xs={4}>
                                <Button variant="contained" color="error" startIcon={<DeleteForeverIcon />} fullWidth onClick={handleDelete}>
                                    Delete
                                </Button>
                            </Grid>
                        </Grid>
                        <ImageUploader tripId={card.id} />
                        {apiResponse && (
                            <Typography variant="body1" sx={{ marginTop: 2 }} color="text.secondary">
                                {/* <VideoEmbed url={apiResponse}/> */}
                                Download Link: <a href={apiResponse}>{apiResponse}</a>
                            </Typography>
                        )}
                    </CardContent>
                </Card>
            </Container>

        </Box>
    );
};

export default TripPage;