import AppLayout from "../../../../components/layout/AppLayout";
import {useRouter} from "next/router";
import {PropsWithChildren, useEffect, useState} from "react";
import {GetStudentRequest} from "../../../../libs/Entity/request/GetStudentRequest";
import {studentAPI} from "../../../../libs/API/StudentAPI";
import {Avatar, Card, Col, Row, Table, Tabs, Tag} from 'antd';
import {TabPane} from "rc-tabs";

// @ts-ignore
async function fetchData(id, setStudent) {
    const getStudentRequest = new GetStudentRequest(id);
    const resp = await studentAPI.getStudent(getStudentRequest);
    setStudent(resp.data.data.student);
    console.log(resp.data.data.student)
}

//刷新的时候，服务器可以抓到id，从而进行数据抓取
export async function getServerSideProps(context) {
    // todo get student profile here;
    const { id } = context.params;

    return {
        props: { id },
    };
}

export default function StudentDetails(props:PropsWithChildren<any>) {
    const router = useRouter()
    const [studentData, setStudentData] = useState();
    const [courses, setCourses] = useState('tab1');

    useEffect(async () => {
        const {id} = await router.query;
        const getStudentRequest = await new GetStudentRequest(id);
        const resp = await studentAPI.getStudent(getStudentRequest);
        await setStudentData(resp.data.data);
        console.log(resp.data.data)
        console.log(resp.data.data.interest)
        await setCourses(resp.data.data.courses);
    }, []);

    const columns = [
        {
            title: 'No.',
            key: 'id',
            render: (text:any, row:any, index:number) => index + 1,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Type',
            key: 'type',
            render: (text:any, record:any) => (
                record.type?.map((item: { name: any; }) => item.name).join(',')
            ),
        },
        {
            title: 'Join Time',
            dataIndex: 'createdAt',
            key: 'createdAt',
        }
    ];

    return (
        <AppLayout>
            <Row>
                <Col span={8}>
                    <Card
                        title={<Avatar
                            src={studentData?.avatar}
                            style={{width: 100, height: 100, display: 'block', margin: 'auto'}}
                        />}
                    >
                        <Row>
                            <Col span={12} style={{textAlign: 'center'}}><b>Name</b><p>{studentData?.name}</p></Col>
                            <Col span={12} style={{textAlign: 'center'}}><b>Country</b><p>{studentData?.country}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12} style={{textAlign: 'center'}}><b>Email</b><p>{studentData?.email}</p></Col>
                            <Col span={12} style={{textAlign: 'center'}}><b>Phone</b><p>{studentData?.phone}</p></Col>
                        </Row>
                        <Row>
                            <Col span={24} style={{textAlign: 'center'}}><b>Address</b><p>{studentData?.address}</p>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col offset={1} span={15}>
                    <Card>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="About" key="1">
                                <div className="content">
                                    <h3>Information</h3>
                                    <Row gutter={[50, 16]}>
                                        <Col span={24}>
                                            <b>Birthday:</b>
                                            <span>{studentData?.birthday}</span>
                                        </Col>
                                        <Col span={24}>
                                            <b>Gender:</b>
                                            <span>{studentData?.gender}</span>
                                        </Col>
                                        <Col span={24}>
                                            <b>Create Time:</b>
                                            <span>{studentData?.createdAt}</span>
                                        </Col>
                                        <Col span={24}>
                                            <b>Update Time:</b>
                                            <span>{studentData?.updatedAt}</span>
                                        </Col>

                                    </Row>

                                </div>
                                <div className="content">
                                    <h3>Interesting</h3>
                                    <Row gutter={[6, 16]}>
                                        <Col span={24}>
                                            {studentData?.interest.map((item) => (
                                                <Tag color="magenta" key={item}>{item}</Tag>
                                            ))}
                                        </Col>
                                    </Row>
                                </div>
                                <div className="content">
                                    <h3>Description</h3>
                                    {studentData?.description}
                                </div>
                            </TabPane>
                            <TabPane tab="Courses" key="2">
                                <Table dataSource={courses} columns={columns}/>
                            </TabPane>
                        </Tabs>
                    </Card>
                </Col>
            </Row>
        </AppLayout>
    )
}