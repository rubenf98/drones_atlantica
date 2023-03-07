import { Checkbox, Col, Form, Input, InputNumber, Row, Breadcrumb, Alert } from 'antd'
import Dragger from 'antd/es/upload/Dragger';
import React, { useState } from 'react'
import { connect } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { createDrone } from '../../../../redux/drone/actions';
import { createUser } from '../../../../redux/user/actions';
import { PrimaryButton } from '../../../globalStyles';
import DroneTypeRemoteSelectContainer from '../droneType/DroneTypeRemoteSelectContainer';
import ManufacturerForm from '../manufacturer/ManufacturerForm';
import ManufacturerRemoteSelectContainer from '../manufacturer/ManufacturerRemoteSelectContainer';
import ProjectRemoteSelectContainer from '../project/ProjectRemoteSelectContainer';

const Decimal = styled(InputNumber)`
    width: 100%;
`;

const Button = styled(PrimaryButton)`
    margin-top: 30px;
`;

const UploadImage = styled.img`
    width: 60px;
    height: auto;
`;

const rules = {
    serial_number: [{
        required: true,
        message: 'Número de série é obrigatório!',
    }],
    validity: [{
        required: true,
        message: 'Please input your card validity date!',
    }],
    cvv: [{
        required: true,
        message: 'Please input your CVV!',
    }],
};

function UserForm({ createUser }) {
    const [form] = Form.useForm();
    const [file, setFile] = useState(undefined)
    const [filename, setFilename] = useState(undefined)
    const [errors, setErrors] = useState([])
    var navigate = useNavigate();

    const onFinish = (values) => {
        var formData = new FormData();

        for (var key in values) {
            formData.append(key, values[key]);
        }
        formData.append('image', file);


        createUser(formData).then((response) => {
            navigate('/painel/membros');
        }).catch((err) => {
            var response = err.response.data.errors;
            var aErrors = [];
            Object.values(response).map((item) => {
                aErrors.push(item);
            })
            setErrors(aErrors);
        });

        console.log(formData);
    }

    const onFinishFailed = (values) => {
        console.log("error: " + values);
    }

    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item><Link to="/painel">Início</Link> </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to="/painel/drones">Drones</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Formulário</Breadcrumb.Item>
            </Breadcrumb>
            <Form
                form={form}
                name="user"
                layout="vertical"
                requiredMark
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                {errors.length ? <Alert
                    message="Criação do utilizador falhou"
                    description={errors.map((error, index) => (
                        <p key={index}>{error}</p>
                    ))}
                    style={{ margin: "20px 0px" }}
                    type="error"
                    closable
                /> : <></>}

                <h2>Dados do utilizador</h2>
                <Row gutter={16}>
                    <Col xs={24} md={12}>
                        <Form.Item name="name" label="Nome" rules={rules.serial_number}>
                            <Input placeholder='Nome' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item name="email" label="Email" rules={rules.serial_number}>
                            <Input placeholder='Email' />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Dragger
                            name='file'
                            accept='.jpg,.jpeg'
                            onRemove={() => {
                                setFile(undefined);
                                setFilename(undefined);
                            }}
                            multiple={false}
                            showUploadList={false}
                            onChange={(info) => {
                                const { status } = info.file;
                                if (status !== 'uploading') {
                                    console.log(info.file, info.fileList);
                                }
                                if (status === 'done') {
                                    console.log(`${info.file.name} file uploaded successfully.`);
                                } else if (status === 'error') {
                                    console.log(`${info.file.name} file upload failed.`);
                                }
                            }}
                            beforeUpload={(file) => {
                                setFile(file);
                                setFilename(file.name);
                                return false;
                            }}
                        >
                            <p className="ant-upload-drag-icon">
                                <UploadImage src="/images/icons/upload.svg" alt="upload" />
                            </p>
                            <p className="ant-upload-text">Carregue ou arraste uma fotografia para esta área para submeter</p>
                            <p className="ant-upload-hint">
                                {filename ? filename : "Suporte para uma imagem em formato jpeg ou jpg."}

                            </p>
                        </Dragger>
                    </Col>


                    <Button>
                        Submeter
                    </Button>

                </Row>

            </Form>
        </div >
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        createUser: (data) => dispatch(createUser(data)),
    };
};
export default connect(null, mapDispatchToProps)(UserForm)