import { Layout } from "../../components/Layout"
import { Card } from "antd"
import { Badge, Modal, Tag, Calendar, Button } from "antd"
import Link from "next/link"
import { useState, useEffect } from "react"
import { getNextApt } from "../../lib/utils"

const getListData = (value) => {
    let listData
    switch (value.date()) {
        case 8:
            listData = [
                {
                    content: "Examination",
                    time: "5:30",
                    link: "lmao",
                },
            ]
            break
        case 10:
            listData = [
                {
                    content: "Jaw Checkup",
                    time: "2:00",
                    link: "lmao2",
                },
                {
                    content: "Examination",
                    time: "5:30",
                    link: "lmao",
                },
            ]
            break
        default:
    }
    return listData || []
}

const PatientCalendar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [events, setEvents] = useState([])

    const dateCellRender = (value) => {
        const listData = getListData(value)
        return (
            <ul
                className="events p-0 flex flex-col gap-1"
                onClick={() => {
                    setEvents(listData)
                    setIsModalOpen(true)
                }}
            >
                {listData.map((item) => (
                    <li key={item.content} className="">
                        <Tag color="blue">{item.content}</Tag>
                    </li>
                ))}
            </ul>
        )
    }
    return (
        <>
            <Calendar dateCellRender={dateCellRender} className="rounded" />
            <Modal
                title="Appointments"
                open={isModalOpen}
                onOk={() => setIsModalOpen(false)}
                onCancel={() => setIsModalOpen(false)}
            >
                <ul className="flex flex-col gap-2">
                    {events.map((item) => (
                        <li key={item.content}>
                            <p className="mb-2">
                                {item.content} at {item.time}
                            </p>
                            <Link href={item.link}>
                                <Button type="primary">Join Now</Button>
                            </Link>
                        </li>
                    ))}
                </ul>
            </Modal>
        </>
    )
}

export default function Patient() {
    const [nextApt, setNextApt] = useState({})
    useEffect(() => {
        ;(async () => {
            const apt = await getNextApt()
            setNextApt(apt)
        })()
    })
    return (
        <Layout>
            {nextApt ? (
                <div className="p-4">
                    <Card
                        style={{
                            width: "100%",
                            textAlign: "center",
                            background: "#dcf1fa",
                        }}
                    >
                        <h1>Next appointment on {nextApt.date} at {nextApt.time}</h1>
                        <Link href="">
                            <Button type="primary">Join Now</Button>
                        </Link>
                    </Card>
                </div>
            ) : (
                <></>
            )}
            <div className="flex gap-2 my-5 m-auto justify-center">
                <Link href="/patient/new-submission">
                    <Card
                        style={{ width: 200, textAlign: "center" }}
                        className="hover:opacity-80 hover:shadow transition-all"
                    >
                        <h3>New Submission</h3>
                    </Card>
                </Link>
                <Link href="/patient/med-history">
                    <Card
                        style={{ width: 200, textAlign: "center" }}
                        className="hover:opacity-80 hover:shadow transition-all"
                    >
                        <h3>View History</h3>
                    </Card>
                </Link>
            </div>
            <div className="my-10 max-w-7xl m-auto">
                <PatientCalendar />
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
