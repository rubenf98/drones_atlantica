import { Checkbox, Col, Form, Input, InputNumber, Row, Breadcrumb, Alert } from 'antd'
import Dragger from 'antd/es/upload/Dragger';
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import styled from "styled-components";
import { createUser, updateUser } from '../../../../redux/user/actions';
import { PrimaryButton } from '../../../globalStyles';

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
    email: [{
        required: true,
        message: 'Email é obrigatório!',
    }, {
        type: "email",
        message: 'Campo tem de ser do tipo email!',
    }],
    name: [{
        required: true,
        message: 'Nome é obrigatório!',
    }]

};

function UserForm(props) {
    const [form] = Form.useForm();
    const [file, setFile] = useState(undefined)
    const [filename, setFilename] = useState(undefined)
    const [errors, setErrors] = useState([])
    const [editMode, setEditMode] = useState(false);
    var navigate = useNavigate();
    const [searchParams, _] = useSearchParams();

    useEffect(() => {
        var hasEdit = searchParams.get("edit");

        if (hasEdit != null && props?.current?.id) {
            form.setFieldsValue({
                name: props?.current?.name,
                email: props?.current?.email,
            })

            setEditMode(true);
        }
    }, [])

    const onFinish = (values) => {

        var formData = new FormData();

        for (var key in values) {
            formData.append(key, values[key]);
        }
        if (file) {
            formData.append('file', file);
        }



        if (editMode) {
            formData.append("_method", "PATCH");
            props.updateUser(props.current.id, formData).then((response) => {
                navigate('/painel/membros');
            }).catch((err) => {
                var response = err.response.data.errors;
                var aErrors = [];
                Object.values(response).map((item) => {
                    aErrors.push(item);
                })
                setErrors(aErrors);
            });
        } else {
            props.createUser(formData).then((response) => {
                navigate('/painel/membros');
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
                        <Form.Item name="name" label="Nome" rules={rules.name}>
                            <Input placeholder='Nome' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item name="email" label="Email" rules={rules.email}>
                            <Input placeholder='Email' />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Dragger
                            name='file'
                            accept='.jpg,.jpeg,.png'
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
                                <UploadImage src={editMode ? props.current.image : "/images/icons/upload.svg"} alt="upload" />
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

const mapStateToProps = (state) => {
    return {
        loading: state.user.loading,
        current: state.user.current,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createUser: (data) => dispatch(createUser(data)),
        updateUser: (id, data) => dispatch(updateUser(id, data)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserForm)