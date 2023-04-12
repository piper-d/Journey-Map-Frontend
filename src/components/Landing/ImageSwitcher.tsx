import React, { useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, Box } from '@mui/material';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import InventoryIcon from '@mui/icons-material/Inventory';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import archive from '../../images/ArchivePage.png'
import create from '../../images/CreatePage.png'
import edit from '../../images/EditTrip.png'
import { useTheme } from '@mui/material/styles';

const cardsData = [
    {
        title: 'Start Your Trip!',
        description: 'Time to start your adventure, on this page you can begin tracking your location',
        icon: <PlayCircleFilledIcon fontSize="large" />,
        image: create,
    },
    {
        title: 'View Your Past Trips!',
        description: 'Relive your memories and view metadata from your trip',
        icon: <InventoryIcon fontSize="large" />,
        image: archive,
    },
    {
        title: 'Upload Images!',
        description: 'Easily upload images and share them.',
        icon: <AddAPhotoIcon fontSize="large" />,
        image: edit,
    },
];

export default function ImageSwitcher() {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeImage = cardsData[activeIndex].image;

    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    const backgroundColor = isDarkMode ? theme.palette.background.default : '#fff';
    const cardColor = isDarkMode ? '#383B44' : '#fff';
    const textColor = theme.palette.text.primary;

    const handleCardClick = (index: React.SetStateAction<number>) => {
        setActiveIndex(index);
    };

    return (
        <Box sx={{ backgroundColor, paddingTop: 8, paddingBottom: 4 }}>
            <Container maxWidth="xl">
                <Grid container spacing={1} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <img src={activeImage} alt="Mobile app screenshot" style={{ width: '70%', height: 'auto' }} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Grid container spacing={6}>
                            {cardsData.map((card, index) => (
                                <Grid item xs={12} key={index}>
                                    <Card
                                        sx={{
                                            boxShadow: 'rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px',
                                            cursor: 'pointer',
                                            minHeight: '150px',
                                            backgroundColor: index === activeIndex ? theme.palette.action.hover : cardColor,
                                        }}
                                        onClick={() => handleCardClick(index)}
                                    >
                                        <CardContent>
                                            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                                                {card.icon}
                                                <Typography variant="h6" sx={{ marginLeft: 1 }}>
                                                    {card.title}
                                                </Typography>
                                            </Box>
                                            <Typography variant="body1">{card.description}</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
