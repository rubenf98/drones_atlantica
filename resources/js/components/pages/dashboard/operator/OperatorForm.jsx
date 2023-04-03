import { Form, Breadcrumb, Alert } from 'antd'
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import OperatorFormTemplate from './OperatorFormTemplate';

import { createOperator, updateOperator } from '../../../../redux/operator/actions';
import { PrimaryButton } from '../../../globalStyles';


function FlightReportForm(props) {
    const [form] = Form.useForm();
    const [errors, setErrors] = useState([])
    const [editMode, setEditMode] = useState(false);
    var navigate = useNavigate();
    const [searchParams, _] = useSearchParams();

    useEffect(() => {
        var hasEdit = searchParams.get("edit");

        if (hasEdit != null && props?.current?.id) {
            form.setFieldsValue({
                operator_name: props?.current?.name,
                operator_address: props?.current?.address,
                operator_title: props?.current?.title,
                operator_door_number: props?.current?.door_number,
                operator_postal_code: props?.current?.postal_code,
                operator_locality: props?.current?.locality,
                operator_country: props?.current?.country,
                operator_email: props?.current?.email,
                operator_phone: props?.current?.phone,
            })

            setEditMode(true);
        }
    }, [])

    const onFinish = (values) => {
        if (editMode) {
            props.updateOperator(props.current.id, values).then(() => {
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
            props.createOperator(values).then(() => {
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
                name="flight_report"
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
                <OperatorFormTemplate />

                <PrimaryButton>
                    Submeter
                </PrimaryButton>
            </Form >
        </div >
    )
}

const mapStateToProps = (state) => {
    return {
        loading: state.operator.loading,
        current: state.operator.current,
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        createOperator: (data) => dispatch(createOperator(data)),
        updateOperator: (id, data) => dispatch(updateOperator(id, data)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(FlightReportForm)