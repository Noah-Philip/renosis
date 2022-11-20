import React from "react"
import { Button, Checkbox, Form, Input } from "antd"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { initializeApp } from "firebase/app"

export const Login = () => {
    const firebaseConfig = {
        apiKey: "AIzaSyAmybJajxHLbegb7CQ7MR8_xyiI-Tg4nW4",
        authDomain: "renosis-d11c9.firebaseapp.com",
        projectId: "renosis-d11c9",
        storageBucket: "renosis-d11c9.appspot.com",
        messagingSenderId: "296561334307",
        appId: "1:296561334307:web:e7409947692b3753e6f996",
        measurementId: "G-2C4DKW13W1",
    }

    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app)

    const onFinish = (values) => {
        const { email, password } = values
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user
                console.log(user)
                // ...
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                console.log(error)
            })
    }

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo)
    }

    return (
        <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 6,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Email"
                name="email"
                rules={[
                    {
                        required: true,
                        message: "Please input your email!",
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: "Please input your password!",
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Login
                </Button>
            </Form.Item>
        </Form>
    )
}
export default Login
