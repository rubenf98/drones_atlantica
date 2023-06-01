import { Col, Input, Row } from 'antd';
import React, { useState } from 'react'
import MapPicker from 'react-google-map-picker'

function LocalizationMapPicker({ prefix, form }) {
    const [location, setLocation] = useState({ lat: 32.7, lng: -16.9 });
    const [zoom, setZoom] = useState(10);

    function handleChangeLocation(lat, lng) {
        setLocation({ lat: lat, lng: lng });
        var object = {};
        object[prefix + "_latitude"] = lat;
        object[prefix + "_longitude"] = lng;
        form.setFieldsValue(object)
    }

    function handleChangeZoom(newZoom) {
        setZoom(newZoom);
    }

    return (
        <Row>
            <MapPicker
                defaultLocation={location}
                zoom={zoom}
                mapTypeId="roadmap"
                style={{ height: '300px' }}
                onChangeLocation={handleChangeLocation}
                onChangeZoom={handleChangeZoom}
                apiKey='AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8'
            />
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

export default LocalizationMapPicker
