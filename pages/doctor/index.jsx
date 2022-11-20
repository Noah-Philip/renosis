import { useState } from "react"
import { Layout } from "../../components/Layout"
import {
    Table,
    Button,
    Modal,
    Calendar,
    Badge,
    DatePicker,
    TimePicker,
} from "antd"

const getListData = (value) => {
    let listData
    switch (value.date()) {
        case 8:
            listData = [
                {
                    type: "success",
                    content: "Examination",
                },
            ]
            break
        case 10:
            listData = [
                {
                    type: "success",
                    content: "Teeth cleaning",
                },
            ]
            break
        default:
    }
    return listData || []
}

const getMonthData = (value) => {
    if (value.month() === 8) {
        return 1394
    }
}
const DoctorCalendar = () => {
    const monthCellRender = (value) => {
        const num = getMonthData(value)
        return num ? (
            <div className="notes-month">
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null
    }
    const dateCellRender = (value) => {
        const listData = getListData(value)
        return (
            <ul className="events">
                {listData.map((item) => (
                    <li key={item.content}>
                        <Badge status={item.type} text={item.content} />
                    </li>
                ))}
            </ul>
        )
    }
    return (
        <Calendar
            dateCellRender={dateCellRender}
            monthCellRender={monthCellRender}
            className="rounded"
        />
    )
}

export default function Doctor() {
    const [isDescModalOpen, setIsDescModalOpen] = useState(false)
    const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false)
    const [currRecord, setCurrRecord] = useState({})
    const [currText, setCurrText] = useState("")
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")

    const meetingColumns = [
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

    const meetingData = [
        {
            title: "Teeth Checkup",
            date: "12/11/2023",
            patient: "Raj",
            meetingLink: "https://meeting.link.com/13409",
        },
    ]

    const subColumns = [
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
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

    const subData = [
        {
            title: "Cholestrol Checkup",
            patient: "Sid",
            date: "12/11/2023",
            time: "5:00 PM",
            video: "https://video.link/13ha29e",
            description: "Slight vomiting sensation...",
        },
    ]

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
                title="Basic Modal"
                open={isDescModalOpen}
                onOk={() => setIsDescModalOpen(false)}
                onCancel={() => setIsDescModalOpen(false)}
            >
                <p>{currText}</p>
            </Modal>
            <Modal
                title="Basic Modal"
                open={isScheduleModalOpen}
                onOk={() => {
                    // submit
                    setIsScheduleModalOpen(false)
                }}
                onCancel={() => setIsScheduleModalOpen(false)}
            >
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
