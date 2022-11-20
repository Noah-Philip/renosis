import { useState, useEffect } from "react"
import { Layout } from "../../components/Layout"
import {
    Table,
    Button,
    Modal,
    Tag,
    Calendar,
    DatePicker,
    TimePicker,
    Input,
} from "antd"
import Link from "next/link"
import { v4 as uuidv4 } from "uuid"
import { useFirebaseAuth } from "../../lib/auth-context"
import { getFirestore, doc, setDoc } from "firebase/firestore"
import { firebaseConfig } from "../../lib/config"
import { initializeApp } from "firebase/app"
import {
    getAllSubmissions,
    getAppointmentsBy,
    getFullName,
    getFullNameById,
} from "../../lib/utils"

const getListData = (value) => {
    let listData
    switch (value.date()) {
        case 20:
            listData = [
                {
                    content: "Coughing examination",
                    time: "6:30",
                    link: "link",
                },
                {
                    content: "General medical checkup for nausea",
                    time: "6:30",
                    link: "link",
                },
            ]
            break
        default:
    }
    return listData || []
}

const DoctorCalendar = () => {
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

export default function Doctor() {
    const user = useFirebaseAuth()
    const app = initializeApp(firebaseConfig)
    const db = getFirestore(app)
    const [isDescModalOpen, setIsDescModalOpen] = useState(false)
    const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false)
    const [currRecord, setCurrRecord] = useState({})
    const [currText, setCurrText] = useState("")
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [subData, setSubData] = useState([])
    const [meetingData, setMeetingData] = useState([])
    const [meetingLink, setMeetingLink] = useState("")

    const meetingColumns = [
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Patient",
            dataIndex: "patient",
            key: "patient",
        },
        {
            title: "Meeting Link",
            dataIndex: "meetingLink",
            key: "meetingLink",
            render: (_, record) => (
                <a href={record.meetingLink}>{record.meetingLink}</a>
            ),
        },
    ]

    const subColumns = [
        // {
        //     title: "Title",
        //     dataIndex: "title",
        //     key: "title",
        // },
        {
            title: "Patient",
            dataIndex: "patient",
            key: "patient",
        },
        {
            title: "Preferred Date",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Preferred Time",
            dataIndex: "time",
            key: "time",
        },
        {
            title: "Video Link",
            dataIndex: "video",
            key: "video",
            render: (_, record) => <a href={record.video}>{record.video}</a>,
        },
        {
            title: "Description",
            key: "view",
            render: (_, record) => (
                <Button
                    onClick={() => {
                        setCurrText(record.description)
                        setIsDescModalOpen(true)
                    }}
                >
                    View
                </Button>
            ),
        },
        {
            title: "Appointment",
            key: "schedule",
            render: (_, record) => (
                <Button
                    onClick={() => {
                        setCurrRecord(record)
                        setIsScheduleModalOpen(true)
                    }}
                >
                    Schedule
                </Button>
            ),
        },
    ]

    useEffect(() => {
        ;(async () => {
            const subs = (await getAllSubmissions())
                .filter((value) => JSON.stringify(value) !== "{}")
                .map(async ({ date, text, time, uid, vid }) => ({
                    patient: await getFullNameById(uid),
                    date,
                    time,
                    description: text,
                    video: vid.url,
                }))
            setSubData(await Promise.all(subs))

            if (user) {
                const meetings = (await getAppointmentsBy(user.uid))
                    .filter((value) => JSON.stringify(value) !== "{}")
                    .map(
                        async ({
                            date,
                            meetingLink,
                            submission,
                            ...others
                        }) => ({
                            date,
                            patient: submission.patient,
                            meetingLink,
                            ...others,
                        })
                    )
                setMeetingData(await Promise.all(meetings))
            }
        })()
    }, [user])

    return (
        <Layout>
            <div className="m-16">
                <h1>Upcoming Appointments</h1>
                <Table columns={meetingColumns} dataSource={meetingData} />
            </div>
            <div className="mx-16 my-6">
                <h1>Current Submissions</h1>
                <Table columns={subColumns} dataSource={subData} />
            </div>
            <div className="my-10 mt-16 max-w-7xl m-auto">
                <h1>Calendar</h1>
                <DoctorCalendar />
            </div>
            <Modal
                title="Description"
                open={isDescModalOpen}
                onOk={() => setIsDescModalOpen(false)}
                onCancel={() => setIsDescModalOpen(false)}
            >
                <p>{currText}</p>
            </Modal>
            <Modal
                title="Schedule Appointment"
                open={isScheduleModalOpen}
                onOk={async () => {
                    // submit
                    const id = uuidv4()
                    const obj = {
                        id,
                        uid: user.uid,
                        submission: currRecord,
                        date,
                        time,
                        meetingLink,
                    }
                    await setDoc(doc(db, "appointments", id), obj)
                    setIsScheduleModalOpen(false)
                }}
                onCancel={() => setIsScheduleModalOpen(false)}
            >
                <Input
                    placeholder="Google Meets link"
                    className="mb-4"
                    onChange={(txt) => setMeetingLink(txt.target.value)}
                />
                <div className="flex gap-2 mb-4">
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
            </Modal>
        </Layout>
    )
}

export async function getStaticProps(context) {
    return {
        props: {
            protected: true,
            userTypes: ["doctor"],
        },
    }
}
