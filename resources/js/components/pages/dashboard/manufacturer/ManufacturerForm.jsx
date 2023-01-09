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

function ManufacturerForm() {

    return (


        <Row gutter={16}>
            <Col xs={24} md={12}>
                <Form.Item name="name" label="Nome do proprietário" rules={rules.serial_number}>
                    <Input placeholder='0001' />
                </Form.Item>
            </Col>
           
            <Col xs={24} md={12}>
                <Form.Item name="address" label="Morada" rules={rules.serial_number}>
                    <Input placeholder='0001' />
                </Form.Item>
            </Col>

            <Col xs={24} md={6}>
                <Form.Item name="title" label="Título do proprietário" rules={rules.serial_number}>
                    <Input placeholder='Designação' />
                </Form.Item>
            </Col>

            <Col xs={12} md={6}>
                <Form.Item name="door_number" label="Número da Porta" rules={rules.serial_number}>
                    <Input placeholder='0001' />
                </Form.Item>
            </Col>

            <Col xs={12} md={6}>
                <Form.Item name="postal_code" label="Código postal" rules={rules.serial_number}>
                    <Input placeholder='0001' />
                </Form.Item>
            </Col>
            <Col xs={12} md={6}>
                <Form.Item name="locality" label="Localidade" rules={rules.serial_number}>
                    <Input placeholder='0001' />
                </Form.Item>
            </Col>
            <Col xs={12} md={6}>
                <Form.Item name="country" label="País de registo do proprietário" rules={rules.serial_number}>
                    <Input placeholder='0001' />
                </Form.Item>
            </Col>

            <Col xs={12} md={6}>
                <Form.Item name="email" label="Email" rules={rules.serial_number}>
                    <Input placeholder='0001' />
                </Form.Item>
            </Col>
            <Col xs={12} md={6}>
                <Form.Item name="phone" label="Número de telefone" rules={rules.serial_number}>
                    <Input placeholder='0001' />
                </Form.Item>
            </Col>

        </Row>



    )
}

export default ManufacturerForm