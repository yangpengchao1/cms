import {Button, message, Space, Table} from 'antd';
import React, {useEffect, useState} from "react";
import Search from "antd/lib/input/Search";
import {GetStudentsRequest} from "../../../../libs/Entity/request/GetStudentsRequest";
import {studentAPI} from "../../../../libs/API/StudentAPI";
import {formatDistance, subDays} from 'date-fns'
import {DeleteStudentRequest} from "../../../../libs/Entity/request/DeleteStudentRequest";
import ModalPad from '../../../../components/ModalPad';
import AppLayout from "../../../../components/layout/AppLayout";
import {Student} from "../../../../libs/Entity/Student";
import StudentForm from "../../../../components/StudentForm";
import Link from 'next/link';
import { v4 } from "uuid";

// @ts-ignore
async function fetchData(setStudentList, setTotal, currentPage, pageSize, setLoading) {
    setLoading(true);
    let getStudentRequest = new GetStudentsRequest("", undefined, currentPage, pageSize);
    const resp = await studentAPI.getStudentList(getStudentRequest);
    setLoading(false);
    await setStudentList(resp.data.data.students);
    await setTotal(resp.data.data.total);
}

export default function Students() {

    const [studentList, setStudentList] = useState([]);
    const [visible, setVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(1);
    const [title, setTitle] = useState("");
    // @ts-ignore
    const [studentData, setStudentData] = useState(null);
    const [addOrUpdate, setAddOrUpdate] = useState("");
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        refresh && setTimeout(() => setRefresh(false))
    }, [refresh])

    const doRefresh = () => setRefresh(true);

    function showForm(operation: string) {
        setVisible(true);
        setTitle(operation + " students information");
        setAddOrUpdate(operation);
    }

    async function deleteStudent(id: number) {
        setLoading(true);
        let deleteStudentRequest = new DeleteStudentRequest(id);
        const resp = await studentAPI.deleteStudent(deleteStudentRequest);
        setLoading(false);
        const {code} = resp.data;
        if (code === 200) {
            //提示成功
            message.success("Successfully deleted！");
            //3秒后跳转页面
            setTimeout(function () {
                doRefresh();
            }, 3000)
        } else {
            message.error("Delete failed ！");
        }
    }

    useEffect(() => {
        fetchData(setStudentList, setTotal, currentPage, pageSize, setLoading);
    }, [currentPage, pageSize, refresh]);



    const columns = [
        {
            title: 'No.',
            key: v4(),
            render: (text, row, index) => index + 1,
        },
        {
            title: 'Name',
            key: v4(),
            dataIndex: 'name',
            render: (text, row, index) => <Link href={`/dashboard/manager/students/${row.id}`}>{row.name}</Link>,
            sorter: (pre: Student, next: Student) => {
                const preCode = pre.name.charCodeAt(0);
                const nextCode = next.name.charCodeAt(0);

                return preCode > nextCode ? 1 : preCode === nextCode ? 0 : -1;
            },
        },
        {
            title: 'Area',
            key: v4(),
            dataIndex: 'country',
            filters: [
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
            ],
            onFilter: (value, record) => record.country.indexOf(value) === 0,
        },
        {
            title: 'Email',
            key: v4(),
            dataIndex: 'email',
        },
        {
            title: 'Selected Curriculum',
            key: v4(),
            dataIndex: 'courses',
            render: (text, record, index) => (
                record.courses?.map((item: { name: any; }) => item.name).join(',')
            ),
        },
        {
            title: 'Student Type',
            key: v4(),
            render: (text, record: Student) => record.type.name,
            filters: [
                {
                    text: 'tester',
                    value: 'tester',
                },
                {
                    text: 'developer',
                    value: 'developer',
                },
            ],
            onFilter: (value, record: Student) => record.type.name.indexOf(value) === 0,
        },

        {
            title: 'Join Time',
            key: v4(),
            render: (_, record: Student) => (
                formatDistance(subDays(new Date(), 0), Date.parse(record.createdAt.toString()))
            ),
        },
        {
            title: 'Action',
            key: v4(),
            render: (_, record: Student) => (
                <Space size="middle">
                    <a onClick={() => {
                        setStudentData(record);
                        showForm("Update");
                    }
                    }>Edit</a>
                    <a onClick={() => {
                        deleteStudent(record.id);
                    }
                    }>Delete</a>
                </Space>
            )
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

    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }

    return (
        <AppLayout>
            <div className="search-div">
                <Button type="primary"
                        onClick={() => {
                            setStudentData(null);
                            showForm("Add");
                        }}>+ Add</Button>
                <ModalPad
                    title={title}
                    visible={visible}
                    // onCreate={onCreate}
                    onCancel={() => {
                        setVisible(false);
                    }}
                >
                    <StudentForm studentData={studentData} setVisible={setVisible} addOrUpdate={addOrUpdate}
                                 doRefresh={doRefresh} setLoading={setLoading}/>
                </ModalPad>
                <Search placeholder="input search text" className="search-input"/>
            </div>

            <Table loading={loading} columns={columns} dataSource={studentList} pagination={pagination}
                   onChange={onChange}/>

        </AppLayout>

    )
}