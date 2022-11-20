import React from "react"
import { Button, Checkbox, Radio, Form, Input } from "antd"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { initializeApp } from "firebase/app"
import { getFirestore, doc, addDoc, setDoc } from "firebase/firestore"

export const Register = () => {
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
    const db = getFirestore(app)
    const auth = getAuth(app)

    const onFinish = (values) => {
        const { email, password, role } = values
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                // Signed in
                const user = userCredential.user
                await setDoc(doc(db, "userInfo", user.uid), {
                    role,
                })
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message

                console.error(error)
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
                label="First Name"
                name="firstname"
                rules={[
                    {
                        required: true,
                        message: "Please input your first name!",
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Last Name"
                name="lastname"
                rules={[
                    {
                        required: true,
                        message: "Please input your lastname!",
                    },
                ]}
            >
                <Input />
            </Form.Item>

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
                label="Confirm Password"
                name="confirmpassword"
                rules={[
                    {
                        required: true,
                        message: "Please confirm your password!",
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                label="Role"
                name="role"
                rules={[
                    {
                        required: true,
                        message: "Please input your role!",
                    },
                ]}
            >
                <Radio.Group>
                    <Radio value="patient">Patient</Radio>
                    <Radio value="doctor">Doctor</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Sign Up
                </Button>
            </Form.Item>
        </Form>
    )
}
export default Register
