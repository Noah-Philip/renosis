import { Layout } from "../../components/Layout"
import { Card } from "antd"
import { Badge, Calendar } from "antd"
import Link from "next/link"

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
const PatientCalendar = () => {
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
        />
    )
}

export default function Patient() {
    return (
        <Layout>
            <div>
                <Link href="/patient/new-submission">
                    <Card style={{ width: 200, textAlign: "center" }}>
                        <h3>New Submission</h3>
                    </Card>
                </Link>
                <Link href="/patient/med-history">
                    <Card style={{ width: 200, textAlign: "center" }}>
                        <h3>View History</h3>
                    </Card>
                </Link>
            </div>
            <div>
                <Card style={{ width: "100%", textAlign: "center" }}>
                    <h1>Next appointment on 12/11/2023</h1>
                </Card>
            </div>
            <PatientCalendar />
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
