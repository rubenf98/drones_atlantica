import { Col, Form, Input, Row } from 'antd'
import React from 'react'


const rules = {
    name: [{
        required: true,
        message: 'O nome do operador é obrigatório!',
    }],
    email: [{
        required: true,
        message: 'O email do operador é obrigatório!',
    }, {
        type: "email",
        message: 'O email fornecido não é válido!',
    }],
};

function OperatorFormTemplate() {

    return (
        <>
            <h2>Dados do operador</h2>
            <Row gutter={16}>

                <Col xs={24} md={12}>
                    <Form.Item name="operator_name" label="Nome do operador" rules={rules.name}>
                        <Input placeholder='Nome do operador' />
                    </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                    <Form.Item name="operator_address" label="Morada">
                        <Input placeholder='Morada' />
                    </Form.Item>
                </Col>

                <Col xs={24} md={6}>
                    <Form.Item name="operator_title" label="Título do operador">
                        <Input placeholder='Título do operador' />
                    </Form.Item>
                </Col>

                <Col xs={12} md={6}>
                    <Form.Item name="operator_door_number" label="Número da Porta">
                        <Input placeholder='Número da Porta' />
                    </Form.Item>
                </Col>

                <Col xs={12} md={6}>
                    <Form.Item name="operator_postal_code" label="Código postal">
                        <Input placeholder='Código postal' />
                    </Form.Item>
                </Col>
                <Col xs={12} md={6}>
                    <Form.Item name="operator_locality" label="Localidade">
                        <Input placeholder='Localidade' />
                    </Form.Item>
                </Col>
                <Col xs={12} md={6}>
                    <Form.Item name="operator_country" label="País de registo do proprietário">
                        <Input placeholder='País de registo do proprietário' />
                    </Form.Item>
                </Col>

                <Col xs={12} md={6}>
                    <Form.Item name="operator_email" label="Email" rules={rules.email}>
                        <Input placeholder='Email do operador' />
                    </Form.Item>
                </Col>
                <Col xs={12} md={6}>
                    <Form.Item name="operator_phone" label="Número de telefone">
                        <Input placeholder='Número de telefone' />
                    </Form.Item>
                </Col>

            </Row>
        </>


    )
}

export default OperatorFormTemplate