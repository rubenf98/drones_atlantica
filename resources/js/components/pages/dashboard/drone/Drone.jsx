import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import DroneHeader from './DroneHeader'
import DroneTableContainer from './DroneTableContainer'
import { fetchProjects } from '../../../../redux/project/actions';
import { fetchDrones } from '../../../../redux/drone/actions';
import { useSearchParams } from 'react-router-dom';
import DroneDrawerContainer from './DroneDrawerContainer';

function Drone({ fetchProjects, fetchDrones }) {
    const [searchParams] = useSearchParams();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [currentId, setCurrentId] = useState(1);
    const [currentDrone, setCurrentDrone] = useState(undefined);

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

    const handlePageChange = (paginate) => {
        fetchDrones({ page: paginate.current, project: currentId });
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
            <DroneTableContainer handleRowClick={(val) => setCurrentDrone(val)} handlePageChange={handlePageChange} />
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