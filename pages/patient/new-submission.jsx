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
            <div>
                <TextArea
                    rows={4}
                    onChange={(event) => setText(event.target.value)}
                />
                <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                        Click or drag file to this area to upload
                    </p>
                    <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibit
                        from uploading company data or other band files
                    </p>
                </Dragger>
                <div>
                    <DatePicker
                        onChange={(date, dateString) => {
                            setDate(dateString)
                        }}
                    />
                    <TimePicker
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
