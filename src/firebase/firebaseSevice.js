import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore"
import { db } from "./firebaseConfig"

// get all data
export const getData = async (col) => {
    try {
        const querySnapshot = await getDocs(collection(db, col))
        let temp = []
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            temp.push({ id: doc.id, ...doc.data() })
        })
        return temp
    } catch (error) {
        // Handle error
        console.error('Error fetching data:', error)
    }
}

// get all data
export const getSingleData = async (col, id) => {
    try {
        const docRef = doc(db, col, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return docSnap.data()
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
    } catch (error) {
        // Handle error
        console.error('Error fetching data:', error)
    }
}

// add data
export const addData = async (col, data) => {
    try {
        const docRef = await addDoc(collection(db, col), data)
    } catch (error) {
        console.log(error)
    }
}

// update data
export const updateData = async (col, data, id) => {
    try {
        const docRef = doc(db, col, id);
        await updateDoc(docRef, data);
    } catch (error) {
        console.log(error)
    }
}

// delete data
export const deleteData = async (col, id) => {
    try {
        deleteDoc(doc(db, col, id))
    } catch (error) {
        console.log(error)
    }
}