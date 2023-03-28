import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField } from '@mui/material';
import exifr from 'exifr'

const ImageUploader: React.FunctionComponent<any> = (tripId) => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [location, setLocation] = useState<{ lat?: number; lng?: number }>({});
    const token = sessionStorage.getItem("accessToken");

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        console.log(files)
        if (files && files.length > 0) {
            setSelectedImage(files[0]);

            exifr.gps(files[0]).then(gps => {
                setLocation({ lat: gps.latitude, lng: gps.longitude })
            })
        }
    };

    const handleSubmit = () => {
        try {
            if (!selectedImage) return;
            const extension = selectedImage.name.split('.').pop();

            const data = {
                latitude: location.lat?.toString() ?? '',
                longitude: location.lng?.toString() ?? '',
                image: selectedImage,
                extension: extension ?? ''
            }
            PutUserData(token, data, tripId.tripId)

        } catch (error) {
            console.error(error);
        }

    }

    const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setLocation(prevLocation => ({
            ...prevLocation,
            lat: name === 'lat' ? Number(value) : prevLocation?.lat || undefined,
            lng: name === 'lng' ? Number(value) : prevLocation?.lng || undefined
        }));
    };

    const PutUserData = async (token: any, data: any, tripId: string) => {
        try {
            const formData = new FormData();
            formData.append('latitude', data.latitude);
            formData.append('longitude', data.longitude);
            formData.append('image', data.image);
            formData.append('extension', data.extension);

            const response = await axios.post(`/trips/${tripId}/media`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log(response)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <input type="file" onChange={handleImageChange} />
            <br />
            <br />
            <TextField
                label="Latitude"
                type="number"
                value={location.lat || ''}


                name="lat"
                onChange={handleLocationChange}
            />
            <br />
            <br />
            <TextField
                label="Longitude"
                type="number"
                value={location.lng || ''}
                name="lng"
                onChange={handleLocationChange}
            />
            <br />
            <br />
            <Button variant="contained" onClick={handleSubmit}>
                Upload Image
            </Button>
        </div>
    );
};

export default ImageUploader;
