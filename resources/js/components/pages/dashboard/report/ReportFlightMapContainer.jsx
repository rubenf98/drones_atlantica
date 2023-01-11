import React, { useState } from 'react'
import styled from "styled-components";
import { LineChart } from 'react-chartkick'
import 'chartkick/chart.js'
import { connect } from 'react-redux';
import MapPicker from 'react-google-map-picker';

const Container = styled.section`
    margin: 50px 0px 100px 0px;
`;


function ReportFlightMapContainer({ data, loading }) {
    const [location, setLocation] = useState({ lat: 32.7, lng: -16.9 });
    const [zoom, setZoom] = useState(10);

    function handleChangeLocation(lat, lng) {
        setLocation({ lat: lat, lng: lng });
    }

    function handleChangeZoom(newZoom) {
        setZoom(newZoom);
    }

    return (
        <Container>
            <MapPicker
                defaultLocation={location}
                zoom={zoom}
                mapTypeId="roadmap"
                style={{ height: '300px' }}
                onChangeLocation={handleChangeLocation}
                onChangeZoom={handleChangeZoom}
                apiKey='AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8'
            />
        </Container>
    )
}
const mapStateToProps = (state) => {
    return {
        loading: state.flightReport.loadingGraph,
        data: state.flightReport.dataGraph,
    };
};

export default connect(mapStateToProps, null)(ReportFlightMapContainer);