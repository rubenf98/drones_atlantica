import { Col, Drawer, Row, Popconfirm } from 'antd'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchCrashReport, deleteCrashReport } from '../../../../redux/crashReport/actions';
import styled from "styled-components";
import MapContainer from '../common/MapContainer';
import { SecundaryButton } from '../../../globalStyles';

const ButtonContainer = styled.section`
    display: flex;
    margin: 20px 0px;
    gap: 15px;
    justify-content: flex-end;
    align-items: center;
`;

const ImageContainer = styled.section`
    display: flex;
    width: 100%;
    justify-content: flex-start;
    gap: 30px;
    align-items: center;

    img {
        width: 25%;
    }

`;

export const CrashReportDrawerContainer = (props) => {
    const { visible, loading, current, id } = props;

    useEffect(() => {
        if (visible) {
            props.fetchCrashReport(id);
        }
    }, [visible])

    function handleDelete() {
        props.deleteCrashReport(id)
        props.handleClose();
    }

    const Item = ({ value, label, span = 6 }) => (
        <Col span={span}>
            <p style={{ fontWeight: "bold" }}>{label}:</p>
            <p>{value}</p>
        </Col>
    )

    function emptyItem(field) {
        return field ? field : "---";
    }
    console.log(current);

    return (
        <Drawer
            title={"Registo de acidente #" + current.id}
            placement="right"
            onClose={props.handleClose}
            open={visible}
            width={1270}
        >
            {current.latitude &&
                <MapContainer
                    coordinates={{
                        latitude: current.latitude,
                        longitude: current.longitude,
                    }}
                />
            }
            <h2>Dados gerais</h2>
            <Row type="flex">
                <Item label="Danos ao equipamento" value={emptyItem(current.damage)} />
                <Item label="Avaliação/Análise" value={emptyItem(current.analysis)} />
                <Item label="Correções" value={emptyItem(current.corrections)} />
            </Row>
            <br />
            <h2>Relatório de voo</h2>
            <Row type="flex">
                <Item label="Número de série" value={current?.flightReport?.serial_number} />
                <Item label="Drone" value={current?.drone?.project?.name + " # " + current?.drone?.serial_number} />
                <Item label="Duração do voo (minutos)" value={current?.flightReport?.flight_duration} />
                <Item label="Distância / Altura máxima (metros)" value={current?.flightReport?.max_distance + " / " + current?.flightReport?.max_altitude} />
            </Row>
            <br />

            <ImageContainer>
                {current.media && current.media.length ? current.media.map((image) => (
                    <img src={"/images/crash_reports/" + image.path + "." + image.file_type} alt={image.id} />
                )) : <></>}
            </ImageContainer>

            <ButtonContainer>
                <Popconfirm
                    title="Apagar registo de voo"
                    description="Tem a certeza que pretende apagar este registo?"
                    onConfirm={handleDelete}
                    okText="Apagar"
                    cancelText="Cancelar"
                >
                    <SecundaryButton>
                        Apagar
                    </SecundaryButton>
                </Popconfirm>
            </ButtonContainer>
        </Drawer>
    )
}

const mapStateToProps = (state) => {
    return {
        loading: state.crashReport.loading,
        current: state.crashReport.current,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCrashReport: (id) => dispatch(fetchCrashReport(id)),
        deleteCrashReport: (id) => dispatch(deleteCrashReport(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CrashReportDrawerContainer)