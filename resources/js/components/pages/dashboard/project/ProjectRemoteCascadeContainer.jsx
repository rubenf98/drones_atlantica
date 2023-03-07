import { Cascader } from 'antd';
import React, { useEffect } from 'react'
import { connect } from "react-redux";
import { fetchProjectsSelector } from '../../../../redux/project/actions';

function ProjectRemoteCascadeContainer({ fetchProjectsSelector, value, data, loading, onChange }) {
    useEffect(() => {
        fetchProjectsSelector()
    }, [])

    return (
        <Cascader
            options={data}
            onChange={onChange}
            loading={loading}
            value={value}
            showSearch
            fieldNames={{
                label: 'name',
                value: 'id',
                children: 'drones',
            }}
            placeholder="Drone"
        />
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchProjectsSelector: (filters) => dispatch(fetchProjectsSelector(filters)),
    };
};

const mapStateToProps = (state) => {
    return {
        data: state.project.selector,
        loading: state.project.loading,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectRemoteCascadeContainer);