import { Layout } from "../../components/Layout"
import { InboxOutlined } from "@ant-design/icons"
import { message, Upload, DatePicker, TimePicker, Button } from "antd"
import { useState } from "react"
import { Input } from "antd"

const { TextArea } = Input
const { Dragger } = Upload

export default function NewSubmission() {
    const [vid, setVid] = useState(null)
    const [text, setText] = useState("")
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")

    const props = {
        name: "file",
        multiple: true,
        accept: "video/*",
        onChange(info) {
            const { status } = info.file
            if (status !== "uploading") {
                console.log(info.file, info.fileList)
            }
            if (status === "done") {
                message.success(`${info.file.name} file uploaded successfully.`)
            } else if (status === "error") {
                message.error(`${info.file.name} file upload failed.`)
            }
        },
        beforeUpload(file) {
            setVid(file)
        },
        onDrop(e) {
            console.log("Dropped files", e.dataTransfer.files)
        },
    }
    return (
        <Layout>
            <div className="container m-auto w-3/5 mt-12">
                <h1>New Submission</h1>
                <TextArea
                    rows={4}
                    placeholder="Enter a short description of your video and symptoms here"
                    onChange={(event) => setText(event.target.value)}
                    className="mb-4"
                />
                <div className="mb-4">
                    <Dragger {...props}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">
                            Click or drag file to this area to upload
                        </p>
                        <p className="ant-upload-hint">
                            Upload a valid video file with a thorough
                            description of your symptoms, conditions, etc.
                        </p>
                    </Dragger>
                </div>
                <div className="flex gap-2 mb-4">
                    <DatePicker
                        placeholder="Preferred Date"
                        onChange={(date, dateString) => {
                            setDate(dateString)
                        }}
                    />
                    <TimePicker
                        placeholder="Preferred Time"
                        onChange={(time, timeString) => {
                            setTime(timeString)
                        }}
                    />
                </div>
                <Button
                    type="primary"
                    onClick={() => {
                        // submit here
                        console.log(vid, text, date, time)
                    }}
                >
                    Submit
                </Button>
            </div>
        </Layout>
    )
}

export async function getStaticProps(context) {
    return {
        props: {
            protected: true,
            userTypes: ["patient"],
        },
    }
}
