import React, {useState} from "react";
import {Button, Checkbox, Form, Input, message, Radio, RadioChangeEvent,} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {useRouter} from "next/router";
import {authAPI} from "../libs/API/AuthAPI";
import {LoginRequest} from "../libs/Entity/request/LoginRequest";

export default function Login() {
    const [role, setRole] = useState("student");

    const router = useRouter();
    const onChange = (e: RadioChangeEvent) => {
        setRole(e.target.value);
    };

    const login = async (values: any) => {
        const {email, password, role} = values;

        let loginRequest = new LoginRequest(email, password, role);
        const resp = await authAPI.login(loginRequest);
        const {code, data} = resp.data;
        if (code === 201) {
            //存储信息
            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data.userId);
            localStorage.setItem("role", data.role);
            //跳转页面
            await router.push("/dashboard");
        } else {
            message.error("用户名或密码错误");
        }
    };

    return (
        <div className="App">
            <h1 className="title">Course Management Assistant</h1>
            <div className="login-form">
                <Form onFinish={login}>
                    <Form.Item name="role" initialValue={role}>
                        <Radio.Group onChange={onChange} value={role}>
                            <Radio.Button value="student">Student</Radio.Button>
                            <Radio.Button value="teacher">Teacher</Radio.Button>
                            <Radio.Button value="manager">Manager</Radio.Button>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                pattern: new RegExp(
                                    /^[A-Za-z0-9\u4e00-\u9fa5.]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
                                ),
                                type: "email",
                                message: "'email' is not a valid email",
                            },
                        ]}
                    >
                        <Input placeholder="Please input email" prefix={<UserOutlined/>}/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                pattern: new RegExp(/^\w{4,16}$/),
                                message: "'password' is not valid",
                            },
                        ]}
                    >
                        <Input.Password
                            placeholder="Please input password"
                            prefix={<LockOutlined/>}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Checkbox checked={true}>Remember me</Checkbox>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" block htmlType="submit">
                            Sign in
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}
