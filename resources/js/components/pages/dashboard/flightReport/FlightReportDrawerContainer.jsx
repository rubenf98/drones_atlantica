import { Col, Drawer, Row } from 'antd'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchFlightReport, setCurrentFlightReport } from '../../../../redux/flightReport/actions';
import styled from "styled-components";
import MapPicker from 'react-google-map-picker'
import { SecundaryButton } from '../../../globalStyles';
import { Link } from 'react-router-dom';

const Title = styled.section`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;

    h2 {
        font-size: clamp(20px, 4vw, 28px);
    }

`;

export const FlightReportDrawerContainer = (props) => {
    const { visible, loading, current, id } = props;

    useEffect(() => {
        if (visible) {
            props.fetchFlightReport(id);
        }
    }, [visible])

    const Item = ({ value, label, span = 6 }) => (
        <Col span={span}>
            <p style={{ fontWeight: "bold" }}>{label}:</p>
            <p>{value}</p>
        </Col>
    )

    function emptyItem(field) {
        return field ? field : "---";
    }

    return (
        <Drawer
            title={"Relatório de voo #" + current.id}
            placement="right"
            onClose={props.handleClose}
            open={visible}
            width={1270}
        >
            {current.startLocalization &&
                <MapPicker
                    defaultLocation={
                        { lat: parseFloat(current.startLocalization.latitude), lng: parseFloat(current.startLocalization.longitude) }
                    }
                    zoom={5}
                    mapTypeId="satellite"
                    style={{ height: '300px' }}
                    apiKey='AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8'
                />
            }
            <h2>Dados gerais</h2>
            <Row type="flex">
                <Item label="Número de série" value={current.serial_number} />
                <Item label="Data" value={current.date} />
                <Item label="Drone" value={current?.drone?.project?.name + " # " + current?.drone?.serial_number} />
                <Item label="Operador" value={current?.operator?.name} />

                <Item label="Duração do voo" value={current.flight_duration} />
                <Item label="Distância máxima (metros)" value={current.max_distance} />
                <Item span={12} label="Altura máxima (metros)" value={current.max_altitude} />
            </Row>
            <br />
            <h2>Dados do voo</h2>
            <Row type="flex">
                <Item label="Descrição" value={current.description} />
                <Item label="Objetivo da missão" value={current.objective} />
                <Item span={12} label="Plano de voo" value={current.plan} />

                <Item span={6}
                    label="Local de partida"
                    value={current?.startLocalization?.district + ", " + current?.startLocalization?.conceil + ", " + current?.startLocalization?.place}
                />
                <Item span={6}
                    label="Local de chegada"
                    value={current?.endLocalization?.district + ", " + current?.endLocalization?.conceil + ", " + current?.endLocalization?.place}
                />
            </Row>
            <br />
            <h2>Verificações</h2>
            <Row type="flex">
                <Item label="Antes do levantamento" value={emptyItem(current.pre_verification)} />
                <Item label="Após o levantamento" value={emptyItem(current.during_verification)} />
                <Item label="Após aterragem" value={emptyItem(current.post_verification)} />
            </Row>

            <br />
            <h2>Condições</h2>
            <Row type="flex">
                <Item label="Metereológicas" value={current?.condition?.weather} />
                <Item label="Segurança" value={current?.condition?.safety} />
                <Item label="Ligação/comunicação" value={current?.condition?.transmission} />
                <Item label="Tipo de ligação para controlo" value={emptyItem(current.connection_type)} />

                <Item label="Potência de transmissão (dB)" value={emptyItem(current.transmission_power)} />
                <Item label="Visibilidade" value={emptyItem(current.visibility)} />
                <Item label="Dispositivos conectados" value={emptyItem(current.connected_devices)} />
                <Item label="Payload" value={emptyItem(current.payload)} />
            </Row>

            <h2>Proximidades</h2>
            <Row type="flex">
                <Item label="Pessoas" value={emptyItem(current?.nearby?.people)} />
                <Item label="Animais" value={emptyItem(current?.nearby?.animals)} />
                <Item label="Veículos" value={emptyItem(current?.nearby?.vehicles)} />
                <Item label="Aeronaves" value={emptyItem(current?.nearby?.aircrafts)} />
            </Row>

            {current.crashReport && <>
                <h2>Registo de acidente</h2>
                <Row type="flex">
                    <Item label="Coordenadas" value={current?.crashReport?.latitude + ", " + current?.crashReport?.longitude} />
                    <Item span={18} label="Data" value={emptyItem(current?.crashReport?.date)} />
                    <Item label="Danos ao equipamento" value={emptyItem(current?.crashReport?.damage)} />
                    <Item label="Avaliação/Análise" value={emptyItem(current?.crashReport?.analysis)} />
                    <Item label="Correções" value={emptyItem(current?.crashReport?.corrections)} />
                </Row>
            </>
            }

            <Link to="/painel/relatorios/create?edit">
                <SecundaryButton>
                    Atualizar
                </SecundaryButton>
            </Link>
        </Drawer>
    )
}

const mapStateToProps = (state) => {
    return {
        loading: state.flightReport.loading,
        current: state.flightReport.current,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchFlightReport: (id) => dispatch(fetchFlightReport(id)),
        setCurrentFlightReport: (record) => dispatch(setCurrentFlightReport(record)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FlightReportDrawerContainer)