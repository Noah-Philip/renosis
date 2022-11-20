import { Layout } from "../components/Layout"

export default function Home() {
    return (
        <Layout>
            <section>
                <h1>Introducing Renosis</h1>
                <p>A brand new way to digitalize healthcare functions</p>
            </section>
        </Layout>
    )
}

export async function getStaticProps(context) {
    return {
        props: {
            protected: true,
            userTypes: [],
        },
    }
}
