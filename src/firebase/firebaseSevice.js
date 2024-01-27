import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc } from "firebase/firestore"
import { db } from "./firebaseConfig"
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"

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

// get single data
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
        return docRef
    } catch (error) {
        console.log(error)
    }
}

// update data
export const updateData = async (col, data, id) => {
    try {
        const docRef = doc(db, col, id);
        await updateDoc(docRef, data)
        return id
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

// query data
export const queryData = async (col, customQuery) => {
    try {
        const empRef = collection(db, col)
        const q = query(empRef, customQuery)
        const querySnapshot = await getDocs(q)
        let temp = []
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            temp.push({ id: doc.id, ...doc.data() })
        })
        return temp
    } catch (error) {
        console.log(error)
    }
}

// upload image to storage
export const uploadImage = async (file, path) => {
    const storage = getStorage()
    const storageRef = ref(storage, path)
    try {
        // Upload the image file to Firebase Storage
        await uploadBytes(storageRef, file);
    } catch (error) {
        console.error('Error uploading image:', error);
    }
}

// download image from storage
export const downloadImage = async (path) => {
    const storage = getStorage()
    const storageRef = ref(storage, path)
    try {
        // Upload the image file to Firebase Storage
        const url = await getDownloadURL(storageRef);
        return url
    } catch (error) {
        console.error('Error downloading image:', error);
    }
}