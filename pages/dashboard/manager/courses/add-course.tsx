import React, {useState} from "react";
import AppLayout from "../../../../components/layout/AppLayout";
import {Button, Steps} from "antd";
import Step1 from "../../../../components/layout/course/Step1";
import Step2 from "../../../../components/layout/course/Step2";
import Step3 from "../../../../components/layout/course/Step3";

const {Step} = Steps;

export default function AddCourse() {

    const [current, setCurrent] = useState<number>(0);

    const steps = [
        {
            title: 'First',
            content: <Step1 current={current} setCurrent={setCurrent}/>,
        },
        {
            title: 'Second',
            content: <Step2 current={current} setCurrent={setCurrent}/>,
        },
        {
            title: 'Last',
            content: <Step3 current={current} setCurrent={setCurrent}/>,
        },
    ];

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    return (<AppLayout>
        <div className="add-course-frame">
            <Steps
                type="navigation"
                current={current}
                className="site-navigation-steps"
                style={{marginBottom: 20}}
            >
                <Step
                    title="Course Detail"
                />
                <Step
                    title="Course Schedule"
                />
                <Step
                    title="Success"
                />
            </Steps >

            <div className="steps-content">{steps[current].content}</div>
            <div className="steps-action">
                {/*{current === 0 && (*/}
                {/*    <Button type="primary" onClick={() => next()}>*/}
                {/*        Create Course*/}
                {/*    </Button>*/}
                {/*)}*/}
                {current === 1 && (
                    <Button type="primary" onClick={() => next()}>
                        Submit
                    </Button>
                )}

                {current > 0 && (
                    <Button style={{margin: '0 8px'}} onClick={() => prev()}>
                        **************************Previous
                    </Button>
                )}
            </div>


        </div>
    </AppLayout>)
}