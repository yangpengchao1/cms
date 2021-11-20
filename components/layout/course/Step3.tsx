import React, {PropsWithChildren} from "react";
import {Button, Result} from "antd";

export default function Step3(props: PropsWithChildren<any>) {

    const {current,setCurrent} = props;

    return (
        <Result
            status="success"
            title="Successfully Create Course!"
            extra={[
                <Button type="primary" key="goCourse">
                    Go Course
                </Button>,
                <Button key="createAgain">Create Again</Button>,
            ]}
        />
           )
}