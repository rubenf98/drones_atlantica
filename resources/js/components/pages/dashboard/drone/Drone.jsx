import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import DroneHeader from './DroneHeader'
import DroneTableContainer from './DroneTableContainer'
import { fetchProjects } from '../../../../redux/project/actions';
import { fetchDrones } from '../../../../redux/drone/actions';
import { Link, useSearchParams } from 'react-router-dom';
import DroneDrawerContainer from './DroneDrawerContainer';
import { Col, Input, Row } from 'antd';
import { PrimaryButton, SecundaryButton } from '../../../globalStyles';
import InoperationalDroneTableContainer from './InoperationalDroneTableContainer';

function Drone({ fetchProjects, fetchDrones }) {
    const [searchParams] = useSearchParams();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [currentId, setCurrentId] = useState(1);
    const [currentDrone, setCurrentDrone] = useState(undefined);
    const [search, setSearch] = useState(undefined);

    useEffect(() => {
        fetchProjects();

        var aInitProject = searchParams.get("project");

        if (aInitProject) {
            setCurrentSlide(parseInt(aInitProject) - 1);
            setCurrentId(parseInt(aInitProject));
        }

    }, [])

    useEffect(() => {
        fetchDrones({ project: currentId });
    }, [currentId])

    const handlePageChange = (paginate = { current: 1 }) => {
        fetchDrones({ page: paginate.current, project: currentId, search: search });
    }

    return (
        <div>
            <DroneHeader
                currentSlide={currentSlide} setCurrentSlide={setCurrentSlide}
                currentId={currentId} setCurrentId={setCurrentId}
            />
            <DroneDrawerContainer
                visible={currentDrone != undefined}
                id={currentDrone}
                handleClose={() => setCurrentDrone(undefined)}
            />
            <h2>Drones</h2>
            <Row type="flex" justify="space-between" align="middle">
                <Col span={12}>
                    <Input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        size="large"
                        placeholder="Pesquisar"
                    />
                </Col>
                <Col span={12}>
                    <Row type="flex" justify="end" align="middle">
                        <SecundaryButton onClick={handlePageChange} style={{ marginRight: "10px" }}>Pesquisar</SecundaryButton>
                        <Link to="/painel/drones/create"><PrimaryButton>Adicionar drone</PrimaryButton></Link>
                    </Row>
                </Col>
            </Row>
            <br />
            <DroneTableContainer handleRowClick={(val) => setCurrentDrone(val)} handlePageChange={handlePageChange} />


            <h2>Drones inoperacionais</h2>
            <InoperationalDroneTableContainer handleRowClick={(val) => setCurrentDrone(val)} />
        </div>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => {
    return {
        fetchProjects: () => dispatch(fetchProjects()),
        fetchDrones: (filters) => dispatch(fetchDrones(filters)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Drone)