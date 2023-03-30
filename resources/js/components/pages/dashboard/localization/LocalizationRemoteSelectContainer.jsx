import { Select, Space, Button } from 'antd';
import React, {
    useEffect
} from 'react'
import { connect } from "react-redux";
import { fetchLocalizations } from '../../../../redux/localization/actions';
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

function LocalizationRemoteSelectContainer({ fetchLocalizations, data, loading, value, onChange, setCreateMode }) {
    useEffect(() => {
        fetchLocalizations()
    }, [])

    return (
        <Select
            value={value}
            onChange={onChange}
            loading={loading}
            showSearch
            allowClear
            style={{ width: "100%" }}
            placeholder="Localizações"
            optionFilterProp="name"
            dropdownRender={(menu) => (
                <>
                    {menu}
                    <Divider />
                    <Add
                        style={{
                            padding: '0 8px 4px',
                        }}
                    >
                        <Button size='small' type="primary" onClick={() => setCreateMode(true)}>
                            <span>&#43;</span> Adicionar localização
                        </Button>
                    </Add>
                </>
            )}
        >
            {data.map((element) => (
                <Select.Option key={element.id} value={element.id}>{element.district}, {element.conceil}, {element.place} ({element.latitude}, {element.longitude})</Select.Option>
            ))}
        </Select>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchLocalizations: (filters) => dispatch(fetchLocalizations(filters)),
    };
};

const mapStateToProps = (state) => {
    return {
        data: state.localization.data,
        loading: state.localization.loading,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LocalizationRemoteSelectContainer);