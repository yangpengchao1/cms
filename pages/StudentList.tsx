import {Button, Space, Table} from 'antd';
import {useEffect, useState} from "react";
import {createGet} from "../libs/API/AuthAPI";
import {API_HOST} from "../libs/constant/Config";
import {RequestURL} from "../libs/enum/RequestURL";
import Search from "antd/lib/input/Search";

async function fetchData(setStudentList) {
    const url = API_HOST + RequestURL.STUDENT_LIST + `?page=1&limit=10`;
    const res = await createGet(url);
    await setStudentList(res.data.data.students);
    debugger
}

export default function StudentList() {

    const [studentList, setStudentList] = useState([]);

    useEffect(() => {
        fetchData(setStudentList);
        debugger
    }, []);

    const columns = [
        {
            title: 'No.',
            dataIndex: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Area',
            dataIndex: 'country',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Selected Curriculum',
            dataIndex: '',
        },
        {
            title: 'Student Type',
            dataIndex: 'type.name',
            // sorter: (a, b) => a.age - b.age,
        },
        {
            title: 'Join Time',
            dataIndex: 'createdAt',
            // sorter: (a, b) => a.age - b.age,
        },
        {
            title: 'Action',
            key: 'action',
            // @ts-ignore
            render: (text, record) => (
                <Space size="middle">
                    <a>Invite {record.name}</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];

    return (
        <>
            <div className="search-div">
                <Button type="primary">+ Add</Button>
                <Search placeholder="input search text" className="search-input"/>
            </div>
            <Table columns={columns} dataSource={studentList}/>
        </>
    )
}