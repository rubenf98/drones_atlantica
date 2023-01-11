import { Select } from 'antd';
import React, { useEffect } from 'react'
import { connect } from "react-redux";
import { fetchFlightReportSelector } from '../../../../redux/flightReport/actions';

function FlightReportRemoteSelectContainer({ fetchFlightReportSelector, data, loading, value, onChange }) {
    useEffect(() => {
        fetchFlightReportSelector()
    }, [])

    return (
        <Select
            value={value}
            onChange={onChange}
            loading={loading}
            showSearch
            placeholder="Relatório de voo"
            optionFilterProp="name"
            filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
        >
            {data.map((element) => (
                <Select.Option key={element.id} value={element.id}>{element.serial_number}</Select.Option>
            ))}
        </Select>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchFlightReportSelector: (filters) => dispatch(fetchFlightReportSelector(filters)),
    };
};

const mapStateToProps = (state) => {
    return {
        data: state.flightReport.selector,
        loading: state.flightReport.loading,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FlightReportRemoteSelectContainer);