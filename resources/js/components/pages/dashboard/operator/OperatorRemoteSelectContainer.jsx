import { Select, Space, Button } from 'antd';
import React, {
    useEffect
} from 'react'
import { connect } from "react-redux";
import { fetchOperators } from '../../../../redux/operator/actions';
import styled from "styled-components";

const Add = styled(Space)`
    float: right;

    span {
        font-weight: bold;
        margin-right: 5px;
    }
`;

const Divider = styled.div`
    width: 100%;
    height: 1px;
    background-color: black;
    opacity: .2;
    margin: 20px 0px 10px 0px;
`;

function OperatorRemoteSelectContainer({ handleChange, fetchOperators, data, loading, value, handleOperatorSelection }) {
    useEffect(() => {
        fetchOperators({ selectorMode: true })
    }, [])

    return (
        <Select
            value={value}
            onChange={handleChange}
            loading={loading}
            showSearch
            placeholder="Nome do operador"
            optionFilterProp="name"
            filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
            dropdownRender={(menu) => (
                <>
                    {menu}
                    <Divider />
                    <Add
                        style={{
                            padding: '0 8px 4px',
                        }}
                    >
                        <Button size='small' type="primary" onClick={handleOperatorSelection}>
                            <span>&#43;</span> Criar novo operador
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
        fetchOperators: (filters) => dispatch(fetchOperators(filters)),
    };
};

const mapStateToProps = (state) => {
    return {
        data: state.operator.data,
        loading: state.operator.loading,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OperatorRemoteSelectContainer);