import {Form, Input, Select} from "antd";
import {PropsWithChildren} from "react";

const StudentForm = (props: PropsWithChildren<any>) => {

    const {studentData, form} = props;

    const {Option} = Select;

    const formItemLayout = {
        labelCol: {span: 6},
        wrapperCol: {span: 14},
    };

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="form_in_modal"
            // initialValues={{modifier: 'public'}}
            initialValues={{
                'name': studentData.name,
                // 'checkbox-group': ['A', 'B'],
                // rate: 3.5,
                modifier: 'public'
            }}
        >
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
                <Input placeholder={studentData}/>
                {/*<Input placeholder="Please input students name"/>*/}
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
                hasFeedback
                rules={[{required: true, message: 'Please select your country!'}]}
            >
                <Select placeholder="Please select a student type">
                    <Option value="1">Tester</Option>
                    <Option value="2">Developer</Option>
                </Select>
            </Form.Item>

        </Form>
    );
    // };
}

export default StudentForm;