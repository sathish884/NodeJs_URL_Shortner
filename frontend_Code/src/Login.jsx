import React from 'react'
import { Link } from 'react-router-dom';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { login } from './APi';

function Login() {

    const onFinish = async (values) => {
        console.log('Received values of form: ', values);
        try {
            const response = await login(values);
            if (response.status === 200) {
                console.log("result");
                return response.data;
            }
        } catch (error) {
            console.log("Api call failed : ", error);
        }
    };

    return (
        <>
            <div className="container p-5 d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                <div className="card px-5 pt-5 pb-3" style={{ width: "25rem" }}>
                    <h5 className="text-center pb-3">Login User</h5>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                    >
                        <div className="row mb-3">
                            <div className="col">
                                <Form.Item
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter your Email!',
                                        },
                                    ]}
                                >
                                    <Input prefix={<MailOutlined className="site-form-item-icon" type="email" />} placeholder="Email" />
                                </Form.Item>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter your Password!',
                                        },
                                    ]}
                                >
                                    <Input.Password
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        type="password"
                                        placeholder="Password"
                                    />
                                </Form.Item>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <Form.Item >
                                    <Form.Item name="remember" valuePropName="checked" noStyle>
                                        <Checkbox>Remember me</Checkbox>
                                    </Form.Item>

                                    <Link className="login-form-forgot" style={{ float: "right" }} to={'/forget-password'}>
                                        Forgot password
                                    </Link>
                                </Form.Item>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: "100%" }}>
                                        Log in
                                    </Button>
                                </Form.Item>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <Form.Item>
                                    Or   <Link to={'/register-user'}>register now!</Link>
                                </Form.Item>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default Login