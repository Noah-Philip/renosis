import { initializeApp } from "firebase/app"
import {
    getFirestore,
    doc,
    getDoc,
    getDocs,
    query,
    collection,
    where,
} from "firebase/firestore"
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

export const getFullName = async (user) => {
    if (!user) return ""
    const app = initializeApp(firebaseConfig)
    const db = getFirestore(app)
    const docSnap = await getDoc(doc(db, "userInfo", user.uid))

    if (docSnap.exists()) {
        return `${docSnap.data().firstname} ${docSnap.data().lastname}`
    } else {
        return ""
    }
}

export const getFullNameById = async (uid) => {
    const app = initializeApp(firebaseConfig)
    const db = getFirestore(app)
    const docSnap = await getDoc(doc(db, "userInfo", uid))

    if (docSnap.exists()) {
        return `${docSnap.data().firstname} ${docSnap.data().lastname}`
    } else {
        return ""
    }
}

export const getAppointments = async (field, user) => {
    if (!user) return {}
    const app = initializeApp(firebaseConfig)
    const db = getFirestore(app)
    const q = query(
        collection(db, "appointments"),
        where(field, "==", user.uid)
    )
    const querySnapshot = await getDocs(q)
    return Array.from(querySnapshot)
}

export const getAppointmentsBy = async (user) => {
    return await getAppointments("uid", user)
}

export const getAppointmentsFor = async (user) => {
    return await getAppointments("submission.uid", user)
}

export const getAllSubmissions = async (user) => {
    if (!user) return {}
    const app = initializeApp(firebaseConfig)
    const db = getFirestore(app)
    const q = query(collection(db, "submissions"))
    const querySnapshot = await getDocs(q)
    return Array.from(querySnapshot)
}

export const getSubmissions = async (user) => {
    if (!user) return {}
    const app = initializeApp(firebaseConfig)
    const db = getFirestore(app)
    const q = query(collection(db, "submissions"), where("uid", "==", user.uid))
    const querySnapshot = await getDocs(q)
    return Array.from(querySnapshot)
}
