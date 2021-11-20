import React, {PropsWithChildren} from "react";
import {Button, Col, DatePicker, Form, Input, InputNumber, Row, Select, Upload} from "antd";
import {InboxOutlined} from "@ant-design/icons";

const {Option} = Select;
const {TextArea} = Input;

export default function Step1(props: PropsWithChildren<any>) {

    const {current,setCurrent} = props;

    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    const children = [];

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    }

    const normFile = (e: any) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    const createCourse = () => {
        console.log(123)
        debugger
        setCurrent(current + 1);
    }

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{width: 70}}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        </Form.Item>
    );

    return (

        <Form
            form={form}
            layout="vertical"
            name="advanced_search"
            className="ant-advanced-search-form"
            onFinish={onFinish}
        >
            <Row>
                <Col span={8}>
                    <Form.Item
                        label="Course Name"
                        name="Course Name"
                        className="form-style"
                        rules={[
                            {
                                required: true,
                                message: 'Please input course Name',
                            },
                        ]}
                    >
                        <Input placeholder="Please input course Name"/>
                    </Form.Item></Col>
                <Col span={16}>
                    <Row>
                        <Col span={8}>
                            <Form.Item
                                name="Teacher"
                                label="Teacher"
                                className="form-style"
                            >
                                <Input placeholder="placeholder"/>
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item
                                name="Type"
                                label="Type"
                                className="form-style"
                            >
                                <Select mode="tags" style={{width: '100%'}} placeholder="Tags Mode"
                                        onChange={handleChange}>
                                    {children}
                                </Select>,
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="Course Code"
                                label="Course Code"
                            >
                                <Input disabled/>
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col span={8}>
                    <Form.Item
                        label="Start Date"
                        name="Start Date"
                        className="form-style"
                    >
                        <DatePicker placeholder="Select Date" style={{width: '100%'}}/>
                    </Form.Item>

                    <Form.Item
                        label="Price"
                        name="Price"
                        rules={[
                            {
                                required: true,
                                message: 'Please input course Name',
                            },
                        ]}
                        className="form-style"
                    >
                        <InputNumber prefix="$" style={{width: '100%'}}/>
                    </Form.Item>

                    <Form.Item
                        label="Student Limit"
                        name="Student Limit"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        className="form-style"
                    >
                        <InputNumber style={{width: '100%'}}/>
                    </Form.Item>


                    <Form.Item label="Duration" className="form-style">
                        <Input.Group compact>
                            <Form.Item
                                name={['Duration', 'number']}
                                noStyle
                                rules={[{required: true, message: 'Duration is required'}]}
                            >
                                <InputNumber style={{width: '80%'}}/>
                            </Form.Item>
                            <Form.Item
                                name={['Duration', 'unit']}
                                noStyle
                            >
                                <Select defaultValue="month" style={{width: '20%'}}>
                                    <Option value="month">month</Option>
                                    <Option value="year">year</Option>
                                    <Option value="day">day</Option>
                                    <Option value="week">week</Option>
                                    <Option value="hour">hour</Option>
                                </Select>
                            </Form.Item>
                        </Input.Group>
                    </Form.Item>

                </Col>
                <Col span={16}>
                    <Row>
                        <Col span={12}>
                            <Form.Item label="Description"
                                       className="form-style">
                                <TextArea maxLength={1000} minLength={100} style={{height: 290}}/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Cover">
                                <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile}
                                           noStyle>
                                    <Upload.Dragger name="files" action="/upload.do">
                                        <div style={{height: 256, verticalAlign: 'center'}}>
                                            <p className="ant-upload-drag-icon">
                                                <InboxOutlined/>
                                            </p>
                                            <h2>Click or drag file to this area to upload</h2>
                                        </div>
                                    </Upload.Dragger>
                                </Form.Item>
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Form.Item>
                <Button type="primary" htmlType="submit" onClick={createCourse}>
                    Create Course
                </Button>
            </Form.Item>
        </Form>)
}