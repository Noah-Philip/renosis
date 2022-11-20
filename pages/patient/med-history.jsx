import React, { useState } from "react"
import { Space, Button, Table, Modal, Tag } from "antd"
import { Layout } from "../../components/Layout"

const data = [
    {
        title: "Teeth Checkup",
        date: "12/11/2023",
        doctor: "Dr. Raj",
        notes: "Ok so looks like he is experiencing some mild difficulty with chewing...",
    },
]

const MedHistory = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currText, setCurrText] = useState("")

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
    ]
    return (
        <Layout>
            <div className="m-16">
                <h1>Medical History</h1>
                <Table columns={columns} dataSource={data} />;
            </div>
            <Modal
                title="Basic Modal"
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
