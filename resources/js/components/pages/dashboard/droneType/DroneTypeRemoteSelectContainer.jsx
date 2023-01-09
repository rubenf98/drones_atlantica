import { Select } from 'antd';
import React, { useEffect } from 'react'
import { connect } from "react-redux";
import { fetchDroneTypes } from '../../../../redux/droneType/actions';

function ManufacturerRemoteSelectContainer({ fetchDroneTypes, data, loading, value, onChange }) {
    useEffect(() => {
        fetchDroneTypes()
    }, [])

    return (
        <Select
            value={value}
            onChange={onChange}
            loading={loading}
            showSearch
            placeholder="Tipologia do UAS"
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
        fetchDroneTypes: (filters) => dispatch(fetchDroneTypes(filters)),
    };
};

const mapStateToProps = (state) => {
    return {
        data: state.droneType.data,
        loading: state.droneType.loading,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManufacturerRemoteSelectContainer);