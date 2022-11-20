import React, { useEffect, useState } from "react"
import { Space, Button, Table, Modal, Tag } from "antd"
import { Layout } from "../../components/Layout"
import { getAppointmentsFor, getSubmissions } from "../../lib/utils"
import { useFirebaseAuth } from "../../lib/auth-context"

const MedHistory = () => {
    const user = useFirebaseAuth()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currText, setCurrText] = useState("")
    const [data, setData] = useState([])

    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleOk = () => {
        setIsModalOpen(false)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const columns = [
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Doctor",
            dataIndex: "doctor",
            key: "doctor",
        },
        {
            title: "Notes",
            key: "view",
            render: (_, record) => (
                <Button
                    onClick={() => {
                        setCurrText(record.notes)
                        showModal()
                    }}
                >
                    View
                </Button>
            ),
        },
        {
            title: "Video Link",
            dataIndex: "video",
            key: "video",
            render: (_, record) => <a href={record.video}>{record.video}</a>,
        },
    ]

    useEffect(() => {
        ; (async () => {
            setData(
                (await getAppointmentsFor(user)).map(
                    ({ title, date, uid, submission, vid }) => ({
                        title,
                        date,
                        description: submission.text,
                        video: vid,
                        doctor: getFullName(uid),
                    })
                )
            )
        })()
    })

    return (
        <Layout>
            <div className="m-16">
                <h1>Medical History</h1>
                <Table columns={columns} dataSource={data} />
            </div>
            <Modal
                title="Doctor Notes"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>{currText}</p>
            </Modal>
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

export default MedHistory
