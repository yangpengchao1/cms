import {Button, message, Space, Table} from 'antd';
import React, {useEffect, useState} from "react";
import Search from "antd/lib/input/Search";
import {GetStudentsRequest} from "../../../../libs/Entity/request/GetStudentsRequest";
import {studentAPI} from "../../../../libs/API/StudentAPI";
import {Column} from "rc-table";
import {formatDistance, subDays} from 'date-fns'
import {useRouter} from "next/router";
import {AddStudentRequest} from "../../../../libs/Entity/request/AddStudentRequest";
import {DeleteStudentRequest} from "../../../../libs/Entity/request/DeleteStudentRequest";
import {GetStudentRequest} from "../../../../libs/Entity/request/GetStudentRequest";
import ModalPad from '../../../../components/ModelPad';
import handler from "../../../api/hello";
import AppLayout from "../../../../components/layout/AppLayout";

// @ts-ignore
async function fetchData(setStudentList, setTotal, currentPage, pageSize) {
    let getStudentRequest = new GetStudentsRequest("", undefined, currentPage, pageSize);
    const resp = await studentAPI.getStudentList(getStudentRequest);
    await setStudentList(resp.data.data.students);
    await setTotal(resp.data.data.total);
}

export default function Students() {

    const router = useRouter();
    const [studentList, setStudentList] = useState([]);
    const [visible, setVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(1);
    const [title, setTitle] = useState("");
    const [studentData, setStudentData] = useState({});

    const onCreate = async (values: any) => {
        debugger
        const {name, country, email, type} = values;
        // console.log(name, country, email, type)

        let addStudentRequest = new AddStudentRequest(name, country, email, type);
        const resp = await studentAPI.addStudent(addStudentRequest);
        const {code, data} = resp.data;
        if (code === 201) {
            //提示成功
            message.success("Successfully added！");
            setVisible(false);
            //3秒后跳转页面
            debugger
            setTimeout(function () {
                debugger
                alert()
                router.push("/Index")
            }, 3000)
        } else {
            message.error("Add failed ！");
        }
    };

    function showForm() {
        setVisible(true);
        setTitle("Add students information");
    }

    async function updateStudent(id: number) {
        showForm();
        setTitle("Update students information");
        let getStudentRequest = new GetStudentRequest(id);
        const resp = await studentAPI.getStudent(getStudentRequest);
        const {code, data} = resp.data;
        setStudentData(data);
        debugger
        // console.log(data);
    }

    async function deleteStudent(id: number) {
        let deleteStudentRequest = new DeleteStudentRequest(id);
        const resp = await studentAPI.deleteStudent(deleteStudentRequest);
        const {code, data} = resp.data;
        if (code === 200) {
            //提示成功
            message.success("Successfully deleted！");
            setVisible(false);
            //3秒后跳转页面
            setTimeout(function () {
                router.push("/Index")
            }, 3000)
        } else {
            message.error("Delete failed ！");
        }
        // console.log(id);
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
            if (pageSize != this.defaultPageSize) {
                setCurrentPage(this.defaultCurrent);
                setPageSize(pageSize);
            } else {
                setCurrentPage(page);
                setPageSize(pageSize);
            }
        }
    }


    // @ts-ignore
    return (
        <AppLayout>
            <div className="search-div">
                <Button type="primary" onClick={showForm}>+ Add</Button>
                <ModalPad
                    title={title}
                    studentData={studentData}
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
                            <a onClick={() => {
                                updateStudent(record.id)
                            }
                            }>Edit</a>
                            <a onClick={() => {
                                deleteStudent(record.id)
                            }
                            }>Delete</a>
                        </Space>
                    )}
                />
            </Table>
        </AppLayout>
    )
}