import React, { useState } from 'react'
import MapPicker from 'react-google-map-picker'

function CrashReportMapPicker({ form }) {
    const [location, setLocation] = useState({ lat: 32.7, lng: -16.9 });
    const [zoom, setZoom] = useState(10);

    function handleChangeLocation(lat, lng) {
        setLocation({ lat: lat, lng: lng });
        var object = {};
        object["crash_latitude"] = lat;
        object["crash_longitude"] = lng;
        form.setFieldsValue(object)
    }

    function handleChangeZoom(newZoom) {
        setZoom(newZoom);
    }

    return (
        <MapPicker
            defaultLocation={location}
            zoom={zoom}
            mapTypeId="roadmap"
            style={{ height: '100%', minHeight: "300px", marginBottom: "30px" }}
            onChangeLocation={handleChangeLocation}
            onChangeZoom={handleChangeZoom}
            apiKey='AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8'
        />
    )
}

export default CrashReportMapPicker
