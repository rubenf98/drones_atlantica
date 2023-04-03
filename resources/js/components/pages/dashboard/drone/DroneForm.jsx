import { Checkbox, Col, Form, Input, InputNumber, Row, Breadcrumb, Alert } from 'antd'
import Dragger from 'antd/es/upload/Dragger';
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import styled from "styled-components";
import { createDrone, updateDrone } from '../../../../redux/drone/actions';
import { PrimaryButton } from '../../../globalStyles';
import DroneTypeRemoteSelectContainer from '../droneType/DroneTypeRemoteSelectContainer';
import ManufacturerFormTemplate from '../manufacturer/ManufacturerFormTemplate';
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

function DroneForm({ createDrone, updateDrone, current }) {
    const [form] = Form.useForm();
    const [file, setFile] = useState(undefined)
    const [filename, setFilename] = useState(undefined)
    const [errors, setErrors] = useState([])
    const [editMode, setEditMode] = useState(false);
    const [hasNewManufacturer, setHasNewManufacturer] = useState(false)
    var navigate = useNavigate();
    const [searchParams, _] = useSearchParams();

    useEffect(() => {
        var hasEdit = searchParams.get("edit");

        if (hasEdit != null && current.id) {
            form.setFieldsValue({
                serial_number: current.serial_number,
                designation: current.designation,
                propulsion_type: current.propulsion_type,
                mtom: current.mtom,
                height: current.height,
                width: current.width,
                length: current.drone_length,
                n_motors: current.n_motors,
                max_speed: current.max_speed,
                max_distance: current.max_distance,
                max_altitude: current.max_altitude,
                drone_type_id: current?.drone_type?.id,
                project_id: current?.project?.id,
                manufacturer_id: current?.manufacturer?.id,
                danger_transportation: current.danger_transportation,
                active: current.active,
            })

            setEditMode(true);
        }
    }, [])

    const catchError = (err) => {
        var response = err.response.data.errors;
        var aErrors = [];
        Object.values(response).map((item) => {
            aErrors.push(item);
        })
        setErrors(aErrors);
    }


    const onFinish = (values) => {
        var formData = new FormData();

        for (var key in values) {
            if (values[key]) {
                formData.append(key, values[key]);
            }

        }
        if (file) {
            formData.append('file', file);
        }


        if (editMode) {
            formData.append("_method", "PATCH");
            updateDrone(current.id, formData).then(() => {
                navigate('/painel/drones?project=' + values.project_id);
            }).catch((err) => {
                catchError(err);
            });
        } else {
            createDrone(formData).then(() => {
                navigate('/painel/drones?project=' + values.project_id);
            }).catch((err) => {
                catchError(err);
            });
        }
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
                name="drone"
                layout="vertical"
                requiredMark
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                {errors.length ? <Alert
                    message="Criação do drone falhou"
                    description={errors.map((error, index) => (
                        <p key={index}>{error}</p>
                    ))}
                    style={{ margin: "20px 0px" }}
                    type="error"
                    closable
                /> : <></>}
                <h2>Dados do drone</h2>
                <Row gutter={16}>
                    <Col xs={24} md={12}>
                        <Form.Item name="serial_number" label="Número de série" rules={rules.serial_number}>
                            <Input placeholder='Número de série' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={6}>
                        <Form.Item name="designation" label="Designação">
                            <Input placeholder='Designação' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={6}>
                        <Form.Item name="propulsion_type" label="Tipo de propulsão">
                            <Input placeholder='Tipo de propulsão' />
                        </Form.Item>
                    </Col>

                    <Col xs={12} md={6}>
                        <Form.Item name="mtom" label="Massa máxima à descolagem (MTOM)">
                            <Decimal placeholder='Massa máxima à descolagem' />
                        </Form.Item>
                    </Col>

                    <Col xs={12} md={6}>
                        <Form.Item name="height" label="Altura do UAS (centímetros)">
                            <Decimal placeholder='Altura do UAS' />
                        </Form.Item>
                    </Col>
                    <Col xs={12} md={6}>
                        <Form.Item name="width" label="Largura do UAS (centímetros)">
                            <Decimal placeholder='Largura do UAS' />
                        </Form.Item>
                    </Col>
                    <Col xs={12} md={6}>
                        <Form.Item name="length" label="Comprimentos do UAS (centímetros)">
                            <Decimal placeholder='Comprimentos do UAS' />
                        </Form.Item>
                    </Col>

                    <Col xs={12} md={6}>
                        <Form.Item name="n_motors" label="Número de motores">
                            <Decimal placeholder='Número de motores' />
                        </Form.Item>
                    </Col>
                    <Col xs={12} md={6}>
                        <Form.Item name="max_speed" label="Velocidade máxima do UAS (m/s)">
                            <Decimal placeholder='Velocidade máxima do UAS' />
                        </Form.Item>
                    </Col>
                    <Col xs={12} md={6}>
                        <Form.Item name="max_distance" label="Distância de operação (1)">
                            <Decimal placeholder='Distância de operação' />
                        </Form.Item>
                    </Col>
                    <Col xs={12} md={6}>
                        <Form.Item name="max_altitude" label="Teto máximo de operação (em metros)">
                            <Decimal placeholder='Teto máximo de operação' />
                        </Form.Item>
                    </Col>

                    <Col xs={12} md={8}>
                        <Form.Item name="drone_type_id" label="Tipologia do UAS" rules={rules.serial_number}>
                            <DroneTypeRemoteSelectContainer />
                        </Form.Item>
                    </Col>
                    <Col xs={12} md={8}>
                        <Form.Item name="project_id" label="Projeto / Modelo" rules={rules.serial_number}>
                            <ProjectRemoteSelectContainer />
                        </Form.Item>
                    </Col>
                    {!hasNewManufacturer &&
                        <Col xs={12} md={8}>
                            <Form.Item name="manufacturer_id" label="Fabricante e/ou Proprietário" rules={rules.serial_number}>
                                <ManufacturerRemoteSelectContainer setHasNewManufacturer={setHasNewManufacturer} />
                            </Form.Item>
                        </Col>
                    }

                    <Col span={12}>
                        <Form.Item
                            name="danger_transportation"
                            valuePropName="checked"
                        >
                            <Checkbox>Transporte de mercadorias perigosas</Checkbox>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="active"
                            valuePropName="checked"
                        >
                            <Checkbox>Drone em atividade</Checkbox>
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
                                <UploadImage src={editMode ? current.image : "/images/icons/upload.svg"} alt="upload" />
                            </p>
                            <p className="ant-upload-text">Carregue ou arraste uma fotografia para esta área para submeter</p>
                            <p className="ant-upload-hint">
                                {filename ? filename : "Suporte para uma imagem em formato jpeg ou jpg."}

                            </p>
                        </Dragger>
                    </Col>

                    {
                        hasNewManufacturer &&
                        <Row>
                            <h2>Dados do proprietário</h2>
                            <ManufacturerFormTemplate />
                        </Row>
                    }

                    <Button>
                        Submeter
                    </Button>

                </Row>

                <p>(1) Definida em D = Vx60xT/1000, V - velocidade (m/s), T - tempo de voo máximo em minutos considerando autonomia e D - distância em Km</p>
            </Form>
        </div >
    )
}

const mapStateToProps = (state) => {
    return {
        loading: state.drone.loading,
        current: state.drone.current,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createDrone: (data) => dispatch(createDrone(data)),
        updateDrone: (id, data) => dispatch(updateDrone(id, data)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(DroneForm)