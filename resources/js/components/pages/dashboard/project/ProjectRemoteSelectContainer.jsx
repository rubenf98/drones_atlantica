import { Select } from 'antd';
import React, { useEffect } from 'react'
import { connect } from "react-redux";
import { fetchProjects } from '../../../../redux/project/actions';

function ProjectRemoteSelectContainer({ fetchProjects, data, loading, value, onChange }) {
    useEffect(() => {
        fetchProjects()
    }, [])

    return (
        <Select
            value={value}
            onChange={onChange}
            loading={loading}
            showSearch
            placeholder="Projeto / Modelo"
            optionFilterProp="name"
            filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
        >
            {data.map((element) => (
                <Select.Option key={element.id} value={element.id}>{element.name}</Select.Option>
            ))}
        </Select>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchProjects: (filters) => dispatch(fetchProjects(filters)),
    };
};

const mapStateToProps = (state) => {
    return {
        data: state.project.data,
        loading: state.project.loading,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectRemoteSelectContainer);