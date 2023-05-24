import { Col, Drawer, Row } from 'antd'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchDrone } from '../../../../redux/drone/actions';
import styled from "styled-components";
import { PrimaryButton, SecundaryButton } from '../../../globalStyles';
import { Link } from 'react-router-dom';

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

const ButtonContainer = styled.section`
    display: flex;
    margin: 20px 0px;
    gap: 15px;
    justify-content: flex-end;
    align-items: center;
`;

export const DroneDrawerContainer = (props) => {
    const { visible, loading, current, id } = props;

    useEffect(() => {
        if (visible) {
            props.fetchDrone(id);
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
    console.log(current);

    return (
        <Drawer
            title={"Drone #" + current.id}
            placement="right"
            onClose={props.handleClose}
            open={visible}
            width={1270}
        >
            <ImageContainer>
                <img src={current.image} alt={current.id} />
            </ImageContainer>

            <h2>Dados gerais</h2>
            <Row type="flex">
                <Item label="Número de série" value={current?.project?.name + " # " + current.serial_number} />
                <Item label="Data de aquisição" value={emptyItem(current.acquisition)} />
                <Item label="Designação" value={emptyItem(current.designation)} />
                <Item label="Tipo de propulsão" value={emptyItem(current.propulsion_type)} />
                <Item label="Fabricante e/ou Proprietário" value={emptyItem(current?.manufacturer?.name)} />

                <Item label="Autonomia (min)" value={emptyItem(current.autonomy)} />
                <Item label="Tipo de ligação" value={emptyItem(current.connection_type)} />
                <Item label="Distância máxima ligação (km)" value={emptyItem(current.connection_distance)} />

                <Item label="Massa máxima à descolagem (MTOM)" value={emptyItem(current.mtom)} />
                <Item label="Altura do UAS (em centímetros)" value={emptyItem(current.height)} />
                <Item label="Largura do UAS (em centímetros)" value={emptyItem(current.width)} />
                <Item label="Comprimentos do UAS (em centímetros)" value={emptyItem(current.drone_length)} />

                <Item label="Número de motores" value={emptyItem(current.n_motors)} />
                <Item label="Velocidade máxima do UAS (em m/s)" value={emptyItem(current.max_speed)} />
                <Item label="Distância de operação (km)" value={emptyItem(current.max_distance)} />
                <Item label="Teto máximo de operação (em metros)" value={emptyItem(current.max_altitude)} />

                <Item label="Tipologia do UAS" value={emptyItem(current?.drone_type?.name)} />
                <Item label="Transporte de mercadorias perigosas" value={current.analysis ? "Sim" : "Não"} />

            </Row>
            <br />
            <ButtonContainer>
                <Link to="/painel/drones/create?edit">
                    <SecundaryButton>
                        Atualizar
                    </SecundaryButton>
                </Link>
            </ButtonContainer>
            {/* <h2>Relatório de voo</h2>
            <Row type="flex">
                <Item label="Número de série" value={current?.flightReport?.serial_number} />
                <Item label="Drone" value={current?.drone?.project?.name + " # " + current?.drone?.serial_number} />
                <Item label="Duração do voo (minutos)" value={current?.flightReport?.flight_duration} />
                <Item label="Distância / Altura máxima (metros)" value={current?.flightReport?.max_distance + " / " + current?.flightReport?.max_altitude} />
            </Row>
            <br />

            <ImageContainer>
                {current.media && current.media.length && current.media.map((image) => (
                    <img src={"/images/crash_reports/" + image.path + "." + image.file_type} alt={image.id} />
                ))}
            </ImageContainer> */}
        </Drawer>
    )
}

const mapStateToProps = (state) => {
    return {
        loading: state.drone.loading,
        current: state.drone.current,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchDrone: (id) => dispatch(fetchDrone(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DroneDrawerContainer)