import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField } from '@mui/material';
import exifr from 'exifr'
import { useNavigate } from 'react-router-dom';

const ImageUploader: React.FunctionComponent<any> = (tripId) => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [location, setLocation] = useState<{ lat?: number; lng?: number }>({});
    const token = sessionStorage.getItem("accessToken");
    const navigate = useNavigate();
    const [inputCoordinates, setInputCoordinates] = useState<boolean>(false);
    const [imageFileName, setImageFileName] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);


    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setSelectedImage(files[0]);
            setImageFileName(files[0].name); // Store the image file name

            exifr.gps(files[0]).then((gps) => {
                if (gps && gps.latitude && gps.longitude) {
                    setLocation({ lat: gps.latitude, lng: gps.longitude });
                    setInputCoordinates(false);
                } else {
                    setInputCoordinates(true);
                }
            });
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
            PutTripData(token, data, tripId.tripId)

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

    const PutTripData = async (token: any, data: any, tripId: string) => {
        try {
            setLoading(true); // Set loading state to true before making the API call

            const formData = new FormData();
            formData.append('latitude', data.latitude);
            formData.append('longitude', data.longitude);
            formData.append('image', data.image);
            formData.append('extension', data.extension);

            await axios.post(`/trips/${tripId}/media`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                setLoading(false); // Reset loading state after the API call is completed
                setUploadSuccess(true); // Set upload success state based on the API response

                // Refresh the page after a short delay
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            });

        } catch (error) {
            setLoading(false); // Reset loading state if there's an error
            console.log(error);
        }
    }

    const inputFileRef = React.useRef<HTMLInputElement | null>(null);

    const handleButtonClick = () => {
        if (inputFileRef.current) {
            inputFileRef.current.click();
        }
    };

    return (
        <div>
            <input
                ref={inputFileRef}
                type="file"
                onChange={handleImageChange}
                style={{ display: 'none' }}
            />
            <Button variant="outlined" onClick={handleButtonClick}>
                Choose Image
            </Button>
            {imageFileName && (
                <>
                    <br />
                    <br />
                    <span>Selected image: {imageFileName}</span>
                    <br />
                    <br />
                </>
            )}
            {loading && (
                <span>Loading...</span>
            )}
            {uploadSuccess && (
                <span>Image has been successfully uploaded!</span>
            )}
            {inputCoordinates && (
                <>
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
                </>
            )}
            <Button variant="contained" onClick={handleSubmit}>
                Upload Image
            </Button>
        </div>
    );
};

export default ImageUploader;
