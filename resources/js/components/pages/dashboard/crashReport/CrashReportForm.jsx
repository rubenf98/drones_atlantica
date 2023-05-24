import { Breadcrumb, Col, DatePicker, Form, Input, Row } from 'antd'
import TextArea from 'antd/es/input/TextArea';
import Dragger from 'antd/es/upload/Dragger';
import React, { useState } from 'react'
import CrashReportMapPicker from './CrashReportMapPicker';
import styled from "styled-components";
import FlightReportRemoteSelectContainer from '../flightReport/FlightReportRemoteSelectContainer';
import { PrimaryButton } from '../../../globalStyles';
import { Link, useNavigate } from 'react-router-dom';
import { createCrashReport } from '../../../../redux/crashReport/actions';
import { connect } from 'react-redux';
import Error from '../../../common/Error';
import BreadcrumbContainer from '../../../common/BreadcrumbContainer';

const UploadImage = styled.img`
    width: 60px;
    height: auto;
`;

function CrashReportForm({ createCrashReport }) {
    const [form] = Form.useForm();
    const [files, setFiles] = useState([]);
    const [errors, setErrors] = useState([]);
    var navigate = useNavigate();

    const handleArrayToFormData = (formData, array, field) => {
        for (var i = 0; i < array.length; i++) {
            formData.append(`${field}[]`, array[i]);
        }

        return formData;
    };


    const onFinish = (values) => {

        var formData = new FormData();

        for (var key in values) {
            if (values[key]) {
                formData.append(key, values[key]);
            }

        }
        files.map((file, index) => {
            formData.append("image_" + index, file);
        })

        createCrashReport(formData).then((response) => {
            navigate('/painel/acidentes');
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
        <>
            <BreadcrumbContainer
                links={[
                    { to: "/painel", name: "Início" },
                    { to: "/painel/acidentes", name: "Registo de acidentes" },
                ]}
                currentPage="Formulário"
            />
            <Form
                form={form}
                name="drone"
                layout="vertical"
                requiredMark
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Error message="Criação do registo falhou" errors={errors} />
                <h2>Registo de acidente</h2>
                <Row gutter={16}>
                    <Form.Item name="latitude" />
                    <Form.Item name="longitude" />
                    <Form.Item name="images" />
                    <Col xs={24} md={12}>
                        <Form.Item name="date" label="Data e hora">
                            <DatePicker format="DD-MM-YYYY HH:mm" style={{ width: "100%" }} showTime placeholder='DD-MM-YYYY HH:mm' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item name="flight_report_id" label="Relatório de voo">
                            <FlightReportRemoteSelectContainer />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                        <Form.Item name="damage" label="Danos ao equipamento">
                            <TextArea placeholder='Danos ao equipamento' />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={8}>
                        <Form.Item name="analysis" label="Avaliação/Análise">
                            <TextArea placeholder='Avaliação/Análise' />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={8}>
                        <Form.Item name="corrections" label="Correções">
                            <TextArea placeholder='Correções' />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <CrashReportMapPicker form={form} />
                    </Col>

                    <Col span={12}>

                        <Dragger
                            name='file'
                            accept=".jpg, .png, .jpeg"
                            onRemove={() => {
                                setFiles([]);
                            }}
                            multiple
                            showUploadList
                            onChange={(info) => {
                                // const { status } = info.file;
                                // if (status !== 'uploading') {
                                //     console.log(info.file, info.fileList);
                                // }
                                // if (status === 'done') {
                                //     console.log(`${info.file.name} file uploaded successfully.`);
                                // } else if (status === 'error') {
                                //     console.log(`${info.file.name} file upload failed.`);
                                // }
                            }}
                            beforeUpload={(_, fileList) => {
                                console.log(fileList);
                                var aFiles = [...files, ...fileList];

                                setFiles(aFiles);

                                return false;
                            }}
                        >
                            <p className="ant-upload-drag-icon">
                                <UploadImage src="/images/icons/upload.svg" alt="upload" />
                            </p>
                            <p className="ant-upload-text">Carregue ou arraste fotografias para submeter</p>
                            <p className="ant-upload-hint">
                                {files.length ? "Carregado(s) " + files.length + " ficheiros media relativos ao acidente" : "Suporte para uma imagens em formato jpeg ou jpg."}

                            </p>
                        </Dragger>
                    </Col>

                    <PrimaryButton style={{ marginTop: "30px" }}>
                        Submeter
                    </PrimaryButton>

                </Row>
            </Form>
        </>

    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        createCrashReport: (data) => dispatch(createCrashReport(data)),
    };
};
export default connect(null, mapDispatchToProps)(CrashReportForm)