import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { MailOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { forgetPassword } from './APi';

function ForgetPassword() {

    const navigate = useNavigate();

    const onFinish = async (values) => {
        console.log('Received values of form: ', values);
        try {
            const response = await forgetPassword(values);
            if (response.status === 200) {
                navigate('/reset-password')
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
                    <h5 className="text-center pb-3">Forget Password</h5>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                    >
                        <div className="row">
                            <div className="col">
                                <Form.Item
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter your email!',
                                        },
                                    ]}
                                >
                                    <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" type="email" />
                                </Form.Item>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: "100%" }}>
                                        Submit
                                    </Button>
                                </Form.Item>
                            </div>
                        </div>

                    </Form>
                    {/* <form action="">

                        <div className="row">
                            <div className="col mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="email" placeholder="Enter your email" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <Link to={'/reset-password'}> <button type='submit' className='btn btn-primary' style={{ width: "100%" }}>Submit</button></Link>
                            </div>
                        </div>
                    </form> */}
                </div>
            </div>
        </>
    )
}

export default ForgetPassword