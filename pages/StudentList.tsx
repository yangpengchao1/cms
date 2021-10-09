import {Button, Form, Input, message, Modal, Select, Space, Table} from 'antd';
import {useEffect, useState} from "react";
import Search from "antd/lib/input/Search";
import {GetStudentsRequest} from "../libs/Entity/request/GetStudentsRequest";
import {studentAPI} from "../libs/API/StudentAPI";
import {Column} from "rc-table";
import {formatDistance, subDays} from 'date-fns'
import {useRouter} from "next/router";
import {AddStudentRequest} from "../libs/Entity/request/AddStudentRequest";
import {DeleteStudentRequest} from "../libs/Entity/request/DeleteStudentRequest";

// @ts-ignore
async function fetchData(setStudentList, setTotal, currentPage, pageSize) {
    let getStudentRequest = new GetStudentsRequest("", undefined, currentPage, pageSize);
    const resp = await studentAPI.getStudentList(getStudentRequest);
    await setStudentList(resp.data.data.students);
    await setTotal(resp.data.data.total);
}

export default function StudentList() {

    const router = useRouter();
    const [studentList, setStudentList] = useState([]);
    const [visible, setVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(1);

    const onCreate = async (values: any) => {
        debugger
        const {name, country, email, type} = values;
        console.log(name, country, email, type)

        let addStudentRequest = new AddStudentRequest(name, country, email, type);
        const resp = await studentAPI.addStudent(addStudentRequest);
        debugger
        const {code, data} = resp.data;
        if (code === 201) {
            //提示成功
            message.success("添加学生数据成功！");
            setVisible(false);
            //3秒后跳转页面
            setTimeout(function () {
                router.push("/StudentList")
            }, 3000)
        } else {
            message.error("添加学生数据失败！");
        }
    };

    function showForm() {
        setVisible(true);
    }

    async function deleteStudent(id: number) {
        let deleteStudentRequest = new DeleteStudentRequest(id);
        const resp = await studentAPI.deleteStudent(deleteStudentRequest);
        debugger
        const {code, data} = resp.data;
        if (code === 200) {
            //提示成功
            message.success("删除学生数据成功！");
            setVisible(false);
            //3秒后跳转页面
            setTimeout(function () {
                router.push("/StudentList")
            }, 3000)
        } else {
            message.error("删除学生数据失败！");
        }
        console.log(id);
    }

    useEffect(() => {
        fetchData(setStudentList, setTotal, currentPage, pageSize);
    }, [currentPage, pageSize]);

    const areaFilters = [
        {
            text: 'China',
            value: 'China',
        },
        {
            text: 'New Zealand',
            value: 'New Zealand',
        },
        {
            text: 'Canada',
            value: 'Canada',
        },
        {
            text: 'Australia',
            value: 'Australia',
        },
    ];

    const typeFilters = [
        {
            text: 'developer',
            value: 'developer',
        },
        {
            text: 'tester',
            value: 'tester',
        },
    ];

    const pagination = {
        current: currentPage,
        defaultCurrent: 1,
        defaultPageSize: 10,
        disabled: false,
        pageSize: pageSize,
        total: total,

        //页码或 pageSize 改变的回调，参数是改变后的页码及每页条数
        onChange(page: number, pageSize: number) {
            // if(pageSize!=this.defaultPageSize){
            //     setCurrentPage(this.defaultCurrent);
            //     setPageSize(pageSize);
            // }
            setCurrentPage(page);
            setPageSize(pageSize);
            console.log("onChange")
        },

        //pageSize 变化的回调
        onShowSizeChange(current: number, size: number) {
            // if(size!=this.defaultPageSize){
            setCurrentPage(this.defaultCurrent);
            setPageSize(pageSize);
            // }
            // setCurrentPage(current);
            // setPageSize(pageSize);

            console.log("onShowSizeChange")
        },
    }


    // @ts-ignore
    return (
        <>
            <div className="search-div">
                <Button type="primary" onClick={showForm}>+ Add</Button>
                <CollectionCreateForm
                    visible={visible}
                    onCreate={onCreate}
                    onCancel={() => {
                        setVisible(false);
                    }}
                />
                <Search placeholder="input search text" className="search-input"/>
            </div>
            <Table dataSource={studentList} pagination={pagination}>
                <Column title="No." key="id"
                        render={(text, record, index) => index + 1}/>
                <Column title="Name" dataIndex="name" key="name" sorter={(a, b) => {
                    a.name - b.name
                }}/>
                <Column title="Area" dataIndex="country" key="country" filters={areaFilters}/>
                <Column title="Email" dataIndex="email" key="email"/>
                <Column title="Selected Curriculum" key="courses"
                        render={(text, record) => (
                            record.courses?.map((item) => item.name).join(',')
                        )}
                />
                <Column title="Student Type" key="type.id" filters={typeFilters}
                        render={(text, record, index) => record.type.name}
                />

                <Column title="Join Time" key="createdAt"
                        render={(text, record, index) =>
                            formatDistance(subDays(new Date(), 0), Date.parse(record.createdAt))
                        }
                />
                <Column
                    title="Action"
                    key="action"
                    render={(text, record) => (
                        <Space size="middle">
                            <a onClick={showForm}>Edit</a>
                            <a onClick={()=>{
                                deleteStudent(record.id)}
                            }>Delete</a>
                        </Space>
                    )}
                />
            </Table>
        </>
    )
}

// @ts-ignore
const CollectionCreateForm = ({visible, onCreate, onCancel}) => {

    const [form] = Form.useForm();
    const {Option} = Select;

    const formItemLayout = {
        labelCol: {span: 6},
        wrapperCol: {span: 14},
    };

    return (
        <Modal
            visible={visible}
            title="Create a new collection"
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
            <Form
                {...formItemLayout}
                form={form}
                name="form_in_modal"
                initialValues={{modifier: 'public'}}
            >
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input student name',
                        },
                    ]}
                >
                    <Input placeholder="Please input student name"/>
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
        </Modal>
    );
};