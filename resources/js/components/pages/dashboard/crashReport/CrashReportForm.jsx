import { Breadcrumb, Col, DatePicker, Form, Input, Row } from 'antd'
import TextArea from 'antd/es/input/TextArea';
import Dragger from 'antd/es/upload/Dragger';
import React, { useState, useEffect } from 'react'
import CrashReportMapPicker from './CrashReportMapPicker';
import styled from "styled-components";
import FlightReportRemoteSelectContainer from '../flightReport/FlightReportRemoteSelectContainer';
import { PrimaryButton } from '../../../globalStyles';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { createCrashReport, updateCrashReport } from '../../../../redux/crashReport/actions';
import { connect } from 'react-redux';
import Error from '../../../common/Error';
import BreadcrumbContainer from '../../../common/BreadcrumbContainer';
import dayjs from 'dayjs';

const UploadImage = styled.img`
    width: 60px;
    height: auto;
`;

const ImageContainer = styled.section`
    display: flex;
    width: 100%;
    justify-content: flex-start;
    gap: 30px;
    flex-wrap: wrap;
    align-items: center;
    margin: 50px auto;

    img {
        cursor: not-allowed;
        width: 20%;
        transition: all .3s ease;

        &:hover {
            opacity: .3;
        }
    }

    .remove {
        opacity: .3;
        cursor: pointer;
    }

`;

function CrashReportForm({ createCrashReport, updateCrashReport, current }) {
    const [form] = Form.useForm();
    const [location, setLocation] = useState({ lat: 32.7, lng: -16.9 });
    const [files, setFiles] = useState([]);
    const [remove, setRemove] = useState([]);
    const [errors, setErrors] = useState([]);
    const [editMode, setEditMode] = useState(false);
    var navigate = useNavigate();
    const [searchParams, _] = useSearchParams();

    useEffect(() => {
        var hasEdit = searchParams.get("edit");
        if (hasEdit != null && current.id) {

            form.setFieldsValue({
                date: dayjs(current.date, 'DD-MM-YYYY HH:mm', true),
                flight_report_id: current.flightReport.id,
                description: current.description,
                damage: current.damage,
                analysis: current.analysis,
                corrections: current.corrections,
                latitude: parseFloat(current.latitude),
                longitude: parseFloat(current.longitude),
            })

            setLocation({ lat: parseFloat(current.latitude), lng: parseFloat(current.longitude) });

            setEditMode(true);
        }

    }, [])

    const handleArrayToFormData = (formData, array, field) => {
        for (var i = 0; i < array.length; i++) {
            formData.append(`${field}[]`, array[i]);
        }

        return formData;
    };


    const onFinish = (values) => {
        var formData = new FormData();
        console.log(values);
        for (var key in values) {
            if (values[key]) {
                formData.append(key, values[key]);
            }
        }

        files.map((file, index) => {
            formData.append("image_" + index, file);
        })

        if (editMode) {
            formData = handleArrayToFormData(formData, remove, 'remove');
            formData.append("_method", "PATCH");

            updateCrashReport(current.id, formData).then(() => {
                navigate('/painel/acidentes');
            }).catch((err) => {
                var response = err.response.data.errors;
                var aErrors = [];
                Object.values(response).map((item) => {
                    aErrors.push(item);
                })
                setErrors(aErrors);
            });
        } else {


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


    }

    const handleImageClick = (id) => {
        if (remove.includes(id)) {
            var copy = [...remove];
            const index = copy.indexOf(id);
            copy.splice(index, 1);
            setRemove(copy);
        } else {
            setRemove([...remove, id]);
        }
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
                <Row type="flex" gutter={16}>
                    <Form.Item name="latitude" >
                        <></>
                    </Form.Item>
                    <Form.Item name="longitude" >
                        <></>
                    </Form.Item>
                    <Form.Item name="images" >
                        <></>
                    </Form.Item>
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
                    <Col xs={24} md={24}>
                        <Form.Item name="description" label="Descrição do acidente">
                            <TextArea placeholder='Descrição do acidente' />
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

                    <Col xs={24} md={12}>
                        <CrashReportMapPicker location={location} setLocation={setLocation} form={form} />
                    </Col>


                    <Col xs={24} md={12}>
                        <Dragger
                            name='file'
                            accept=".jpg, .png, .jpeg"
                            onRemove={() => {
                                setFiles([]);
                            }}
                            multiple
                            showUploadList
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

                    <ImageContainer>
                        {current.media && current.media.length ? current.media.map((image) => (
                            <img onClick={() => handleImageClick(image.id)} className={remove.includes(image.id) ? 'remove' : ''} src={"/storage/crash_reports/" + image.path + "." + image.file_type} alt={image.id} />
                        )) : <></>}
                    </ImageContainer>
                </Row>

                <PrimaryButton style={{ marginTop: "30px" }}>
                    Submeter
                </PrimaryButton>
            </Form>
        </>

    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        createCrashReport: (data) => dispatch(createCrashReport(data)),
        updateCrashReport: (id, data) => dispatch(updateCrashReport(id, data)),
    };
};

const mapStateToProps = (state) => {
    return {
        loading: state.crashReport.loading,
        current: state.crashReport.current,
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(CrashReportForm)