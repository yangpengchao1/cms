import AppLayout from "../../../../components/layout/AppLayout";
import {useEffect, useState} from "react";
import {BackTop, Button, Card, Col, Divider, List, Row, Skeleton} from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import {AxiosResponse} from "axios";
import {BaseResponse} from "../../../../libs/Entity/response/BaseResponse";
import {courseAPI} from "../../../../libs/API/CourseAPI";
import {GetCoursesRequest} from "../../../../libs/Entity/request/GetCoursesRequest";
import {Course} from "../../../../libs/Entity/Course";
import {GetCoursesResponse} from "../../../../libs/Entity/response/GetCoursesResponse";
import {HeartFilled, UserOutlined} from "@ant-design/icons";


export default function Courses() {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<Course[]>([]);
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(20);

    const loadMoreData = async () => {
        if (loading) {
            return;
        }
        setLoading(true);
        const getCoursesRequest = new GetCoursesRequest(page, limit);
        const resp: AxiosResponse<BaseResponse<GetCoursesResponse>> = await courseAPI.getCourseList(getCoursesRequest);
        console.log(resp.data.data.courses[0].cover);
        // @ts-ignore
        setData(resp.data.data.courses);
        // setData([...data, resp.data.data.courses]);
        setLoading(false);
    };

    useEffect(() => {
        (async () => {
            await loadMoreData();
        })();
    }, [page, limit]);

    return (<AppLayout>
        <div
            id="scrollableDiv"
            style={{
                height: 'auto',
                overflow: 'auto',
                padding: '0',
                border: '1px solid rgba(140, 140, 140, 0.35)',
            }}
        >
            <InfiniteScroll
                dataLength={data.length}
                next={loadMoreData}
                hasMore={data.length < 20}
                loader={<Skeleton avatar paragraph={{rows: 1}} active/>}
                endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                scrollableTarget="scrollableDiv"
            >
                <List
                    grid={{gutter: 16, column: 4}}
                    dataSource={data}
                    renderItem={item => (
                        <List.Item key={item.id} style={{margin: '8 6'}}>
                            <Card
                                style={{"height": "100%"}}
                                cover={<img style={{height: 260}}
                                            src={item.cover}
                                />}
                            >
                                <Row gutter={[6, 16]}>
                                    <h3>{item.name}</h3>
                                </Row>

                                <Row gutter={[16, 16]} style={{}}>
                                    <Col span={12}>{item.createdAt}</Col>
                                    <Col span={12}>
                                        <div style={{float: 'right'}}>
                                            <HeartFilled style={{marginRight: 5, fontSize: 16, color: 'red'}}/>
                                            {item.star}
                                        </div>
                                    </Col>

                                    <Col span={12}>Duration:</Col>
                                    <Col span={12}>
                                        <div style={{float: 'right'}}>
                                            <b>{item.duration} years</b>
                                        </div>
                                    </Col>

                                    <Col span={12}>Teacher:</Col>
                                    <Col span={12}>
                                        <div style={{float: 'right'}}>
                                            <a><b>{item.teacherName}</b></a>
                                        </div>
                                    </Col>

                                    <Col span={12}><UserOutlined
                                        style={{color: '#0086f9', fontSize: '16px', marginRight: '5px'}}/>Student Limit:</Col>
                                    <Col span={12}>
                                        <div style={{float: 'right'}}>
                                            <b>{item.maxStudents}</b>
                                        </div>
                                    </Col>
                                    <Col span={24}>
                                        <Button type="primary">Read More</Button>
                                    </Col>
                                </Row>
                            </Card>
                        </List.Item>

                    )}
                />
            </InfiniteScroll>
        </div>
        {/*<BackTop visibilityHeight={20}>*/}
        {/*    <div style={{*/}
        {/*        height: 40,*/}
        {/*        width: 40,*/}
        {/*        lineHeight: '40px',*/}
        {/*        borderRadius: 4,*/}
        {/*        backgroundColor: '#1088e9',*/}
        {/*        color: '#fff',*/}
        {/*        textAlign: 'center',*/}
        {/*        fontSize: 14,*/}
        {/*    }}>UP*/}
        {/*    </div>*/}
        {/*</BackTop>*/}

        {/*<div style={{ height: '600vh', padding: 8 }}>*/}
        {/*    <div>Scroll to bottom</div>*/}
        {/*    <div>Scroll to bottom</div>*/}
        {/*    <div>Scroll to bottom</div>*/}
        {/*    <div>Scroll to bottom</div>*/}
        {/*    <div>Scroll to bottom</div>*/}
        {/*    <div>Scroll to bottom</div>*/}
        {/*    <div>Scroll to bottom</div>*/}
        {/*    <BackTop>*/}
        {/*        <div style={{*/}
        {/*            height: 40,*/}
        {/*            width: 40,*/}
        {/*            lineHeight: '40px',*/}
        {/*            borderRadius: 4,*/}
        {/*            backgroundColor: '#1088e9',*/}
        {/*            color: '#fff',*/}
        {/*            textAlign: 'center',*/}
        {/*            fontSize: 14,*/}
        {/*        }}>UP*/}
        {/*        </div>*/}
        {/*    </BackTop>*/}
        {/*</div>*/}
    </AppLayout>)
}