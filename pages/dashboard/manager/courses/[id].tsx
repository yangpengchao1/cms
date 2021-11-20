import {Card, Col, Collapse, Row, Steps, Table, Tag} from "antd";
import AppLayout from "../../../../components/layout/AppLayout";
import React, {PropsWithChildren, useEffect, useState} from "react";
import {AxiosResponse} from "axios";
import {BaseResponse} from "../../../../libs/Entity/response/BaseResponse";
import {useRouter} from "next/router";
import {Course} from "../../../../libs/Entity/Course";
import {courseAPI} from "../../../../libs/API/CourseAPI";
import {GetCourseDetailRequest} from "../../../../libs/Entity/request/GetCourseDetailRequest";
import {HeartFilled, UserOutlined} from "@ant-design/icons";
import {Panel} from "rc-collapse";
// @ts-ignore
import {v4} from "uuid";
import {Column} from "rc-table";

const { Step } = Steps;

//刷新的时候，服务器可以抓到id，从而进行数据抓取
export async function getServerSideProps(context: { params: { id: any; }; }) {
    // todo get student profile here;
    const {id} = context.params;
    return {
        props: {id},
    };
}


export default function CourseDetail(props: PropsWithChildren<any>) {
    const router = useRouter();
    const [courseData, setCourseData] = useState<Course>();
    const [classTimeMap, setClassTimeMap] = useState<Map<string,string>>();
    // let classTimeMap = new Map();

    useEffect(() => {
        (async () => {
            const {id} = router.query;
            const getCourseDetailRequest = new GetCourseDetailRequest(id as unknown as number);
            const resp: AxiosResponse<BaseResponse<Course>> = await courseAPI.getCourseDetail(getCourseDetailRequest);
            setCourseData(resp.data.data);
            setClassTimeData(resp.data.data?.schedule.classTime);
        })();
    }, []);

    function setClassTimeData(classTime: string[]) {
        let mapData=new Map();
        classTime.forEach((item,index) => {
            const content = item.split(" ");
            mapData.set(content[0],content[1])
        })
        setClassTimeMap(mapData);
    }

    const data = [
        {

        }
    ];

    return (
        <AppLayout>
            <Row>
                <Col span={8}>
                    <Card className="card-class"
                        cover={<img style={{height: 260}} alt="example" src={courseData?.cover}/>}
                    >
                        <div className="course-details-class">
                            <h1>{courseData?.name}</h1>
                            <Row gutter={[16, 16]}>
                            <Col span={24}>
                                <Row className="content-line">
                                    <Col span={12}>{courseData?.createdAt}</Col>
                                    <Col span={12}>
                                        <div style={{float: "right"}}>
                                            <HeartFilled
                                                style={{marginRight: 5, fontSize: 16, color: "red"}}
                                            />
                                            {courseData?.star}
                                        </div>
                                    </Col>
                                </Row>
                            </Col>

                            <Col span={24}>
                                <Row className="content-line">
                                    <Col span={12}>Duration:</Col>
                                    <Col span={12}>
                                        <div style={{float: "right"}}>
                                            <b>{courseData?.duration} years</b>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>

                            <Col span={24}>
                                <Row className="content-line">
                                    <Col span={12}>Teacher:</Col>
                                    <Col span={12}>
                                        <div style={{float: "right"}}>
                                            <a>
                                                <b>{courseData?.teacherName}</b>
                                            </a>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>

                            <Col span={12}>
                                <UserOutlined
                                    style={{
                                        color: "#0086f9",
                                        fontSize: "16px",
                                        marginRight: "5px",
                                    }}
                                />
                                Student Limit:
                            </Col>
                            <Col span={12}>
                                <div style={{float: "right"}}>
                                    <b>{courseData?.maxStudents}</b>
                                </div>
                            </Col>
                        </Row>
                        </div>
                        <Row className="sales-class">
                            <Col span={6} className="col-class"><b>{courseData?.sales.price}</b><p>Price</p></Col>
                            <Col span={6} className="col-class"><b>{courseData?.sales.batches}</b><p>Batches</p></Col>
                            <Col span={6} className="col-class"><b>{courseData?.sales.studentAmount}</b><p>Students</p></Col>
                            <Col span={6} className="col-class"><b>{courseData?.sales.earnings}</b><p>Earings</p></Col>
                        </Row>
                    </Card>
                </Col>
                <Col offset={1} span={15}>
                    <Card className="course-details-class">
                        <h2 className="title-style">Course Detail</h2>
                        <h1>Create Time</h1>
                        <p>{courseData?.createdAt}</p>
                        <h1>Start Time</h1>
                        <p>{courseData?.startTime}</p>
                        <h1>Status</h1>
                        <Steps size="small" current={-1} style={{ width: 'auto',marginBottom: 20}}>
                        {courseData?.schedule.chapters.map((item) => (
                            <Step title={item.name}  />
                            ))}
                        </Steps>
                        <h1>Course Code</h1>
                        <p>{courseData?.uid}</p>
                        <h1>Class Time</h1>
                        <Table dataSource={data} pagination={false}>
                            <Column title="Sunday" key="Sunday" render={() => classTimeMap?.get("Sunday")}/>
                            <Column title="Monday" key="Monday" render={() => classTimeMap?.get("Monday")}/>
                            <Column title="Tuesday" key="Tuesday" render={() => classTimeMap?.get("Tuesday")}/>
                            <Column title="Wednesday" key="Wednesday" render={() => classTimeMap?.get("Wednesday")}/>
                            <Column title="Thursday" key="Thursday" render={() => classTimeMap?.get("Thursday")}/>
                            <Column title="Friday" key="Friday" render={() => classTimeMap?.get("Friday")}/>
                            <Column title="Saturday" key="Saturday" render={() => classTimeMap?.get("Saturday")}/>
                        </Table>
                        <h1>Category</h1>
                        <p>{courseData?.type.map((item) => (
                            <Tag color="magenta" key={item.id}>{item.name}</Tag>
                        ))}</p>
                        <h1>Description</h1>
                        <p>{courseData?.detail}</p>
                        <h1>Chapter</h1>
                        <section>
                            {courseData?.schedule.chapters.map((item) => (
                                <Collapse key={v4()} accordion>
                                    <Panel header={item.name} key={item.id}>
                                        <p>{item.content}</p>
                                    </Panel>
                                </Collapse>
                            ))}
                        </section>
                    </Card>
                </Col>
            </Row>
        </AppLayout>
    )
}