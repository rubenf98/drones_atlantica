import { Checkbox, Col, Form, Input, InputNumber, Row, Breadcrumb, Alert, DatePicker } from 'antd'
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import styled from "styled-components";
import { createFlightReport, updateFlightReport } from '../../../../redux/flightReport/actions';
import { PrimaryButton, SecundaryButton } from '../../../globalStyles';
import dayjs from 'dayjs';
import LocalizationRemoteSelectContainer from '../localization/LocalizationRemoteSelectContainer';
import OperatorFormTemplate from '../operator/OperatorFormTemplate';
import ProjectRemoteCascadeContainer from '../project/ProjectRemoteCascadeContainer';

import LocalizationForm from '../localization/LocalizationForm';
import TextArea from 'antd/es/input/TextArea';
import OperatorRemoteSelectContainer from '../operator/OperatorRemoteSelectContainer';
import Dragger from 'antd/es/upload/Dragger';
import BreadcrumbContainer from '../../../common/BreadcrumbContainer';

const Decimal = styled(InputNumber)`
    width: 100%;
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
    date: [{
        required: true,
        message: 'A data é obrigatória!',
    }],
    operator: [{
        required: true,
        message: 'O operadot é obrigatório!',
    }],
    drone: [{
        required: true,
        message: 'O drone é obrigatório!',
    }],
    flight_duration: [{
        required: true,
        message: 'A duração do voo é obrigatória!',
    }],

    max_distance: [{
        required: true,
        message: 'A distância máxima é obrigatória!',
    }],
    max_altitude: [{
        required: true,
        message: 'A altura máxima é obrigatória!',
    }],
    description: [{
        required: true,
        message: 'A descrição do voo é obrigatória!',
    }],
    objective: [{
        required: true,
        message: 'O objetivo da missão é obrigatório!',
    }],
    plan: [{
        required: true,
        message: 'O plano de voo é obrigatório!',
    }],
    condition_weather: [{
        required: true,
        message: "As condições metereológicas são obrigatórias!"
    }],
    condition_safety: [{
        required: true,
        message: "As condições de segurança são obrigatórias!"
    }],
    condition_transmission: [{
        required: true,
        message: "As condições de comunicação são obrigatórias!"
    }],
    connection_type: [{
        required: true,
        message: 'O tipo de ligação é obrigatório!',
    }],
    transmission_power: [{
        required: true,
        message: 'A potência de transmissão é obrigatória!',
    }],
};

function FlightReportForm({ createFlightReport, current, updateFlightReport }) {
    const [form] = Form.useForm();
    const [files, setFiles] = useState([])
    const [hasNewOperator, setHasNewOperator] = useState(false)
    const [errors, setErrors] = useState([])
    const [editMode, setEditMode] = useState(false);
    const [startLocalizationCreateMode, setStartLocalizationCreateMode] = useState(false)
    const [endLocalizationCreateMode, setEndLocalizationCreateMode] = useState(false)
    const [reuseStartLocalization, setReuseStartLocalization] = useState(true)
    const [redirect, setRedirect] = useState('/painel/relatorios')
    const [nearby, setNearby] = useState({ people: false, animals: false, vehicles: false, aircraft: false });
    var navigate = useNavigate();
    const [searchParams, _] = useSearchParams();

    useEffect(() => {
        var hasEdit = searchParams.get("edit");
        if (hasEdit != null && current.id) {
            setReuseStartLocalization(false);

            setNearby({
                people: current.nearby.people != null && true,
                animals: current.nearby.animals != null && true,
                vehicles: current.nearby.vehicles != null && true,
                aircraft: current.nearby.aircrafts != null && true
            });

            form.setFieldsValue({
                date: dayjs(current.date, 'DD-MM-YYYY HH:mm', true),
                drone_id: [current?.drone?.drone_type?.id, current?.drone?.id],
                operator_id: current?.operator?.id,
                flight_duration: current.flight_duration,
                max_distance: current.max_distance,
                max_altitude: current.max_altitude,
                client: current?.client?.id,
                description: current.description,
                objective: current.objective,
                plan: current.plan,
                start_localization_id: current.startLocalization.id,
                end_localization_id: current.endLocalization.id,

                pre_verification: current.pre_verification,
                during_verification: current.during_verification,
                post_verification: current.post_verification,
                condition_weather: current.condition.weather,
                condition_safety: current.condition.safety,
                condition_transmission: current.condition.transmission,
                payload: current.payload,

                connection_type: current.connection_type,
                transmission_power: current.transmission_power,
                visibility: current.visibility,
                connected_devices: current.connected_devices,

                nearby_people: current.nearby.people,
                nearby_animals: current.nearby.animals,
                nearby_vehicles: current.nearby.vehicles,
                nearby_aircrafts: current.nearby.aircrafts,

                analysis: current.analysis,
                corrections: current.corrections,

                pix4d: current.pix4d
            })

            setEditMode(true);
        }

    }, [])


    const onFinish = (values) => {
        // console.log(values);
        // var formData = new FormData();

        // for (var key in values) {
        //     if (values[key]) {
        //         formData.append(key, values[key]);
        //     }

        // }

        // formData.append('reuseStartLocalization', reuseStartLocalization);



        if (editMode) {
            updateFlightReport(current.id, { ...values, reuseStartLocalization: reuseStartLocalization }).then(() => {
                navigate(redirect);
            }).catch((err) => {
                var response = err.response.data.errors;
                var aErrors = [];
                Object.values(response).map((item) => {
                    aErrors.push(item);
                })
                setErrors(aErrors);
            });
        } else {
            var formData = new FormData();

            for (var key in values) {
                if (values[key]) {
                    if (Array.isArray(values[key])) {

                        for (var i = 0; i < values[key].length; i++) {
                            formData.append('drone_id[]', values[key][i]);
                        }
                    } else {
                        formData.append(key, values[key]);
                    }

                }

            }
            formData.append('reuseStartLocalization', reuseStartLocalization);
            for (var i = 0; i < files.length; i++) {
                formData.append('authorizations[]', files[i]);
            }

            createFlightReport(formData).then((response) => {
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


    }

    const onFinishFailed = (values) => {
        console.log(form.getFieldsValue());
        console.log("error: " + values);
    }

    const handleReuseLocalizationChange = (e) => {
        setReuseStartLocalization(e.target.checked);
    }

    const handleOperatorSelection = () => {
        form.resetFields(['operator_id']);
        setHasNewOperator(true);
    }

    const handleOperatorChange = (e) => {
        form.setFieldValue('operator_id', e);
        setHasNewOperator(false);
    }

    return (
        <div>

            <BreadcrumbContainer
                links={[
                    { to: "/painel", name: "Início" },
                    { to: "/painel/relatorios", name: "Relatórios de voo" },
                ]}
                currentPage="Formulário"
            />

            <Form
                form={form}
                name="flight_report"
                layout="vertical"
                requiredMark
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                {
                    errors.length ? <Alert
                        message="Criação do relatório falhou"
                        description={errors.map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                        style={{ margin: "20px 0px" }}
                        type="error"
                        closable
                    /> : <></>
                }

                <h2>Dados gerais</h2>
                <Row gutter={16}>
                    <Col xs={24} md={8}>
                        <Form.Item name="date" label="Data e hora" rules={rules.date}>
                            <DatePicker format="DD-MM-YYYY HH:mm" style={{ width: "100%" }} showTime placeholder='DD-MM-YYYY HH:mm' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item name="drone_id" label="Drone" rules={rules.drone}>
                            <ProjectRemoteCascadeContainer onChange={(e) => console.log(e)} />
                        </Form.Item>
                    </Col>
                    <Col xs={12} md={8}>
                        <Form.Item name="operator_id" label="* Operador">
                            <OperatorRemoteSelectContainer value={form.getFieldsValue('drone_id')} handleChange={handleOperatorChange} handleOperatorSelection={handleOperatorSelection} />
                        </Form.Item>
                    </Col>


                    <Col xs={24} md={6}>
                        <Form.Item name="flight_duration" label="Duração do voo" rules={rules.flight_duration}>
                            <Decimal placeholder="Duração do voo" />
                        </Form.Item>
                    </Col>
                    <Col xs={12} md={6}>
                        <Form.Item label="Distância máxima (em metros)" name="max_distance" rules={rules.max_distance}>
                            <Decimal placeholder='Distância máxima' />
                        </Form.Item>
                    </Col>
                    <Col xs={12} md={6}>
                        <Form.Item label="Altura máxima (em metros)" name="max_altitude" rules={rules.max_altitude}>
                            <Decimal placeholder='Altura máxima' />
                        </Form.Item>
                    </Col>
                    <Col xs={12} md={6}>
                        <Form.Item label="Cliente" name="client">
                            <Input placeholder='Cliente' />
                        </Form.Item>
                    </Col>


                    {hasNewOperator &&
                        <OperatorFormTemplate />
                    }
                </Row>

                <h2>Dados do voo</h2>
                <Row gutter={16}>
                    <Col xs={24} md={12}>
                        <Form.Item name="description" label="Descrição" rules={rules.description}>
                            <TextArea placeholder='Descrição' />
                        </Form.Item>
                    </Col>
                    <Col xs={12} md={6}>
                        <Form.Item name="objective" label="Objetivo da missão" rules={rules.objective}>
                            <TextArea placeholder='Objetivo da missão' />
                        </Form.Item>
                    </Col>
                    <Col xs={12} md={6}>
                        <Form.Item name="plan" label="Plano de voo" rules={rules.plan}>
                            <TextArea placeholder='Plano de voo' />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Row gutter={16} type="flex" style={{ marginBottom: "30px" }}>
                            <Col xs={24} md={12}>
                                <p>* Local de partida</p>
                                {startLocalizationCreateMode ?
                                    <LocalizationForm prefix="start" form={form} /> :
                                    <Form.Item name="start_localization_id">
                                        <LocalizationRemoteSelectContainer setCreateMode={setStartLocalizationCreateMode} />
                                    </Form.Item>
                                }
                            </Col>
                            <Col xs={24} md={12}>
                                <p>* Local de chegada</p>
                                {
                                    reuseStartLocalization ?
                                        <Checkbox onChange={handleReuseLocalizationChange} defaultChecked>Utilizar o mesmo local para chegada e partida</Checkbox> :
                                        endLocalizationCreateMode ?
                                            <LocalizationForm prefix="end" form={form} /> :
                                            <Form.Item name="end_localization_id">
                                                <LocalizationRemoteSelectContainer setCreateMode={setEndLocalizationCreateMode} />
                                            </Form.Item>

                                }


                            </Col>
                        </Row>
                    </Col>



                </Row>

                <h2>Verificações</h2>
                <Row gutter={16}>

                    <Col xs={12} md={8}>
                        <Form.Item name="pre_verification" label="Verificações da aeronave antes do levantamento">
                            <TextArea placeholder='Verificações da aeronave antes do levantamento' />
                        </Form.Item>
                    </Col>
                    <Col xs={12} md={8}>
                        <Form.Item name="during_verification" label="Verificação logo após o levantamento">
                            <TextArea placeholder='Verificação logo após o levantamento' />
                        </Form.Item>
                    </Col>
                    <Col xs={12} md={8}>
                        <Form.Item name="post_verification" label="Verificação após aterragem">
                            <TextArea placeholder='Verificação após aterragem' />
                        </Form.Item>
                    </Col>

                </Row>

                <h2>Condições</h2>
                <Row gutter={16}>

                    <Col xs={12} md={12}>
                        <Form.Item name="condition_weather" label="Condições metereológicas" rules={rules.condition_weather}>
                            <TextArea placeholder='Condições metereológicas' />
                        </Form.Item>
                    </Col>

                    <Col xs={12} md={12}>
                        <Form.Item name="condition_safety" label="Condições de segurança" rules={rules.condition_safety}>
                            <TextArea placeholder='Condições de segurança' />
                        </Form.Item>
                    </Col>

                    <Col xs={12} md={12}>
                        <Form.Item name="condition_transmission" label="Condições de ligação/comunicação" rules={rules.condition_transmission}>
                            <TextArea placeholder='Condições de ligação/comunicação' />
                        </Form.Item>
                    </Col>
                    <Col xs={12} md={12}>
                        <Form.Item label="Payload" name="payload">
                            <TextArea placeholder='Payload' />
                        </Form.Item>
                    </Col>


                    <Col xs={12} md={6}>
                        <Form.Item name="connection_type" label="Tipo de ligação para controlo" rules={rules.connection_type}>
                            <Input placeholder='Tipo de ligação para controlo' />
                        </Form.Item>
                    </Col>
                    <Col xs={12} md={6}>
                        <Form.Item name="transmission_power" label="Potência de transmissão (em dB)" rules={rules.transmission_power}>
                            <Decimal placeholder='Potência de transmissão (em dB)' />
                        </Form.Item>
                    </Col>

                    <Col xs={12} md={6}>
                        <Form.Item label="Visibilidade" name="visibility">
                            <Input placeholder='Visibilidade' />
                        </Form.Item>
                    </Col>
                    <Col xs={12} md={6}>
                        <Form.Item label="Dispositivos conectados" name="connected_devices">
                            <Input placeholder='Dispositivos conectados' />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                        <Form.Item name="analysis" label="Análise / Avaliação" rules={rules.analysis}>
                            <TextArea placeholder='Análise / Avaliação' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item name="corrections" label="Correções" rules={rules.corrections}>
                            <TextArea placeholder='Correções' />
                        </Form.Item>
                    </Col>


                    <Col xs={12} md={6}>
                        <Checkbox checked={nearby.people} onChange={(e) => setNearby({ ...nearby, people: e.target.checked })}>Pessoas nas proximidades?</Checkbox>
                    </Col>
                    <Col xs={12} md={6}>
                        <Checkbox checked={nearby.animals} onChange={(e) => setNearby({ ...nearby, animals: e.target.checked })}>Animais nas proximidades?</Checkbox>
                    </Col>
                    <Col xs={12} md={6}>
                        <Checkbox checked={nearby.vehicles} onChange={(e) => setNearby({ ...nearby, vehicles: e.target.checked })}>Veículos próximos?</Checkbox>
                    </Col>
                    <Col xs={12} md={6}>
                        <Checkbox checked={nearby.aircraft} onChange={(e) => setNearby({ ...nearby, aircraft: e.target.checked })}>Aeronaves nas proximidades?</Checkbox>
                    </Col>


                    <Col xs={12} md={6}>
                        {nearby.people &&
                            <div>
                                <Form.Item name="nearby_people">
                                    <Input placeholder='Quantas?' />
                                </Form.Item>
                            </div>
                        }

                    </Col>
                    <Col xs={12} md={6}>
                        {nearby.animals &&
                            <div>
                                <Form.Item name="nearby_animals">
                                    <Input placeholder='Quais e quantos?' />
                                </Form.Item>
                            </div>
                        }
                    </Col>

                    <Col xs={12} md={6}>
                        {nearby.vehicles &&
                            <div>
                                <Form.Item name="nearby_vehicles">
                                    <Input placeholder='Quais?' />
                                </Form.Item>
                            </div>
                        }
                    </Col>
                    <Col xs={12} md={6}>
                        {nearby.aircraft &&
                            <div>
                                <Form.Item name="nearby_aircrafts">
                                    <Input placeholder='Quais e distância?' />
                                </Form.Item>
                            </div>
                        }
                    </Col>


                </Row>

                <h2>Autorizações</h2>
                <Row gutter={16} >
                    <Col xs={12} md={6}>
                        <Form.Item label="Pix4D n.º" name="pix4d">
                            <Input placeholder='Pix4D n.º' />
                        </Form.Item>
                    </Col>
                    <Col xs={12} md={6}>
                        <Form.Item label="ANAC" name="anac">
                            <Input placeholder='ANAC' />
                        </Form.Item>
                    </Col>
                    <Col xs={12} md={6}>
                        <Form.Item label="AAN" name="aan">
                            <Input placeholder='AAN' />
                        </Form.Item>
                    </Col>
                    <Col span={24} >
                        <Dragger
                            name='authorizations'
                            accept='.pdf'
                            onRemove={(file) => {
                                const index = files.indexOf(file);
                                const newFileList = files.slice();
                                newFileList.splice(index, 1);
                                setFiles(newFileList);
                            }}
                            multiple
                            showUploadList
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
                            beforeUpload={(_, fileList) => {
                                setFiles(fileList);
                                return false;
                            }}
                        >
                            <p className="ant-upload-drag-icon">
                                <UploadImage src={editMode ? current.image : "/images/icons/upload.svg"} alt="upload" />
                            </p>
                            <p className="ant-upload-text">Carregue ou arraste autorizações para esta área</p>
                            <p className="ant-upload-hint">Suporte para ficheiros em formato pdf</p>
                        </Dragger>
                    </Col>
                </Row>

                <Row type="flex" style={{ gap: "10px", marginTop: files.length * 40 + "px" }}>
                    {!editMode &&
                        <SecundaryButton onClick={() => setRedirect('/painel/acidentes/create')}>
                            Adicionar registo de acidente
                        </SecundaryButton>
                    }

                    <PrimaryButton>
                        Submeter
                    </PrimaryButton>
                </Row>


            </Form >
        </div >
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        createFlightReport: (data) => dispatch(createFlightReport(data)),
        updateFlightReport: (id, data) => dispatch(updateFlightReport(id, data)),
    };
};

const mapStateToProps = (state) => {
    return {
        loading: state.flightReport.loading,
        current: state.flightReport.current,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FlightReportForm)