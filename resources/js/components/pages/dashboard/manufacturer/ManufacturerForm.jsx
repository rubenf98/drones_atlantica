import { Form, Breadcrumb, Alert } from 'antd'
import React, { useState } from 'react'
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import ManufacturerFormTemplate from './ManufacturerFormTemplate';

import { createManufacturer } from '../../../../redux/manufacturer/actions';
import { PrimaryButton } from '../../../globalStyles';

const rules = {
    serial_number: [{
        required: true,
        message: 'Número de série é obrigatório!',
    }],
    date: [{
        required: true,
        message: 'A data é obrigatória!',
    }],
    drone: [{
        required: true,
        message: 'O drone é obrigatório!',
    }],
    flight_duration: [{
        required: true,
        message: 'A duração do voo é obrigatória!',
    }],
};

function ManufacturerForm(props) {
    const [form] = Form.useForm();
    const [errors, setErrors] = useState([])
    const [redirect, setRedirect] = useState('/painel/membros')
    var navigate = useNavigate();

    const onFinish = (values) => {

        props.createManufacturer(values).then((response) => {
            navigate(redirect);
        }).catch((err) => {
            var response = err.response.data.errors;
            var aErrors = [];
            Object.values(response).map((item) => {
                aErrors.push(item);
            })
            setErrors(aErrors);
        });
    }

    const onFinishFailed = (values) => {
        console.log("error: " + values);
    }

    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item><Link to="/painel">Início</Link> </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to="/painel/membros">Membros</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Formulário</Breadcrumb.Item>
            </Breadcrumb>

            <Form
                form={form}
                name="manufacturer"
                layout="vertical"
                requiredMark
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                {
                    errors.length ? <Alert
                        message="Criação do operador falhou"
                        description={errors.map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                        style={{ margin: "20px 0px" }}
                        type="error"
                        closable
                    /> : <></>
                }
                <ManufacturerFormTemplate />

                <PrimaryButton>
                    Submeter
                </PrimaryButton>
            </Form >
        </div >
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        createManufacturer: (data) => dispatch(createManufacturer(data)),
    };
};
export default connect(null, mapDispatchToProps)(ManufacturerForm)