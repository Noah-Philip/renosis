import { FirebaseAuthProvider } from "../lib/auth-context"
import React from "react"
import "../styles/globals.css"
import 'antd/dist/reset.css';
/* import Router from "next/router"
import { initializeApp } from "firebase/app"
import { firebaseConfig } from "../lib/config"
import { getAuth } from "firebase/auth"
import { useEffect } from "react"
import { getUserRole } from "../lib/utils" */

function MyApp({ Component, pageProps }) {
    /* const app = initializeApp(firebaseConfig)
    const auth = getAuth(app)
    const [user, setUser] = React.useState(null)

    React.useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(setUser)
        return unsubscribe
    }, []) */

    /* useEffect(() => {
        ;(async () => {
            const role = await getUserRole(user)
            if (
                pageProps.protected &&
                (!user || !pageProps.userTypes.includes(role))
            ) {
                if (user) {
                    Router.push(`/${role}`)
                } else {
                    Router.push("/")
                }
            }
        })()
    }, [user])
 */
    return (
        <FirebaseAuthProvider>
            <Component {...pageProps} />
        </FirebaseAuthProvider>
    )
}

export default MyApp
