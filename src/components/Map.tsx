import { useMemo, useCallback, useState } from "react";
import { GoogleMap, Polyline, OverlayView } from "@react-google-maps/api";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";


type MapOptions = google.maps.MapOptions;
type LatLng = {
    lat: number;
    lng: number;
}

const Map: React.FunctionComponent<any> = (trip) => {
    const tripData = trip.trip
    const tripCoords = trip.trip.point_coords
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");

    const markers = () => {
        const markerComponents = [];
        if (tripData.media && Object.keys(tripData.media).length > 0) {
            for (let i = 0; i < Object.keys(tripData.media).length; i++) {
                const mediaCoords = Object.keys(tripData.media)[i];
                const media = tripData.media[mediaCoords];

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
                            onClick={() => handleOpen(media[0])} // Add this line to handle clicks on the marker
                        >
                            <img
                                src={media[0]}
                                alt="User media"
                                style={{
                                    width: "100%",
                                    height: "auto",
                                    borderRadius: "30%",
                                    objectFit: "cover",
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
        return markerComponents;
    };

    const handleOpen = (imageUrl: string) => {
        setSelectedImage(imageUrl);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getLatLngCoords = (coords: any[][]) => {
        return coords.map((x) => {
            const formattedCoords = Object.values(x);
            return { lat: formattedCoords[0], lng: formattedCoords[1] };
        }) as LatLng[];
    };

    const coords = getLatLngCoords(tripCoords);

    const LineOptions = {
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
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
                        src={selectedImage}
                        alt="Full-size user media"
                        style={{
                            width: "100%",
                            height: "auto",
                            objectFit: "contain",
                        }}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );

};

export default Map;