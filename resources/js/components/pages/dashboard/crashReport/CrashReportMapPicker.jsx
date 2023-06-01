import { Col, Input, Row } from 'antd';
import React, { useState, useEffect } from 'react'
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = 'pk.eyJ1IjoicG9udG9taXJhIiwiYSI6ImNsaHFnajVlbjAzb20zanNpc2NqbzQ5ZTUifQ.hQ5L7eM8CyH0scMaIubFkw';

function CrashReportMapPicker({ form, location, setLocation }) {
    const [zoom, setZoom] = useState(10);

    function handleChangeLocation(e) {
        setLocation({ lat: e.lngLat.lat, lng: e.lngLat.lng });
        form.setFieldsValue({ latitude: e.lngLat.lat, longitude: e.lngLat.lng })
    }

    function handleChangeZoom(newZoom) {
        setZoom(newZoom);
    }

    
    console.log(location)

    return (
        <Row>
            <Map
                initialViewState={{
                    longitude: parseFloat(location.lng),
                    latitude: parseFloat(location.lat),
                    zoom: 8
                }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxAccessToken={MAPBOX_TOKEN}
                style={{ height: '100%', minHeight: "300px", marginBottom: "30px" }}
            >
                <Marker
                    longitude={location.lng}
                    latitude={location.lat}
                    anchor="bottom"
                    draggable
                    onDrag={handleChangeLocation}
                    color='red'
                />



            </Map>
            <Row style={{ width: "100%" }} type="flex">
                <Col span={12}>
                    <Input onChange={(e) => setLocation({ lat: parseFloat(e.target.value), lng: location.lng })} value={location.lat} placeholder='Latitude' />
                </Col>
                <Col span={12}>
                    <Input onChange={(e) => setLocation({ lat: location.lat, lng: parseFloat(e.target.value) })} value={location.lng} placeholder='Longitude' />
                </Col>
            </Row>
        </Row>
    )
}

export default CrashReportMapPicker
