import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { resetPassword } from './APi';

function ResetPassword() {

    const navigate = useNavigate()

    const onFinish = async (values) => {
        console.log('Received values of form: ', values);
        try {
            const response = await resetPassword(values);
            if (response.status === 200) {
                navigate('/')
                return response.data;
            }
        } catch (error) {
            console.log("Api call failed : ", error);
        }
    };


    return (
        <>
            <div className="container p-5 d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                <div className="card p-5" style={{ width: "25rem" }}>
                    <h5 className="text-center pb-3">Reset Password</h5>
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
                                    name="token"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter your token!',
                                        },
                                    ]}
                                >
                                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Token" />
                                </Form.Item>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col">
                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter your New Password!',
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
                                <Form.Item
                                    name="confirmPassword"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Confirm Password!',
                                        },
                                    ]}
                                >
                                    <Input.Password
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        type="password"
                                        placeholder="Confirm Password"
                                    />
                                </Form.Item>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col">
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: "100%" }}>
                                        Reset Password
                                    </Button>
                                </Form.Item>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default ResetPassword