import React, {PropsWithChildren} from "react";
import {Button, Col, Form, Input, message, Row} from "antd";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";

export default function Step2(props: PropsWithChildren<any>) {

    const {current, setCurrent} = props;

    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    return (
        <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
            <Row gutter={[6, 16]}>
                <Col span={12}>
                    <h2>Chapters</h2>
                    <Form.List name="users">
                        {(fields, {add, remove}) => (
                            <>
                                {fields.map(({key, name, fieldKey, ...restField}) => (

                                    <Row gutter={20}>
                                        <Col span={8}>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'first']}
                                                fieldKey={[fieldKey, 'first']}
                                                rules={[{required: true, message: 'Missing first name'}]}
                                            >
                                                <Input placeholder="First Name"/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'last']}
                                                fieldKey={[fieldKey, 'last']}
                                                rules={[{required: true, message: 'Missing last name'}]}
                                            >
                                                <Input placeholder="Last Name"/>
                                            </Form.Item>
                                        </Col>


                                        <Col span={2}>
                                            <Form.Item>
                                                <MinusCircleOutlined
                                                    onClick={() => {
                                                        if (fields.length > 1) {
                                                            remove(name);
                                                        } else {
                                                            message.warn('You must set at least one chapter.');
                                                        }
                                                    }}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>


                                ))}
                                <Row>
                                    <Col span={20}>
                                        <Form.Item>
                                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
                                                Add Chapter
                                            </Button>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </>
                        )}
                    </Form.List>
                </Col>

                <Col span={12}>
                    <h2>Class times</h2>
                    <Form.List name="users">
                        {(fields, {add, remove}) => (
                            <>
                                {fields.map(({key, name, fieldKey, ...restField}) => (

                                    <Row gutter={20}>
                                        <Col span={8}>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'first']}
                                                fieldKey={[fieldKey, 'first']}
                                                rules={[{required: true, message: 'Missing first name'}]}
                                            >
                                                <Input placeholder="First Name"/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'last']}
                                                fieldKey={[fieldKey, 'last']}
                                                rules={[{required: true, message: 'Missing last name'}]}
                                            >
                                                <Input placeholder="Last Name"/>
                                            </Form.Item>
                                        </Col>


                                        <Col span={2}>
                                            <Form.Item>
                                                <MinusCircleOutlined
                                                    onClick={() => {
                                                        if (fields.length > 1) {
                                                            remove(name);
                                                        } else {
                                                            message.warn('You must set at least one chapter.');
                                                        }
                                                    }}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>


                                ))}
                                <Row>
                                    <Col span={20}>
                                        <Form.Item>
                                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
                                                Add Class Time
                                            </Button>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </>
                        )}
                    </Form.List>
                </Col>
            </Row>
        </Form>)
}