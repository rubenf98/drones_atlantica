import { Form, Breadcrumb, Alert } from 'antd'
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import ManufacturerFormTemplate from './ManufacturerFormTemplate';

import { createManufacturer, updateManufacturer } from '../../../../redux/manufacturer/actions';
import { PrimaryButton } from '../../../globalStyles';

function ManufacturerForm(props) {
    const [form] = Form.useForm();
    const [errors, setErrors] = useState([])
    const [editMode, setEditMode] = useState(false);
    var navigate = useNavigate();
    const [searchParams, _] = useSearchParams();

    useEffect(() => {
        var hasEdit = searchParams.get("edit");

        if (hasEdit != null && props?.current?.id) {
            form.setFieldsValue({
                name: props?.current?.name,
                address: props?.current?.address,
                title: props?.current?.title,
                door_number: props?.current?.door_number,
                postal_code: props?.current?.postal_code,
                locality: props?.current?.locality,
                country: props?.current?.country,
                email: props?.current?.email,
                phone: props?.current?.phone,
            })

            setEditMode(true);
        }
    }, [])

    const onFinish = (values) => {

        if (editMode) {
            props.updateManufacturer(props.current.id, values).then((response) => {
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
            props.createManufacturer(values).then((response) => {
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

const mapStateToProps = (state) => {
    return {
        loading: state.manufacturer.loading,
        current: state.manufacturer.current,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateManufacturer: (id, data) => dispatch(updateManufacturer(id, data)),
        createManufacturer: (data) => dispatch(createManufacturer(data)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ManufacturerForm)