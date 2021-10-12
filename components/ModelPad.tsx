import {Form, Modal} from "antd";
import {PropsWithChildren} from "react";
import StudentForm from "./StudentForm";

const ModalPad = (props: PropsWithChildren<any>) => {

    const {title, visible, onCreate, onCancel,studentData} = props;
    // console.log(studentData.name)

    const [form] = Form.useForm();

    return (
        <Modal
            visible={visible}
            title={title}
            okText="Create"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then(values => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch(info => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <StudentForm studentData={studentData} form={form}/>
        </Modal>
    );
    // };
}

export default ModalPad;