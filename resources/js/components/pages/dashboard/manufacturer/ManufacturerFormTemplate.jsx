import { Col, Form, Input, Row } from 'antd'
import React from 'react'


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

function ManufacturerFormTemplate() {

    return (


        <Row gutter={16}>
            <Col xs={24} md={12}>
                <Form.Item name="name" label="Nome do fabricante" rules={rules.serial_number}>
                    <Input placeholder='Nome' />
                </Form.Item>
            </Col>
           
            <Col xs={24} md={12}>
                <Form.Item name="address" label="Morada">
                    <Input placeholder='Morada' />
                </Form.Item>
            </Col>

            <Col xs={24} md={6}>
                <Form.Item name="title" label="Título do fabricante">
                    <Input placeholder='Designação' />
                </Form.Item>
            </Col>

            <Col xs={12} md={6}>
                <Form.Item name="door_number" label="Número da Porta">
                    <Input placeholder='Número da Porta' />
                </Form.Item>
            </Col>

            <Col xs={12} md={6}>
                <Form.Item name="postal_code" label="Código postal">
                    <Input placeholder='Código postal' />
                </Form.Item>
            </Col>
            <Col xs={12} md={6}>
                <Form.Item name="locality" label="Localidade">
                    <Input placeholder='Localidade' />
                </Form.Item>
            </Col>
            <Col xs={12} md={6}>
                <Form.Item name="country" label="País de registo do fabricante">
                    <Input placeholder='País de registo' />
                </Form.Item>
            </Col>

            <Col xs={12} md={6}>
                <Form.Item name="email" label="Email">
                    <Input placeholder='Email' />
                </Form.Item>
            </Col>
            <Col xs={12} md={6}>
                <Form.Item name="phone" label="Número de telefone">
                    <Input placeholder='Número de telefone' />
                </Form.Item>
            </Col>

        </Row>



    )
}

export default ManufacturerFormTemplate