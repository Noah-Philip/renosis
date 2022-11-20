import { Layout } from "../components/Layout"

export default function Home() {
    return (
        <Layout>
            <section>
                <img 
                    src="/images/landingbg.png" 
                    alt="background" 
                    width="100%"
                />
                <img 
                src="/images/Renosis_Logo.png" 
                alt="Logo" />
                <h1>A better remote medical diagnosis platform​.</h1>
                <h2>For Patients:</h2>
                <ul>Connect to a medical professional no matter where you are.</ul>
                <ul>Easily access your electronic medical record (EMR).</ul>
                <h2>For Doctors:</h2>
                <ul>Guarantees the safety of you and your patient while providing authentic and accurate treatments.</ul>
                <ul>A way to have a flexible schedule.</ul>
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
