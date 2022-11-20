import { initializeApp } from "firebase/app"
import { getFirestore, doc, getDoc } from "firebase/firestore"
import { firebaseConfig } from "./config"

export const getUserRole = async (user) => {
    if (!user) return ""
    const app = initializeApp(firebaseConfig)
    const db = getFirestore(app)
    const docSnap = await getDoc(doc(db, "userInfo", user.uid))

    if (docSnap.exists()) {
        return docSnap.data().role
    } else {
        return ""
    }
}
