import { Divider, Select, Space, Button } from 'antd';
import React, {
    useEffect
} from 'react'
import { connect } from "react-redux";
import { fetchManufacturers } from '../../../../redux/manufacturer/actions';
import styled from "styled-components";

const Add = styled(Space)`
    float: right;

    span {
        font-weight: bold;
        margin-right: 5px;
    }
`;

function DroneTypeRemoteSelectContainer({ fetchManufacturers, data, loading, value, onChange, setHasNewManufacturer }) {
    useEffect(() => {
        fetchManufacturers()
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
            dropdownRender={(menu) => (
                <>
                    {menu}
                    <br />
                    <Add
                        style={{
                            padding: '0 8px 4px',
                        }}
                    >
                        <Button size='small' type="primary" onClick={() => setHasNewManufacturer(true)}>
                            <span>&#43;</span> Criar novo proprietário
                        </Button>
                    </Add>
                </>
            )}
        >
            {data.map((element) => (
                <Select.Option key={element.id} value={element.id}>{element.name}</Select.Option>
            ))}
        </Select>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchManufacturers: (filters) => dispatch(fetchManufacturers(filters)),
    };
};

const mapStateToProps = (state) => {
    return {
        data: state.manufacturer.data,
        loading: state.manufacturer.loading,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DroneTypeRemoteSelectContainer);