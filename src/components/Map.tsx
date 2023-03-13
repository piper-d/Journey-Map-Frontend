import { useMemo, useCallback, useRef } from "react";
import { GoogleMap, Polyline, Marker } from "@react-google-maps/api";

type MapOptions = google.maps.MapOptions;
type LatLongLiteral = google.maps.LatLngLiteral;
type LatLng = {
    lat: number;
    lng: number;
}

const Map: React.FunctionComponent<any> = (trips) => {
    const tripCoords = trips.trips

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
        draggable: false
    }), [])

    const onLoad = useCallback(function callback(map: { fitBounds: (arg0: google.maps.LatLngBounds) => void; }) {
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < coords.length; i++) {
            bounds.extend(coords[i]);
        }
        map.fitBounds(bounds);
    }, []);

    console.log(coords.length === 1)

    return <div className="container">
        <GoogleMap
            mapContainerClassName="map-container"
            onLoad={onLoad}
            options={options}
        >
            <Polyline
                path={coords}
                options={LineOptions}
            />
            {/* {coords.length === 1} ? (
                <>
                    <Marker 
                        position={coords[0]}
                    />
                </>
            ) :
            <>
                <Polyline
                    path={coords}
                    options={LineOptions}
                />
            </> */}
        </GoogleMap>
    </div>
};

export default Map;