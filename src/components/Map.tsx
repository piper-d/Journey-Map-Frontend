import { useMemo, useCallback, useState } from "react";
import { Button } from '@mui/material';
import { GoogleMap, Polyline, OverlayView, LoadScript } from "@react-google-maps/api";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import axios from 'axios';
import CircularProgress from "@mui/material/CircularProgress";

type MapOptions = google.maps.MapOptions;
type LatLng = {
    lat: number;
    lng: number;
}

const Map: React.FunctionComponent<any> = (trip) => {
    const tripData = trip.trip
    const tripCoords = trip.trip.point_coords
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState<{
        id: string,
        imageUrl: string;
        latitude: string;
        longitude: string;
    } | null>(null);

    const markers = () => {
        const markerComponents = [];
        if (tripData.media && Object.keys(tripData.media).length > 0) {
            for (let i = 0; i < Object.keys(tripData.media).length; i++) {
                const mediaCoords = Object.keys(tripData.media)[i];
                const media = tripData.media[mediaCoords];

                console.log(media[0])
                
                if(media.length != 0) {
                    const formattedKey = {
                        lat: Number(mediaCoords.substring(mediaCoords.indexOf('(') + 1, mediaCoords.indexOf(','))),
                        lng: Number(mediaCoords.substring(mediaCoords.indexOf(',') + 1, mediaCoords.indexOf(')'))),
                    };
    
                    markerComponents.push(
                        <OverlayView
                            key={i}
                            position={formattedKey}
                            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                        >
                            <div
                                style={{
                                    position: "absolute",
                                    width: "50px",
                                    height: "50px",
                                    display: "flex",
                                    alignItems: "flex-end",
                                    transform: "translate(-50%, -100%)", // Add this line to adjust the position
                                    cursor: "pointer", // Add this line to change the cursor to a pointer when hovering over the marker
                                }}
                                onClick={() => handleOpen(media, mediaCoords, tripData.id)} // Add this line to handle clicks on the marker
                            >
                                <img
                                    src={media[0]}
                                    alt="User media"
                                    style={{
                                        width: "100%",
                                        height: "auto",
                                        borderRadius: "30%",
                                        objectFit: "cover", 
                                        boxShadow: "0 0 0 3px white, 0 0 0 6px black",
                                    }}
                                />
                                <div
                                    style={{
                                        position: "absolute",
                                        bottom: 0,
                                        left: "50%",
                                        transform: "translate(-50%, 85%)",
                                        width: 0,
                                        height: 0,
                                        borderLeft: "7px solid transparent",
                                        borderRight: "7px solid transparent",
                                        borderTop: "14px solid white",
                                    }}
                                ></div>
                            </div>
                        </OverlayView>
                    );
                }

            }
        }
        return markerComponents;
    };

    const handleOpen = (media: any, mediaCoords: any, id: string) => {
        setSelectedMedia({
            id: id,
            imageUrl: media[0],
            latitude: mediaCoords.substring(mediaCoords.indexOf('(') + 1, mediaCoords.indexOf(',')),
            longitude: mediaCoords.substring(mediaCoords.indexOf(',') + 1, mediaCoords.indexOf(')')),
        });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteImageData = async (token: any, latitude: string, longitude: string, imageUrl: string, id: string) => {
        try {
            // Construct the request body with the required parameters
            const data = {
                latitude: latitude,
                longitude: longitude,
                url: imageUrl
            };

            console.log(id)

            await axios.put(`/trips/${id}/media/delete`,
                {
                    ...data
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(response => {
                    console.log('Image deleted successfully:', response);
                });

        } catch (error) {
            console.log('Error deleting image:', error);
        }
    }

    const handleDelete = async () => {
        if (selectedMedia) {
            const token = sessionStorage.getItem("accessToken") || localStorage.getItem("accessToken")
            setLoading(true);

            try {
                // Call the deleteImageData function (previously defined) with the selectedMedia's latitude, longitude, and imageUrl
                await deleteImageData(token, selectedMedia.latitude, selectedMedia.longitude, selectedMedia.imageUrl, selectedMedia.id);

                // Close the dialog after deleting the image
                handleClose();

                // Refresh the page
                window.location.reload();
            } catch (error) {
                // Handle error (e.g., show an error message)
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
    };

    const getLatLngCoords = (coords: any[][]) => {
        return coords.map((x) => {
            const formattedCoords = Object.values(x);
            return { lat: formattedCoords[0], lng: formattedCoords[1] };
        }) as LatLng[];
    };

    const coords = getLatLngCoords(tripCoords);

    const LineOptions = {
        strokeColor: 'cyan',
        strokeWidth: 5,
        clickable: false,
        draggable: false,
        editable: false,
        visible: true,
        radius: 30000,
        zIndex: 1
    }


    const options = useMemo<MapOptions>(() => ({
        disableDefaultUI: true,
        clickableIcons: false,
        mapTypeId: "satellite"
    }), [])

    const onLoad = useCallback(function callback(map: { fitBounds: (arg0: google.maps.LatLngBounds) => void; }) {
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < coords.length; i++) {
            bounds.extend(coords[i]);
        }
        map.fitBounds(bounds);
    }, []);

    return (
        <div className="container">
            <LoadScript
                googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY!}
            >
                <GoogleMap
                    mapContainerClassName="map-container"
                    onLoad={onLoad}
                    options={options}
                >
                    {markers()}
                    <Polyline path={coords} options={LineOptions} />
                </GoogleMap>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    maxWidth="md"
                    fullWidth
                >
                    <DialogContent>
                        <img
                            src={selectedMedia?.imageUrl || ""}
                            alt="Full-size user media"
                            style={{
                                width: "100%",
                                height: "auto",
                                objectFit: "contain",
                            }}
                        />
                        {loading ? (
                            <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
                                <CircularProgress />
                            </div>
                        ) : (
                            <Button
                                variant="contained"
                                color="error"
                                onClick={handleDelete}
                                style={{ marginTop: 8 }}
                            >
                                Delete Image
                            </Button>
                        )}
                    </DialogContent>
                </Dialog>
            </LoadScript>
        </div>
    );

};

export default Map;