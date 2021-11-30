import AppLayout from "../../../../components/layout/AppLayout";
import React, {useCallback, useEffect, useState} from "react";
import {BackTop, Button, Card, Col, Divider, List, Row, Skeleton} from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import {BaseResponse} from "../../../../libs/Entity/response/BaseResponse";
import {courseAPI} from "../../../../libs/API/CourseAPI";
import {GetCoursesRequest} from "../../../../libs/Entity/request/GetCoursesRequest";
import {Course} from "../../../../libs/Entity/Course";
import {GetCoursesResponse} from "../../../../libs/Entity/response/GetCoursesResponse";
import {HeartFilled, UserOutlined} from "@ant-design/icons";
import Link from "next/link";

export default function Courses() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<Course[]>([]);
    const [page, setPage] = useState<number>(1);
    const [total, setTotal] = useState<number>(0);
    const limit = 20;

    const loadMoreData = useCallback(async () => {
        if (loading) {
            return;
        }
        setLoading(true);
        const getCoursesRequest = new GetCoursesRequest(page, limit);
        const resp: BaseResponse<GetCoursesResponse> =
            await courseAPI.getCourseList(getCoursesRequest);
        // @ts-ignore
        setData([...data, ...resp.data?.courses]);
        // @ts-ignore
        setTotal(resp.data?.total);
        setLoading(false);
    }, [page]);

    useEffect(() => {
        (async () => {
            await loadMoreData();
        })();
    }, [loadMoreData]);

    return (
        <AppLayout>
            <div
                id="scrollableDiv"
                style={{
                    height: "100vh",
                    overflow: "auto",
                    padding: "0",
                    border: "1px solid rgba(140, 140, 140, 0.35)"
                }}
            >
                <InfiniteScroll
                    dataLength={data.length}
                    next={() => setPage(page + 1)}
                    hasMore={data.length < total}
                    loader={<Skeleton avatar paragraph={{rows: 1}} active/>}
                    endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                    scrollableTarget="scrollableDiv"
                >
                    <List
                        grid={{gutter: 16, column: 4}}
                        dataSource={data}
                        renderItem={(item) => (
                            <List.Item key={item.id} style={{margin: "8 6"}}>
                                <Card
                                    style={{height: "100%"}}
                                    cover={<img style={{height: 260}} src={item.cover}/>}
                                >
                                    <Row gutter={[6, 16]}>
                                        <h3>{item.name}</h3>
                                    </Row>

                                    <Row gutter={[16, 16]}>
                                        <Col span={24}>
                                            <Row className="content-line">
                                                <Col span={12}>{item.createdAt}</Col>
                                                <Col span={12}>
                                                    <div style={{float: "right"}}>
                                                        <HeartFilled
                                                            style={{marginRight: 5, fontSize: 16, color: "red"}}
                                                        />
                                                        {item.star}
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>

                                        <Col span={24}>
                                            <Row className="content-line">
                                                <Col span={12}>Duration:</Col>
                                                <Col span={12}>
                                                    <div style={{float: "right"}}>
                                                        <b>{item.duration} years</b>
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
                                                            <b>{item.teacherName}</b>
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
                                                <b>{item.maxStudents}</b>
                                            </div>
                                        </Col>
                                        <Col span={24}>
                                            <Button type="primary"><Link href={`/dashboard/manager/courses/${item.id}`}>Read More</Link></Button>
                                        </Col>
                                    </Row>
                                </Card>
                            </List.Item>
                        )}
                    />
                </InfiniteScroll>

                <BackTop
                    visibilityHeight={100}
                    target={() => document.getElementById("scrollableDiv")}>
                    <div
                        style={{
                            height: 40,
                            width: 40,
                            lineHeight: "40px",
                            borderRadius: 4,
                            backgroundColor: "#1088e9",
                            color: "#fff",
                            textAlign: "center",
                            fontSize: 14,
                        }}
                    >
                        UP
                    </div>
                    {/*<div>UP</div>*/}
                </BackTop>
            </div>
        </AppLayout>
    );
}
