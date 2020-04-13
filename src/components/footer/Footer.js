import React, { Component } from 'react';
import { Row, Col, Button, Modal, Form, Input, Select } from 'antd';
const { Option } = Select;

const style = {
    button: {
        display: 'flex',
        margin: '0 1rem',
        cursor: 'pointer'
    }
}
class Footer extends Component {
    constructor() {
        super();
        this.state = {
            openModel: false
        }
    }

    handleLogin = () => {
        this.setState({ openModel: true });
    }

    handleOkCancel = () => {
        this.setState({ openModel: false });
    }

    render() {
        return(
            <>
                <div style={{ 'padding': '1rem 3rem' }}>
                    <Row>
                        <Col span={2}>
                            <Button onClick={this.handleLogin} type='primary'>Login</Button>
                        </Col>
                        <Col span={2}>
                            <Button>Exit</Button>
                        </Col>
                    </Row>
                    <Modal
                        title="Log In"
                        visible={this.state.openModel}
                        onOk={this.handleOkCancel}
                        onCancel={this.handleOkCancel}
                        bodyStyle={{ paddingRight: '5rem' }}
                        centered={true}
                        footer={null}
                    >
                        <Login />
                    </Modal>
                </div>
            </>
        );
    }
}

const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
};

const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 4,
    },
};
  
class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        }
    }

    onFinish = values => {
        console.log('Success:', values);
    };
    
    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    
    handleFields = (type, e) => {
        console.log('e ', e, 'type ', type)
        this.setState({ [type]: e.target.value });
    }

    selectUser = (username) => {
        this.setState({ username });
    }

    render() {
        return (
            <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter your username!',
                        },
                    ]}
                >
                    {/* <Input onChange={this.handleFields.bind(this, 'username')} /> */}
                    <Select
                        showSearch
                        style={{ width: '100%' }}
                        placeholder="Select a User"
                        optionFilterProp="children"
                        onChange={this.selectUser}
                        // onFocus={onFocus}
                        // onBlur={onBlur}
                        // onSearch={onSearch}
                    >
                        <Option value="Administrator">Administrator</Option>
                        <Option value="Operator">Operator</Option>
                        <Option value="Customer">Customer</Option>
                    </Select>
                </Form.Item>
        
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter your password!',
                        },
                    ]}
                    >
                    <Input.Password onChange={this.handleFields.bind(this, 'password')} />
                </Form.Item>
        
                {/* <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                </Form.Item> */}
        
                <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
            </Form>      
      
        );
    }
}

export default Footer;