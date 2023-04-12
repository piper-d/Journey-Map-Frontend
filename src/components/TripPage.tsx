import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, Typography, Button, Box, Container, Grid, Dialog, DialogTitle, TextField } from '@mui/material';
import Map from './Map';
import { useNavigate } from 'react-router-dom';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ImageUploader from './ImageUploader';
import topo from '../images/SpoonGraphics-Topographic-Map-4.png'
import EditIcon from '@mui/icons-material/Edit';
import Alert from '@mui/material/Alert';

interface CardData {
    title: string;
    details: any;
    id: any;
    point_coords: any;
    date: string;
    timestamp: any;
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
    const navigate = useNavigate();
    const location = useLocation();
    const card = JSON.parse(localStorage.getItem('card') || '') as CardData | null;
    const token = sessionStorage.getItem("accessToken") || localStorage.getItem("accessToken")
    const [apiResponse, setApiResponse] = useState<string>('');
    const [isLoading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [tripData, setTripData] = useState<CardData | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>('');

    useEffect(() => {
        // Fetch the trip data from the API and update the state
        const fetchTripData = async () => {
            if (token && card) {
                try {
                    const response = await axios.get(`/trips/${card.id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    const dataWithId = { ...response.data.data, id: card.id };
                    setTripData(dataWithId);
                    if (dataWithId) {
                        localStorage.setItem('card', JSON.stringify(dataWithId));
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        };
        fetchTripData();
    }, []);

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
        if (card) {
            await axios.put(`/trips/${card.id}`,
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
                    window.location.reload()
                });
        }
    }

    const handleSubmit = () => {
        const data = {
            title: title
        }
        PutUserData(token, data)
    }

    const handleExport = () => {
        try {
            if (card) {
                setLoading(true);
                axios.get(`/trips/${card.id}/export`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then((response) => {
                        console.log(response)
                        setLoading(false);
                        if (response.status === 200) {
                            setApiResponse(response.data.downloadLink);
                            setErrorMessage('');
                        } else if (response.status === 400) {
                            setErrorMessage('Trip must have media to export.');
                        }
                    })
                    .catch((error) => {
                        setLoading(false);
                        console.log(error);
                        setErrorMessage('Something went wrong. Please try again.');
                    });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = () => {
        if (card) {
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
        }
    };

    if (!card) {
        return <div>Loading...</div>;
    }

    return (
        <Box
            sx={{
                backgroundImage: `url(${topo})`,
                backgroundRepeat: 'repeat',
                display: 'flex',
                justifyContent: 'center',
                height: '100vh',
            }}>
            <Container maxWidth='xl' sx={{ marginTop: 10 }}>
                <Card>
                    <CardContent>
                        {card ? (
                            <>
                                <Map trip={card} />
                                <Typography gutterBottom variant="h5" component="h2" sx={{ marginTop: 1 }}>
                                    {tripData?.title}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Average Pace: {tripData?.details.average_speed} / mile
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Duration: {Math.round(tripData?.details.duration / 60)} minutes
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Distance Traveled: {Math.round(tripData?.details.distance * 100) / 100} miles
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    {formatDate(tripData?.details.start_time)}
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
                                <ImageUploader tripId={tripData?.id} />
                                {errorMessage && (
                                    <Alert severity="error" sx={{ marginTop: 2 }}>{errorMessage}</Alert>
                                )}
                                {apiResponse && (
                                    <Typography variant="body1" sx={{ marginTop: 2 }} color="text.secondary">
                                        {/* <VideoEmbed url={apiResponse}/> */}
                                        Download Link: <a href={apiResponse}>{apiResponse}</a>
                                    </Typography>
                                )}
                            </>
                        ) : (
                            <Typography variant="body1" color="text.secondary">
                                No trip data available
                            </Typography>
                        )}

                    </CardContent>
                </Card>
            </Container>

        </Box>
    );
};

export default TripPage;