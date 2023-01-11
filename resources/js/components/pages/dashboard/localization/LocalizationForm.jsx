import { Col, Form, Input, Row } from 'antd'
import React from 'react'
import LocalizationMapPicker from './LocalizationMapPicker';


const rules = {
    serial_number: [{
        required: false,
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

function LocalizationForm({ form, prefix }) {

    return (


        <Row gutter={16}>
            <Col xs={24} md={8}>
                <Form.Item name={prefix + "_district"} label="Distrito" rules={rules.serial_number}>
                    <Input placeholder='Distrito' />
                </Form.Item>
            </Col>

            <Col xs={24} md={8}>
                <Form.Item name={prefix + "_conceil"} label="Concelho" rules={rules.serial_number}>
                    <Input placeholder='Concelho' />
                </Form.Item>
            </Col>

            <Col xs={24} md={8}>
                <Form.Item name={prefix + "_place"} label="Local" rules={rules.serial_number}>
                    <Input placeholder='Local' />
                </Form.Item>
            </Col>


            <Form.Item name={prefix + "_latitude"} />
            <Form.Item name={prefix + "_longitude"} />

            <Col span={24}>
                <LocalizationMapPicker prefix={prefix} form={form} />
            </Col>

        </Row>



    )
}

export default LocalizationForm