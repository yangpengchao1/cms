import {Button, Form, Input, message, Select} from "antd";
import React, {PropsWithChildren} from "react";
import {studentAPI} from "../libs/API/StudentAPI";
import {AddStudentRequest} from "../libs/Entity/request/AddStudentRequest";
import {UpdateStudentRequest} from "../libs/Entity/request/UpdateStudentRequest";

const StudentForm = (props: PropsWithChildren<any>) => {

    const {studentData, setVisible, addOrUpdate, doRefresh, setLoading} = props;

    const {Option} = Select;

    const [form] = Form.useForm();

    const formItemLayout = {
        labelCol: {span: 6},
        wrapperCol: {span: 14},
    };

    const saveData = async (values: any) => {
        setLoading(true);
        const {name, country, email, type, id} = values;
        if (id === "" || id === null || id === undefined) {
            let addStudentRequest = new AddStudentRequest(name, country, email, type);
            const resp = await studentAPI.addStudent(addStudentRequest);
            setLoading(false);
            const {code} = resp.data;
            if (code === 201) {
                //提示成功
                message.success("Successfully added！");
                setVisible(false);
                //3秒后跳转页面
                setTimeout(function () {
                    doRefresh();
                }, 3000)
            } else {
                message.error("Add failed ！");
            }
        } else {
            let updateStudentRequest = new UpdateStudentRequest(name, country, email, type, id);
            const resp = await studentAPI.updateStudent(updateStudentRequest);
            setLoading(false);
            const {code} = resp.data;
            if (code === 200) {
                //提示成功
                message.success("Successfully updated！");
                setVisible(false);
                //3秒后跳转页面
                setTimeout(function () {
                    doRefresh();
                }, 3000)
            } else {
                message.error("Update failed ！");
            }
        }
    };

    function onReset() {
        setVisible(false);
        form.resetFields();
    }

    return (
        <Form
            onFinish={saveData}
            {...formItemLayout}
            form={form}
            name="form_in_modal"
            initialValues={{
                id: studentData?.id,
                name: studentData?.name,
                email: studentData?.email,
                country: studentData?.country,
                type: studentData?.type.id.toString()
            }}
        >
            <Form.Item name="id" hidden="true"/>

            <Form.Item
                name="name"
                label="Name"
                rules={[
                    {
                        required: true,
                        message: 'Please input students name',
                    },
                ]}
            >
                <Input type="text" placeholder="Please input name"/>
            </Form.Item>

            <Form.Item
                name="email"
                label="Email"
                rules={[
                    {
                        required: true,
                        type: 'email',
                        message: 'Please input email address',
                    },
                ]}
            >
                <Input placeholder="Please input email address"/>
            </Form.Item>

            <Form.Item
                name="country"
                label="Area"
                hasFeedback
                rules={[{required: true, message: 'Please select your country!'}]}
            >
                <Select placeholder="Please select an area">
                    <Option value="China">China</Option>
                    <Option value="New Zealand">New Zealand</Option>
                    <Option value="Canada">Canada</Option>
                    <Option value="Australia">Australia</Option>
                </Select>
            </Form.Item>

            <Form.Item
                name="type"
                label="Student Type"
                rules={[{required: true, message: 'Please select your country!'}]}
            >
                <Select placeholder="Please select a student type">
                    <Option value="1">Tester</Option>
                    <Option value="2">Developer</Option>
                </Select>
            </Form.Item>
            <Form.Item className="modal-form-button">
                <Button type="primary" htmlType="submit" className="modal-form-button-submit">
                    {addOrUpdate}
                </Button>
                <Button htmlType="button" onClick={onReset}>
                    Cancel
                </Button>
            </Form.Item>
        </Form>
    );
}

export default StudentForm;