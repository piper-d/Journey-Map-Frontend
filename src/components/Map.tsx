import { useMemo, useCallback, useRef, Key } from "react";
import { GoogleMap, Polyline, Marker } from "@react-google-maps/api";

type MapOptions = google.maps.MapOptions;
type LatLongLiteral = google.maps.LatLngLiteral;
type LatLng = {
    lat: number;
    lng: number;
}

const Map: React.FunctionComponent<any> = (trip) => {
    const tripData = trip.trip
    const tripCoords = trip.trip.point_coords

    const markers = () => {
        const markerComponents = [];
        if (tripData.media && Object.keys(tripData.media).length > 0) {
            // myObject is defined and has at least one property
            // you can call Object.keys(myObject) safely here
            for (let i = 0; i < Object.keys(tripData.media).length; i++) {
                const mediaCoords = Object.keys(tripData.media)[i]
                const media = tripData.media[mediaCoords]
                const mediaURL = media[i]

                const formattedKey = {
                    lat: Number(mediaCoords.substring(mediaCoords.indexOf('(') + 1, mediaCoords.indexOf(','))),
                    lng: Number(mediaCoords.substring(mediaCoords.indexOf(',') + 1, mediaCoords.indexOf(')'))),
                };

                console.log(formattedKey)
                console.log(mediaURL)

                markerComponents.push( // push each Marker component into the array
                    <Marker
                        key={i}
                        position={formattedKey}
                        icon={{
                            url: mediaURL,
                            scaledSize: new window.google.maps.Size(50, 50)
                        }}
                    />
                );
                return markerComponents; // return the array of Marker components
            }
        } 
    }

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

    return <div className="container">
        <GoogleMap
            mapContainerClassName="map-container"
            onLoad={onLoad}
            options={options}
            
        >
            {markers()} {/* call the markers() function and display the Marker components */}
            <Polyline
                path={coords}
                options={LineOptions}
            />
        </GoogleMap>
    </div>
};

export default Map;