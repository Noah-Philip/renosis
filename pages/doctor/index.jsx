import { Layout } from "antd"

export default function Doctor() {
    return <Layout></Layout>
}

export async function getStaticProps(context) {
    return {
        props: {
            protected: true,
            userTypes: ["doctor"],
        },
    }
}
