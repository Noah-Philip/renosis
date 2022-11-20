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
    if (!uid) return ""
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
    let q
    if (field != "running")
        q = query(collection(db, "appointments"), where(field, "==", user))
    else q = query(collection(db, "appointments"))
    const querySnapshot = await getDocs(q)
    return Array.from(querySnapshot.docs).map((doc) => doc.data())
}

export const getAppointmentsBy = async (uid) => {
    if (!uid) return []
    return await getAppointments("uid", uid)
}

export const getAppointmentsFor = async (uid) => {
    if (!uid) return []
    // return await getAppointments("submission.uid", uid)
    return await getAppointments("running", uid)
}

export const getAllSubmissions = async () => {
    const app = initializeApp(firebaseConfig)
    const db = getFirestore(app)
    const q = query(collection(db, "submissions"))
    const querySnapshot = await getDocs(q)
    return Array.from(querySnapshot.docs).map((doc) => doc.data())
}

export const getSubmissions = async (user) => {
    if (!user) return {}
    const app = initializeApp(firebaseConfig)
    const db = getFirestore(app)
    const q = query(collection(db, "submissions"), where("uid", "==", user.uid))
    const querySnapshot = await getDocs(q)
    return Array.from(querySnapshot.docs)
}
