import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField } from '@mui/material';
import { v4 as uuidv4 } from 'uuid'


const ImageUploader: React.FunctionComponent<any> = (tripId) => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [location, setLocation] = useState<{ lat?: number; lng?: number }>({});
    const token = sessionStorage.getItem("accessToken")

    const PutUserData = async (token: any, data: any, tripId: string) => {
        console.log({
            ...data
        })
        try {
            const response = await axios.post(`/trips/${tripId}/media`,
                {
                    ...data
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            console.log(response)
        } catch (error) {
            console.log(error);
        }
    }

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

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setSelectedImage(files[0]);
        }
    };

    const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setLocation(prevLocation => ({
            ...prevLocation,
            lat: name === 'lat' ? Number(value) : prevLocation?.lat || undefined,
            lng: name === 'lng' ? Number(value) : prevLocation?.lng || undefined
        }));
    };

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
