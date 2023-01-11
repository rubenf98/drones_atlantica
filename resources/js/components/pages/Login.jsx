import React from 'react'
import styled from 'styled-components';
import { Form, Button, Input, Row } from 'antd';
import { login, setAuthorizationToken } from '../../redux/auth/actions';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Container = styled.section`
    min-height: 100vh;
    min-width: 100vw;
    background-color: #f3f2f2;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Card = styled.div`
    width: 50%;
    max-width: 1000px;
    min-width: 300px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    border-radius: 6px;
    box-shadow: 0 0 15px 0 rgba(0,0,0,.1);

    .image-container {
        width: 40%;
        

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-top-left-radius: 6px;
            border-bottom-left-radius: 6px;
        }
    }

    .form-container {
        width: 60%;
        padding: 50px;
        box-sizing: border-box;

        h1 {
            color: rgba(0,0,0,.5);
            font-weight: 700; 
            font-size: 36px; 
            opacity: .8;

            span {
                color:  rgba(0,0,0,1);
            }
        }

        p {
            width: 80%;
            font-size: 16px;
            margin-bottom: 40px;
        }

        .ant-form-item-control-input {
            border-bottom: 1px solid #777;
            border-radius: 0px;

            img {
                width: 15px;
                margin-right: 10px;
            }
        }
    }
`;

function Login({ login }) {
    let navigate = useNavigate();

    const onFinish = (values) => {
        login(values).then((response) => {
            const token = response.value.data.access_token;
            localStorage.setItem("token", token);
            setAuthorizationToken(token);
            navigate("/painel")
        });
        console.log('Received values of form: ', values);
    };

    return (
        <Container>
            <Card>
                <div className='image-container'>
                    <img src="/images/login.jpg" alt="drone flying" />
                </div>
                <div className='form-container'>
                    <h1>Drones <span>Atlântica</span></h1>
                    <p>Bem vindo! Inicia sessão na tua conta para aceder aos registos de inventário.</p>

                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Introduza o seu email!',
                                },
                            ]}
                        >
                            <Input prefix={<img src="/icon/user.svg" />} size="large" bordered={false} placeholder="Email" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Introduza a sua password!',
                                },
                            ]}
                        >
                            <Input prefix={<img src="/icon/password.svg" />} size="large"
                                bordered={false}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <br />
                        <Row type="flex" justify="space-between">
                            <a className="login-form-forgot" href="">
                                Recuperar password
                            </a>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Iniciar sessão
                            </Button>
                        </Row>
                    </Form>
                </div>
            </Card>
        </Container>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (data) => dispatch(login(data)),
    };
};
export default connect(null, mapDispatchToProps)(Login)