import React from 'react'
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = 'pk.eyJ1IjoicG9udG9taXJhIiwiYSI6ImNsaHFnajVlbjAzb20zanNpc2NqbzQ5ZTUifQ.hQ5L7eM8CyH0scMaIubFkw';

function MapContainer({ coordinates }) {
    return (
        <Map
            initialViewState={{
                longitude: parseFloat(coordinates.longitude),
                latitude: parseFloat(coordinates.latitude),
                zoom: 8
            }}
            style={{ width: "100%", height: "400px" }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            mapboxAccessToken={MAPBOX_TOKEN}
        >
            <Marker
                longitude={parseFloat(coordinates.longitude)}
                latitude={parseFloat(coordinates.latitude)}
                color="red"
            />
        </Map>
    )
}

export default MapContainer