import { Col, Drawer, Popconfirm, Row } from 'antd'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { deleteCrashReport } from '../../../../redux/crashReport/actions';
import { exportFlightReport, fetchFlightReports, fetchFlightReport, setCurrentFlightReport, deleteFlightReport } from '../../../../redux/flightReport/actions';
import styled from "styled-components";
import { PrimaryButton, SecundaryButton } from '../../../globalStyles';
import { Link } from 'react-router-dom';
import MapContainer from '../common/MapContainer';


const ButtonContainer = styled.section`
    display: flex;
    margin: 20px 0px;
    gap: 15px;
    justify-content: flex-end;
    align-items: center;
`;

const DeleteContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
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

    function handleDelete() {
        props.deleteFlightReport(id)
        props.handleClose();
    }

    function handleCrashDelete(crashId) {
        props.deleteCrashReport(crashId)
        props.fetchFlightReport(id);
        props.updateData();
    }


    return (
        <Drawer
            title={"Relatório de voo #" + current.id}
            placement="right"
            onClose={props.handleClose}
            open={visible}
            width={1270}
        >
            {(current.startLocalization && visible) &&
                <MapContainer
                    coordinates={{
                        latitude: current.startLocalization.latitude,
                        longitude: current.startLocalization.longitude,
                    }}
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

                <Item span={12} label="Análise / Avaliação" value={emptyItem(current.analysis)} />
                <Item span={12} label="Correções" value={emptyItem(current.corrections)} />



            </Row>

            <h2>Proximidades</h2>
            <Row type="flex">
                <Item label="Pessoas" value={emptyItem(current?.nearby?.people)} />
                <Item label="Animais" value={emptyItem(current?.nearby?.animals)} />
                <Item label="Veículos" value={emptyItem(current?.nearby?.vehicles)} />
                <Item label="Aeronaves" value={emptyItem(current?.nearby?.aircrafts)} />
            </Row>

            {current.crashReport && <>
                <DeleteContainer>
                    <h2>Registo de acidente</h2>
                    <Popconfirm
                        title="Apagar registo de acidente"
                        description="Tem a certeza que pretende apagar este registo de acidente?"
                        onConfirm={() => handleCrashDelete(current?.crashReport?.id)}
                        okText="Apagar"
                        cancelText="Cancelar"
                    >
                        <img style={{ width: "20px", cursor: "pointer" }} src="/icon/delete.svg" alt="delete" />
                    </Popconfirm>
                </DeleteContainer>
                <Row type="flex">
                    <Item label="Coordenadas" value={current?.crashReport?.latitude + ", " + current?.crashReport?.longitude} />
                    <Item span={18} label="Data" value={emptyItem(current?.crashReport?.date)} />
                    <Item label="Danos ao equipamento" value={emptyItem(current?.crashReport?.damage)} />
                    <Item label="Avaliação/Análise" value={emptyItem(current?.crashReport?.analysis)} />
                    <Item label="Correções" value={emptyItem(current?.crashReport?.corrections)} />
                </Row>
            </>
            }

            <ButtonContainer>
                <Popconfirm
                    title="Apagar registo de voo"
                    description="Tem a certeza que pretende apagar este registo?"
                    onConfirm={() => handleDelete(current.id)}
                    okText="Apagar"
                    cancelText="Cancelar"
                >
                    <div style={{ cursor: "pointer" }}>
                        Apagar
                    </div>
                </Popconfirm>
                <Link to="/painel/relatorios/create?edit">
                    <SecundaryButton>
                        Atualizar
                    </SecundaryButton>
                </Link>
                <PrimaryButton onClick={() => props.exportFlightReport(current.id, current.serial_number)}>
                    Descarregar
                </PrimaryButton>
            </ButtonContainer>
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
        exportFlightReport: (id, filename) => dispatch(exportFlightReport(id, filename)),
        setCurrentFlightReport: (record) => dispatch(setCurrentFlightReport(record)),
        deleteFlightReport: (id) => dispatch(deleteFlightReport(id)),
        deleteCrashReport: (id) => dispatch(deleteCrashReport(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FlightReportDrawerContainer)